/** Every email the site sends, in the recipient's language: a subject and its message in the shared layout. */
import { m } from "@shared/paraglide/messages";
import { EmailButton, EmailCode, EmailHeading, EmailLayout, EmailText } from "./layout";
import type { Mail } from ".";
import type { Locale } from "@shared/paraglide/runtime";

/** A message with a button: a heading, what it's about, the button, and "ignore this if it wasn't you". */
function linkMail(locale: Locale, options: { subject: string; text: string; button: string; url: string; ignorable?: boolean }): Mail {
    return {
        subject: options.subject,
        react: (
            <EmailLayout locale={locale} preview={options.text}>
                <EmailHeading>{options.subject}</EmailHeading>
                <EmailText>{options.text}</EmailText>
                <EmailButton href={options.url} locale={locale}>{options.button}</EmailButton>
                {options.ignorable !== false && <EmailText muted>{m.mail_ignore({}, { locale })}</EmailText>}
            </EmailLayout>
        ),
    };
}

export function verifyEmail(url: string, locale: Locale): Mail {
    return linkMail(locale, {
        subject: m.mail_verify_subject({}, { locale }),
        text: m.mail_verify_text({}, { locale }),
        button: m.mail_verify_button({}, { locale }),
        url,
    });
}

export function signInCode(code: string, locale: Locale): Mail {
    const subject = m.mail_code_subject({}, { locale });
    const text = m.mail_code_text({}, { locale });
    return {
        subject,
        react: (
            <EmailLayout locale={locale} preview={text}>
                <EmailHeading>{subject}</EmailHeading>
                <EmailText>{text}</EmailText>
                <EmailCode code={code} />
                <EmailText muted>{m.mail_code_ignore({}, { locale })}</EmailText>
            </EmailLayout>
        ),
    };
}

export function resetPassword(url: string, locale: Locale): Mail {
    return linkMail(locale, {
        subject: m.mail_reset_subject({}, { locale }),
        text: m.mail_reset_text({}, { locale }),
        button: m.mail_reset_button({}, { locale }),
        url,
    });
}

/** For accounts an admin created: the same link as a reset, for the first password. */
export function choosePassword(url: string, locale: Locale): Mail {
    return linkMail(locale, {
        subject: m.mail_choose_subject({}, { locale }),
        text: m.mail_choose_text({}, { locale }),
        button: m.mail_choose_button({}, { locale }),
        url,
        ignorable: false,
    });
}

export function confirmEmailChange(newEmail: string, url: string, locale: Locale): Mail {
    return linkMail(locale, {
        subject: m.mail_change_subject({}, { locale }),
        text: m.mail_change_text({ email: newEmail }, { locale }),
        button: m.mail_change_button({}, { locale }),
        url,
    });
}

export function confirmAccountDeletion(url: string, locale: Locale): Mail {
    return linkMail(locale, {
        subject: m.mail_delete_subject({}, { locale }),
        text: m.mail_delete_text({}, { locale }),
        button: m.mail_delete_button({}, { locale }),
        url,
    });
}

export function albumPublished(title: string, url: string, locale: Locale): Mail {
    return linkMail(locale, {
        subject: m.mail_album_subject({ title }, { locale }),
        text: m.mail_album_text({}, { locale }),
        button: m.mail_album_button({}, { locale }),
        url,
        ignorable: false,
    });
}
