import { serverConfig } from "./config";

export interface CDN {
    url: string;
    s3: {
        url: string;
        region: string;
        accessKey: string;
        secretKey: string;
        forcePathStyle: boolean;
    };
}

export type CDNs = Record<"cdn0" | "cdn1", CDN>;

export const cdns: CDNs = {
    cdn0: {
        url: serverConfig.env.CDN0_URL,
        s3: {
            url: serverConfig.env.CDN0_S3_URL,
            region: serverConfig.env.CDN0_S3_REGION,
            accessKey: serverConfig.env.CDN0_S3_ACCESS_KEY,
            secretKey: serverConfig.env.CDN0_S3_SECRET_KEY,
            forcePathStyle: serverConfig.env.CDN0_S3_FORCE_PATH_STYLE,
        },
    },
    cdn1: {
        url: serverConfig.env.CDN1_URL,
        s3: {
            url: serverConfig.env.CDN1_S3_URL,
            region: serverConfig.env.CDN1_S3_REGION,
            accessKey: serverConfig.env.CDN1_S3_ACCESS_KEY,
            secretKey: serverConfig.env.CDN1_S3_SECRET_KEY,
            forcePathStyle: serverConfig.env.CDN1_S3_FORCE_PATH_STYLE,
        },
    },
};

export function getCDNFileUrl(cdnKey: keyof CDNs, path: string) {
    const cdn = cdns[cdnKey];
    return `${cdn.url}/${path}`;
}
