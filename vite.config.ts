import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import { devtools } from "@tanstack/devtools-vite";

export default defineConfig({
    server: {
        port: 3000,
        host: true,
        allowedHosts: [".musca.dev"],
    },
    resolve: {
        tsconfigPaths: true,
    },
    plugins: [
        devtools(),
        tailwindcss(),
        tanstackStart({
            srcDirectory: "src",
        }),
        viteReact(),
        nitro(),
        paraglideVitePlugin({
            project: "./project.inlang",
            outdir: "./src/lib/shared/paraglide",
            // outputStructure: "message-modules",
            // cookieName: "PARAGLIDE_LOCALE",
            // strategy: ["url", "cookie", "preferredLanguage", "baseLocale"],
            // urlPatterns: [
            //     {
            //         pattern: "/:path(.*)?",
            //         localized: [
            //             ["en", "/en/:path(.*)?"],
            //         ],
            //     }
            // ],
        }),
    ],
});
