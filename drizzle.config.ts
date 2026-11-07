import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { envServer } from "@server/env";

export default defineConfig({
    // committed: the image applies them on deploy (server/migrate.ts)
    out: "./drizzle",
    schema: "./src/lib/server/db/schema",
    dialect: "postgresql",
    dbCredentials: {
        url: envServer.DATABASE_URL,
    },
});
