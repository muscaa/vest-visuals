import { client_config } from "@/utils/client/config";

const env = {
    ...client_config.env,
    RECAPTCHA_KEY_SECRET: process.env.RECAPTCHA_KEY_SECRET!,
    DISCORD_WEBHOOK_CONTACT: process.env.DISCORD_WEBHOOK_CONTACT!,
    S3_URL: process.env.S3_URL!,
    S3_CONSOLE_URL: process.env.S3_CONSOLE_URL!,
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY!,
    S3_SECRET_KEY: process.env.S3_SECRET_KEY!,
    POCKETBASE_URL: process.env.POCKETBASE_URL!,
} as const;

export const server_config = {
    env,
};
