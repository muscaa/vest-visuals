import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import * as schema from "./db/schema/auth";
import {
    openAPI,
    twoFactor,
    captcha,
} from "better-auth/plugins";
import * as templates from "./mail/templates";
import { serverConfig } from "./config";

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
        sendResetPassword: async (data) => {
            console.log(templates.resetPassword(data.url));
        },
    },
    emailVerification: {
        sendOnSignUp: true,
        sendOnSignIn: true,
        autoSignInAfterVerification: false,
        sendVerificationEmail: async (data) => {
            console.log(templates.emailVerification(data.url));
        },
    },
    user: {
        changeEmail: {
            enabled: false,
            sendChangeEmailVerification: async (data) => {
                console.log(templates.changeEmail(data.url));
            },
        },
        deleteUser: {
            enabled: false,
            sendDeleteAccountVerification: async (data) => {
                console.log(templates.deleteAccount(data.url));
            },
        },
    },
    plugins: [
        openAPI(),
        twoFactor({
            skipVerificationOnEnable: true,
            totpOptions: {
                disable: true,
            },
            otpOptions: {
                sendOTP: async (data) => {
                    console.log(templates.signInOTP(data.otp));
                },
            },
        }),
        captcha({
            provider: "google-recaptcha",
            secretKey: serverConfig.env.RECAPTCHA_KEY_SECRET,
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
