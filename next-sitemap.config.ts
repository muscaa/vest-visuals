import type { IConfig } from "next-sitemap";

export default {
    siteUrl: "https://vestvisuals.ro",
    generateRobotsTxt: true,
    changefreq: "weekly",
    priority: 0.7,
    transform: (config, path) => {
        console.log(path);

        return {
            loc: path,
        };
    },
} satisfies IConfig;
