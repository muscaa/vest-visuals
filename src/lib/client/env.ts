import type { EnvPublic } from "@server/env";

declare global {
    var __ENV__: EnvPublic | undefined;
}

// export const envClient = new Proxy({} as EnvPublic, {
//     get(_, key) {
//         const source = globalThis.__ENV__;
//         if (!source) throw new Error("Public env not initialized");
//         return source[key as keyof EnvPublic];
//     },
// });

export const envClient = globalThis.__ENV__!;
