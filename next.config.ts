import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
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

const withNextIntl = createNextIntlPlugin({
    
});
export default withNextIntl(nextConfig);
