import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import { devtools } from "@tanstack/devtools-vite";
import svgr from "vite-plugin-svgr";
import { paraglideCookieDomain, urlPatterns } from "./paraglide.config.ts";

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
        svgr(),
        nitro(),
        paraglideVitePlugin({
            project: "./project.inlang",
            outdir: "./src/lib/shared/paraglide",
            // outputStructure: "message-modules",
            strategy: [
                "url",
                // on the shared cookie domain, see paraglideCookieDomain() in paraglide.config.ts
                "cookie",
                "preferredLanguage",
                "globalVariable",
                "baseLocale",
            ],
            routeStrategies: [
                {
                    match: "/api/:path(.*)?",
                    exclude: true,
                },
                // crawler files live at the root of each subdomain, without a locale
                {
                    match: "/sitemap.xml",
                    exclude: true,
                },
                {
                    match: "/robots.txt",
                    exclude: true,
                },
            ],
            urlPatterns: urlPatterns("./src/routes"),
        }),
        paraglideCookieDomain(),
    ],
});
