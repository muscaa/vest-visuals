import type { Mail } from ".";

// TODO: translate and design these once real emails are sent

const appName = "Vest Visuals";

export function verifyEmail(url: string): Mail {
    return {
        subject: `${appName}: verify your email`,
        text: `Confirm your email address to finish setting up your account:\n${url}`,
    };
}

export function signInCode(code: string): Mail {
    return {
        subject: `${appName}: your sign in code`,
        text: `Your sign in code is ${code}. It expires in a few minutes.`,
    };
}

export function resetPassword(url: string): Mail {
    return {
        subject: `${appName}: reset your password`,
        text: `Choose a new password here:\n${url}\nIf you didn't ask for this, you can ignore this email.`,
    };
}

export function confirmEmailChange(newEmail: string, url: string): Mail {
    return {
        subject: `${appName}: confirm your new email`,
        text: `Confirm changing your account's email to ${newEmail}:\n${url}\nIf you didn't ask for this, you can ignore this email.`,
    };
}

export function confirmAccountDeletion(url: string): Mail {
    return {
        subject: `${appName}: confirm deleting your account`,
        text: `Confirm deleting your account and all its data. This can't be undone:\n${url}`,
    };
}
