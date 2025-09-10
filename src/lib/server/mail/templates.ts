import { MailTemplate } from ".";

const APP_NAME = "Vest Visuals";

export function signInOTP(otp: string): MailTemplate {
    return {
        subject: `${APP_NAME} login OTP`,
        body: `
        <p>${otp}</p>
        `,
    };
}

export function emailVerification(url: string): MailTemplate {
    return {
        subject: `Verify your ${APP_NAME} account`,
        body: `
        <a class="btn" href="${url}" target="_blank" rel="noopener">Reset password</a>
        `,
    };
}

export function changeEmail(url: string): MailTemplate {
    return {
        subject: `Confirm your ${APP_NAME} new email address`,
        body: `
        <a class="btn" href="${url}" target="_blank" rel="noopener">Reset password</a>
        `,
    };
}

export function resetPassword(url: string): MailTemplate {
    return {
        subject: `Reset your ${APP_NAME} password`,
        body: `
        <a class="btn" href="${url}" target="_blank" rel="noopener">Reset password</a>
        `,
    };
}

export function deleteAccount(url: string): MailTemplate {
    return {
        subject: `Confirm ${APP_NAME} account deletion`,
        body: `
        <a class="btn" href="${url}" target="_blank" rel="noopener">Reset password</a>
        `,
    };
}
