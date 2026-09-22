import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { env } from "~/env";

export default defineConfig({
    out: "./.output/drizzle",
    schema: "./src/lib/server/db/schema",
    dialect: "postgresql",
    dbCredentials: {
        url: env.DATABASE_URL,
    },
});
