import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: "./.data/drizzle",
    schema: "./src/lib/server/db/schema",
    dialect: "turso",
    dbCredentials: {
        url: process.env.LIBSQL_URL!,
        authToken: process.env.LIBSQL_AUTH!,
    },
});
