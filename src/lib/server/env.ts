import { z } from "zod";

const client = z.object({
    PUBLIC_REWRITE_BRIDGE_ACCOUNT: z.string(),
    PUBLIC_REWRITE_BRIDGE_MEDIA: z.string(),
    PUBLIC_REWRITE_BRIDGE_SOFTWARE: z.string(),
});
const server = client.extend({
    DATABASE_URL: z.url(),
    BETTER_AUTH_URL: z.url(),
    BETTER_AUTH_SECRET: z.string().min(32),
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
