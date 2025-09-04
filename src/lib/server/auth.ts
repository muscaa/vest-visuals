import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import * as schema from "./db/schema/auth";
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
        disableSignUp: true,
        requireEmailVerification: false,
        sendResetPassword: async (data, req) => {
            // TODO
        },
    },
    emailVerification: {
        sendVerificationEmail: async (data, req) => {
            // TODO
        },
        sendOnSignUp: true,
        sendOnSignIn: true,
        autoSignInAfterVerification: false,
        
    },
    user: {
        changeEmail: {
            enabled: true,
            sendChangeEmailVerification: async (data, req) => {
                // TODO
            },
        },
        deleteUser: {
            enabled: false,
            sendDeleteAccountVerification: async (data, req) => {
                // TODO
            },
        },
    },
    plugins: [
        openAPI(),
    ],
    // hooks: {
    //     before: createAuthMiddleware(async (ctx) => {
    //         if (ctx.path.startsWith("/sign-up")) {
    //             throw new APIError("UNAUTHORIZED", {
    //                 message: "Sign-ups are disabled",
    //             });
    //         }
    //     }),
    // },
    advanced: {
        ipAddress: {
            ipAddressHeaders: ["x-forwarded-for"],
            disableIpTracking: false,
        },
    },
    telemetry: {
        enabled: false,
        disableNotice: true,
    },
});
