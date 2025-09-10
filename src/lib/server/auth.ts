import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import * as schema from "./db/schema/auth";
import {
    openAPI,
    emailOTP,
} from "better-auth/plugins";
import * as templates from "./mail/templates";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "sqlite",
        schema,
    }),
    appName: "Vest Visuals",
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        disableSignUp: true,
        requireEmailVerification: true,
        sendResetPassword: async (data, req) => {
            console.log(templates.resetPassword(data.url));
        },
    },
    emailVerification: {
        sendOnSignUp: true,
        sendOnSignIn: true,
        autoSignInAfterVerification: false,
    },
    user: {
        changeEmail: {
            enabled: false,
            sendChangeEmailVerification: async (data, req) => {
                console.log(templates.changeEmail(data.url));
            },
        },
        deleteUser: {
            enabled: false,
            sendDeleteAccountVerification: async (data, req) => {
                console.log(templates.deleteAccount(data.url));
            },
        },
    },
    plugins: [
        openAPI(),
        emailOTP({
            disableSignUp: true,
            overrideDefaultEmailVerification: true,
            sendVerificationOnSignUp: true,
            sendVerificationOTP: async (data, request) => {
                if (data.type == "sign-in") {
                    console.log(templates.signInOTP(data.otp));
                } else if (data.type == "email-verification") {
                    console.log(templates.emailVerificationOTP(data.otp));
                } else if (data.type == "forget-password") {
                    console.log(templates.forgetPasswordOTP(data.otp));
                }
            },
        }),
    ],
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
