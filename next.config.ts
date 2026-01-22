import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */

    /*images: {
        remotePatterns: [
            new URL("https://s3.vestvisuals.ro/public/**"),
        ],
    },*/
    devIndicators: {
        position: "top-right",
    },
    experimental: {
        serverActions: {
            bodySizeLimit: "100mb"
        },
        proxyClientMaxBodySize: "100mb",
    },
};

export default nextConfig;
