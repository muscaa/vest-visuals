import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@server/db";
import * as schema from "@server/db/schema/auth";
import {
    openAPI,
    twoFactor,
    captcha,
} from "better-auth/plugins";
import * as templates from "@server/mail/templates";
import { sendMail } from "@server/mail";
import { serverConfig } from "@server/config";
import { createAuthMiddleware } from "better-auth/api";
import {
    beforeHook,
    afterHook,
} from "./hooks";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "sqlite",
        schema,
    }),
    appName: "Vest Visuals",
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        requireEmailVerification: true,
        sendResetPassword: async (data) => {
            sendMail(data.user.email, templates.resetPassword(data.url));
        },
    },
    emailVerification: {
        sendOnSignUp: true,
        sendOnSignIn: true,
        autoSignInAfterVerification: false,
        sendVerificationEmail: async (data) => {
            sendMail(data.user.email, templates.emailVerification(data.url));
        },
    },
    user: {
        changeEmail: {
            enabled: false,
            sendChangeEmailVerification: async (data) => {
                sendMail(data.user.email, templates.changeEmail(data.url));
            },
        },
        deleteUser: {
            enabled: false,
            sendDeleteAccountVerification: async (data) => {
                sendMail(data.user.email, templates.deleteAccount(data.url));
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
                    sendMail(data.user.email, templates.signInOTP(data.otp));
                },
            },
        }),
        captcha({
            provider: "google-recaptcha",
            secretKey: serverConfig.env.RECAPTCHA_KEY_SECRET,
        }),
    ],
    hooks: {
        before: createAuthMiddleware(async (ctx) => await beforeHook(ctx, ctx.context)),
        after: createAuthMiddleware(async (ctx) => await afterHook(ctx, ctx.context as any)),
    },
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
