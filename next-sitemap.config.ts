import { IConfig } from "next-sitemap";

export default {
    siteUrl: "https://vestvisuals.ro",
    generateRobotsTxt: true,
    changefreq: "weekly",
    priority: 0.7,
    transform: (config, url) => {
        console.log(url);

        return {
            loc: url,
        };
    },
} satisfies IConfig;
