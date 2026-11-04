/**
 * Sending emails, through Resend. Without `RESEND_API_KEY`, as in development, they're printed to the server's console
 * instead, as plain text.
 */
import { render } from "@react-email/components";
import { Resend } from "resend";
import { envServer } from "@server/env";
import { baseLocale, locales } from "@shared/paraglide/runtime";
import type { Locale } from "@shared/paraglide/runtime";

export interface Mail {
    subject: string;
    /** the message, a React Email component; see `templates.tsx` */
    react: React.ReactElement;
}

const senderName = "Vest Visuals";
const resend = envServer.RESEND_API_KEY ? new Resend(envServer.RESEND_API_KEY) : null;

/** The language to email someone in: theirs when it's known (a user's `locale`), else the site's default. */
export function mailLocale(locale: string | null | undefined): Locale {
    return locales.includes(locale as Locale) ? (locale as Locale) : baseLocale;
}

/** Sends an email; it throws when Resend refuses it, so the caller's request fails visibly instead of silently. */
export async function sendMail(to: string, mail: Mail) {
    const [html, text] = await Promise.all([render(mail.react), render(mail.react, { plainText: true })]);

    if (!resend) {
        console.info(`\n[mail] to: ${to}\n[mail] subject: ${mail.subject}\n${text}\n`);
        return;
    }

    const { error } = await resend.emails.send({
        from: `${senderName} <${envServer.MAIL_SENDER_ADDRESS}>`,
        to,
        subject: mail.subject,
        html,
        text,
    });
    if (error) {
        throw new Error(`Resend didn't send "${mail.subject}" to ${to}: ${error.message}`);
    }
}
