const env = {
    RECAPTCHA_KEY_SITE: process.env.NEXT_PUBLIC_RECAPTCHA_KEY_SITE!,
} as const;

export const sharedConfig = {
    env,
};
