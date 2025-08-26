import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@server/db";
import * as schema from "@server/db/schema/auth";
import { openAPI } from "better-auth/plugins";
import {
    createAuthMiddleware,
    APIError,
} from "better-auth/api";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "sqlite",
        schema,
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
    },
    plugins: [
        openAPI(),
    ],
    hooks: {
        before: createAuthMiddleware(async (ctx) => {
            if (ctx.path.startsWith("/sign-up")) {
                throw new APIError("UNAUTHORIZED", {
                    message: "Sign-ups are disabled",
                });
            }
        }),
    },
});
