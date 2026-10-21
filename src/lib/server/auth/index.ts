import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, twoFactor } from "better-auth/plugins";
import { db } from "@server/db";
import * as schema from "@server/db/schema/auth";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { envServer } from "@server/env";
import { sendMail } from "@server/mail";
import * as templates from "@server/mail/templates";
import { nameFromEmail } from "@shared/auth";

export const auth = betterAuth({
    appName: "Vest Visuals",
    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
    }),
    baseURL: envServer.BETTER_AUTH_URL,
    trustedOrigins: [
        envServer.PUBLIC_REWRITE_BRIDGE_HOME,
        envServer.PUBLIC_REWRITE_BRIDGE_ACCOUNT,
        envServer.PUBLIC_REWRITE_BRIDGE_MEDIA,
        envServer.PUBLIC_REWRITE_BRIDGE_SOFTWARE,
        envServer.PUBLIC_REWRITE_BRIDGE_ADMIN,
    ].map((value) => `https://${value}`),
    advanced: {
        crossSubDomainCookies: {
            enabled: true,
            domain: envServer.PUBLIC_COOKIE_DOMAIN,
        },
    },
    // anyone can sign up with an email and password, but has to verify the email before signing in
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        requireEmailVerification: true,
        sendResetPassword: async ({ user, url }) => {
            await sendMail(user.email, templates.resetPassword(url));
        },
    },
    emailVerification: {
        sendOnSignUp: true,
        // signing in while unverified sends a new link
        sendOnSignIn: true,
        autoSignInAfterVerification: false,
        sendVerificationEmail: async ({ user, url }) => {
            await sendMail(user.email, templates.verifyEmail(url));
        },
    },
    user: {
        // the old address confirms the change, then the new one gets a verification email
        changeEmail: {
            enabled: true,
            sendChangeEmailConfirmation: async ({ user, newEmail, url }) => {
                await sendMail(
                    user.email,
                    templates.confirmEmailChange(newEmail, url),
                );
            },
        },
        deleteUser: {
            enabled: true,
            sendDeleteAccountVerification: async ({ user, url }) => {
                await sendMail(
                    user.email,
                    templates.confirmAccountDeletion(url),
                );
            },
        },
    },
    databaseHooks: {
        user: {
            create: {
                // names aren't asked for at sign up, they come from the email
                before: async (user) => ({
                    data: { ...user, name: nameFromEmail(user.email) },
                }),
            },
        },
    },
    plugins: [
        // email codes only, enabled with `method: "otp"` which skips the verification step;
        // devices are trusted when the code is verified with trustDevice
        twoFactor({
            totpOptions: {
                disable: true,
            },
            otpOptions: {
                sendOTP: async ({ user, otp }) => {
                    await sendMail(user.email, templates.signInCode(otp));
                },
            },
        }),
        // roles: "user" for everyone, "admin" for the admin site
        admin({
            defaultRole: "user",
            adminRoles: ["admin"],
        }),
        // keep last, it handles the cookies of every other plugin
        tanstackStartCookies(),
    ],
    telemetry: {
        enabled: false,
    },
});

export type Session = typeof auth.$Infer.Session;
