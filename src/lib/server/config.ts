import { sharedConfig } from "@shared/config";

const env = {
    ...sharedConfig.env,
    RECAPTCHA_KEY_SECRET: process.env.RECAPTCHA_KEY_SECRET!,
    DISCORD_WEBHOOK_CONTACT: process.env.DISCORD_WEBHOOK_CONTACT!,
    S3_URL: process.env.S3_URL!,
    S3_CONSOLE_URL: process.env.S3_CONSOLE_URL!,
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY!,
    S3_SECRET_KEY: process.env.S3_SECRET_KEY!,
    LIBSQL_URL: process.env.LIBSQL_URL!,
    LIBSQL_AUTH: process.env.LIBSQL_AUTH!,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET!,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL!,
    SMTP_ENABLED: process.env.SMTP_ENABLED! === "true",
    SMTP_HOST: process.env.SMTP_HOST!,
    SMTP_PORT: process.env.SMTP_PORT!,
    SMTP_USERNAME: process.env.SMTP_USERNAME!,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD!,
    SMTP_SENDER_NAME: process.env.SMTP_SENDER_NAME!,
    SMTP_SENDER_ADDRESS: process.env.SMTP_SENDER_ADDRESS!,
} as const;

export const serverConfig = {
    env,
};
