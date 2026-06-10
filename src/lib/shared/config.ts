const env = {
    // PUBLIC
    RECAPTCHA_KEY_SITE: process.env.NEXT_PUBLIC_RECAPTCHA_KEY_SITE!,
    GOOGLE_ANALYTICS_ENABLED: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ENABLED! === "true",
    GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS!,
    MEDIA_URL: process.env.NEXT_PUBLIC_MEDIA_URL!,
    SOFTWARE_URL: process.env.NEXT_PUBLIC_SOFTWARE_URL!,
} as const;

export const sharedConfig = {
    env,
};
