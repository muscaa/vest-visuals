import { z } from "zod";

/** An empty `KEY=` in .env counts as not set, so the default applies. */
const orDefault = <T extends z.ZodType>(schema: T) => z.preprocess((value) => (value === "" ? undefined : value), schema);

const client = z.object({
    PUBLIC_REWRITE_BRIDGE_HOME: z.string(),
    PUBLIC_REWRITE_BRIDGE_ACCOUNT: z.string(),
    PUBLIC_REWRITE_BRIDGE_MEDIA: z.string(),
    PUBLIC_REWRITE_BRIDGE_SOFTWARE: z.string(),
    PUBLIC_REWRITE_BRIDGE_ADMIN: z.string(),
    PUBLIC_COOKIE_DOMAIN: z.string(),
});
const server = client.extend({
    DATABASE_URL: z.url(),
    BETTER_AUTH_URL: z.url(),
    BETTER_AUTH_SECRET: z.string().min(32),
    S3_ENDPOINT: z.url(),
    S3_REGION: orDefault(z.string().default("us-east-1")),
    S3_ACCESS_KEY: z.string(),
    S3_SECRET_KEY: z.string(),
    S3_FORCE_PATH_STYLE: orDefault(z.stringbool().default(true)),
    S3_PUBLIC_URL: z.url(),
});

const parsed = server.safeParse(process.env);
if (!parsed.success) {
    console.error("Invalid environment variables:", parsed.error.issues);
    throw new Error("Invalid environment variables");
}

export const envServer = parsed.data;
export const envPublic = client.parse(envServer);
export type EnvPublic = z.infer<typeof client>;

globalThis.__ENV__ = envPublic; // for client env to work in ssr
