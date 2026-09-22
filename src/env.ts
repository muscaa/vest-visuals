import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    client: {
        VITE_REWRITE_BRIDGE_MEDIA: z.string(),
        VITE_REWRITE_BRIDGE_SOFTWARE: z.string(),
    },
    server: {
        DATABASE_URL: z.url(),
        BETTER_AUTH_URL: z.url(),
        BETTER_AUTH_SECRET: z.string().min(32),
    },

    clientPrefix: "VITE_",
    runtimeEnv: typeof window === "undefined" ? process.env : import.meta.env,
    emptyStringAsUndefined: true,
});
