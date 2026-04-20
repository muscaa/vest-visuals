import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    devIndicators: {
        position: "top-right",
    },
    allowedDevOrigins: ["musca.dev", "*.musca.dev"],
    experimental: {
        serverActions: {
            bodySizeLimit: "100mb"
        },
        proxyClientMaxBodySize: "100mb",
    },
};

const withNextIntl = createNextIntlPlugin({
    requestConfig: "./src/lib/server/i18n.ts",
});
export default withNextIntl(nextConfig);
