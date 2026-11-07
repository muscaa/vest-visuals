import { and, eq } from "drizzle-orm";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, captcha, twoFactor } from "better-auth/plugins";
import { removeAvatar } from "@server/avatars";
import { db } from "@server/db";
import * as schema from "@server/db/schema/auth";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { envServer } from "@server/env";
import { mailLocale, sendMail } from "@server/mail";
import * as templates from "@server/mail/templates";
import { nameFromEmail } from "@shared/auth";
import { cookieName } from "@shared/paraglide/runtime";

/** Whether a user can sign in with a password; accounts created by an admin start without one. */
async function hasPassword(userId: string) {
    const credentials = await db
        .select({ id: schema.account.id })
        .from(schema.account)
        .where(and(eq(schema.account.userId, userId), eq(schema.account.providerId, "credential")))
        .limit(1);
    return credentials.length > 0;
}

/** The language a request was made in, from Paraglide's cookie; set whenever someone picks a language. */
function requestLocale(headers: Headers | undefined) {
    const cookie = headers?.get("cookie")?.match(new RegExp(`(?:^|; )${cookieName}=([^;]*)`))?.[1];
    return mailLocale(cookie);
}

/** A user's language, for their emails; Better Auth's callbacks don't type the `locale` field, so it's read here. */
function userLocale(user: object) {
    return mailLocale((user as { locale?: string | null }).locale);
}

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
        // the same link sets the first password of accounts created by an admin
        sendResetPassword: async ({ user, url }) => {
            const locale = userLocale(user);
            const mail = (await hasPassword(user.id)) ? templates.resetPassword(url, locale) : templates.choosePassword(url, locale);
            await sendMail(user.email, mail);
        },
    },
    emailVerification: {
        sendOnSignUp: true,
        // signing in while unverified sends a new link
        sendOnSignIn: true,
        autoSignInAfterVerification: false,
        sendVerificationEmail: async ({ user, url }) => {
            await sendMail(user.email, templates.verifyEmail(url, userLocale(user)));
        },
    },
    user: {
        additionalFields: {
            /** the language emails are sent in: the one they browse in, saved when they sign up and pick a language */
            locale: {
                type: "string",
                required: false,
                input: true,
            },
        },
        // the old address confirms the change, then the new one gets a verification email
        changeEmail: {
            enabled: true,
            sendChangeEmailConfirmation: async ({ user, newEmail, url }) => {
                await sendMail(user.email, templates.confirmEmailChange(newEmail, url, userLocale(user)));
            },
        },
        deleteUser: {
            enabled: true,
            sendDeleteAccountVerification: async ({ user, url }) => {
                await sendMail(user.email, templates.confirmAccountDeletion(url, userLocale(user)));
            },
        },
    },
    databaseHooks: {
        user: {
            create: {
                // names aren't asked for at sign up, they come from the email; admins can set one. The language is the
                // one they signed up in, else the one they were browsing in (social sign ups)
                before: async (user, context) => ({
                    data: {
                        ...user,
                        name: user.name.trim() || nameFromEmail(user.email),
                        locale: mailLocale((user as { locale?: string }).locale ?? requestLocale(context?.headers)),
                    },
                }),
            },
            update: {
                // only a language the site has
                before: async (user) => {
                    const { locale } = user as { locale?: string };
                    return { data: locale === undefined ? user : { ...user, locale: mailLocale(locale) } };
                },
            },
            delete: {
                // their profile photo goes with them
                after: async (user) => {
                    await removeAvatar(user.id);
                },
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
                    await sendMail(user.email, templates.signInCode(otp, userLocale(user)));
                },
            },
        }),
        // roles: "user" for everyone, "admin" for the admin site
        admin({
            defaultRole: "user",
            adminRoles: ["admin"],
        }),
        // Turnstile on sign up, sign in and password reset: the forms send its token in the x-captcha-response header
        ...(envServer.TURNSTILE_SECRET_KEY
            ? [captcha({ provider: "cloudflare-turnstile", secretKey: envServer.TURNSTILE_SECRET_KEY })]
            : []),
        // keep last, it handles the cookies of every other plugin
        tanstackStartCookies(),
    ],
    telemetry: {
        enabled: false,
    },
});

export type Session = typeof auth.$Infer.Session;

/**
 * Better Auth's endpoints as route handlers, served at `/api/auth` on every site whose pages use the auth client
 * (it calls the site it's on): see `routes/account/api/auth/$.ts` and `routes/admin/api/auth/$.ts`.
 */
export const authHandlers = {
    GET: ({ request }: { request: Request }) => auth.handler(request),
    POST: ({ request }: { request: Request }) => auth.handler(request),
};
