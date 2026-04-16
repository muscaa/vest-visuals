const env = {
    // PUBLIC
    RECAPTCHA_KEY_SITE: process.env.NEXT_PUBLIC_RECAPTCHA_KEY_SITE!,
    URL: process.env.NEXT_PUBLIC_URL!,
    GOOGLE_ANALYTICS_ENABLED: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ENABLED! === "true",
    GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS!,
} as const;

export const sharedConfig = {
    env,
};
