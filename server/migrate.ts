/**
 * Brings the database up to date: the app's migrations (drizzle/, made with `npm run db:generate` and committed) and
 * the workflow engine's tables. Production runs it before the app starts, as the app stack's `migrate` service, from
 * .output/migrate.cjs (bundled by `npm run build`, so the image needs no dev dependencies); locally it's
 * `npm run db:migrate`. Only needs DATABASE_URL.
 *
 * `--baseline` marks every migration as applied without running it, once, for a database made with `drizzle:push`
 * before migrations existed, whose tables are already there.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import pg from "pg";

const appMigrations = "drizzle";
// shipped with the package; the image copies them to the same path
const workflowMigrations = "node_modules/@workflow/world-postgres/src/drizzle/migrations";

interface Journal {
    entries: { tag: string; when: number }[];
}

/** Records the app's migrations as applied, the way drizzle's migrator does: by each file's hash and timestamp. */
async function baseline(pool: pg.Pool) {
    const journal: Journal = JSON.parse(readFileSync(join(appMigrations, "meta", "_journal.json"), "utf8"));

    await pool.query("create schema if not exists drizzle");
    await pool.query("create table if not exists drizzle.__drizzle_migrations (id serial primary key, hash text not null, created_at bigint)");
    const { rows } = await pool.query<{ created_at: string }>("select created_at from drizzle.__drizzle_migrations");
    const applied = new Set(rows.map((row) => Number(row.created_at)));

    for (const entry of journal.entries) {
        if (applied.has(entry.when)) continue;
        const hash = createHash("sha256").update(readFileSync(join(appMigrations, `${entry.tag}.sql`), "utf8")).digest("hex");
        await pool.query("insert into drizzle.__drizzle_migrations (hash, created_at) values ($1, $2)", [hash, entry.when]);
        console.log(`marked ${entry.tag} as applied`);
    }
}

async function main() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        throw new Error("DATABASE_URL is needed");
    }

    const pool = new pg.Pool({ connectionString, max: 1 });
    try {
        if (process.argv.includes("--baseline")) {
            await baseline(pool);
            return;
        }

        const db = drizzle(pool);
        console.log("applying the app's migrations");
        await migrate(db, { migrationsFolder: appMigrations });
        // the same table and schema as the package's own `bootstrap` command, so the two never disagree
        console.log("applying the workflow engine's migrations");
        await migrate(db, { migrationsFolder: workflowMigrations, migrationsTable: "workflow_migrations", migrationsSchema: "workflow_drizzle" });
        console.log("the database is up to date");
    } finally {
        await pool.end();
    }
}

main().catch((error: unknown) => {
    console.error(error);
    process.exit(1);
});
