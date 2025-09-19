import { MailTemplate } from ".";

const APP_NAME = "Vest Visuals";

export function newSignIn(): MailTemplate {
    return {
        subject: `${APP_NAME} Login`,
        body: `
        <p>Login from another device. If it wasn't you, contact the admin immediately.</p>
        `,
    };
}

export function signInOTP(otp: string): MailTemplate {
    return {
        subject: `${APP_NAME} Login OTP`,
        body: `
        <p>Your login OTP code is:</p>
        <p><strong>${otp}</strong></p>
        `,
    };
}

export function emailVerification(url: string): MailTemplate {
    return {
        subject: `Verify ${APP_NAME} Account`,
        body: `
        <p>Click the link below to verify your account. If it wasn't you, you can ignore this email.</p>
        <a class="btn" href="${url}" target="_blank" rel="noopener">${url}</a>
        `,
    };
}

export function changeEmail(url: string): MailTemplate {
    return {
        subject: `Confirm ${APP_NAME} E-mail Address Change`,
        body: `
        <p>Click the link below to change your e-mail address. If it wasn't you, contact the admin immediately.</p>
        <a class="btn" href="${url}" target="_blank" rel="noopener">${url}</a>
        `,
    };
}

export function resetPassword(url: string): MailTemplate {
    return {
        subject: `Reset ${APP_NAME} Password`,
        body: `
        <p>Click the link below to reset your password. If it wasn't you, contact the admin immediately.</p>
        <a class="btn" href="${url}" target="_blank" rel="noopener">${url}</a>
        `,
    };
}

export function deleteAccount(url: string): MailTemplate {
    return {
        subject: `Confirm ${APP_NAME} Account Deletion`,
        body: `
        <p>Click the link below to delete your account. If it wasn't you, contact the admin immediately.</p>
        <a class="btn" href="${url}" target="_blank" rel="noopener">${url}</a>
        `,
    };
}
