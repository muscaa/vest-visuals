import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@server/db";
import * as schema from "@server/db/schema/auth";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { env } from "@/env";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
    }),
    baseURL: env.BETTER_AUTH_URL,
    trustedOrigins: [
        env.VITE_REWRITE_BRIDGE_ACCOUNT,
        env.VITE_REWRITE_BRIDGE_MEDIA,
        env.VITE_REWRITE_BRIDGE_SOFTWARE,
    ].map((value) => `https://${value}`),
    advanced: {
        crossSubDomainCookies: {
            enabled: true,
            domain: ".musca.dev", // TODO
        },
    },
    emailAndPassword: {
        enabled: true,
    },
    plugins: [tanstackStartCookies()],
    telemetry: {
        enabled: false,
    },
});
