import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@server/db";
import * as schema from "@server/db/schema/auth";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { envServer } from "@server/env";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
    }),
    baseURL: envServer.BETTER_AUTH_URL,
    trustedOrigins: [
        envServer.PUBLIC_REWRITE_BRIDGE_ACCOUNT,
        envServer.PUBLIC_REWRITE_BRIDGE_MEDIA,
        envServer.PUBLIC_REWRITE_BRIDGE_SOFTWARE,
    ].map((value) => `https://${value}`),
    advanced: {
        crossSubDomainCookies: {
            enabled: true,
            domain: envServer.BETTER_AUTH_COOKIE_DOMAIN,
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
