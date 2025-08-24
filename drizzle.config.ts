import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: "./.data/drizzle",
    schema: "./src/lib/server/db/schema",
    dialect: "sqlite",
    dbCredentials: {
        url: process.env.DB_URL!,
    },
});
