import { S3Client } from "@aws-sdk/client-s3";
import { serverConfig } from "./config";

const cdns = {
    cdn0: serverConfig.env.CDN0_S3_URL,
    cdn1: serverConfig.env.CDN1_S3_URL,
};

export function getFile(cdn: keyof typeof cdns, bucket: string, path: string) {
    const cdnUrl = cdns[cdn];
    
    return `${cdnUrl}/${bucket}/${path}`;
}

export const s3 = new S3Client({
    endpoint: serverConfig.env.CDN0_S3_URL,
    region: serverConfig.env.CDN0_S3_REGION,
    forcePathStyle: true, // TODO add to env ??
    credentials: {
        accessKeyId: serverConfig.env.CDN0_S3_ACCESS_KEY,
        secretAccessKey: serverConfig.env.CDN0_S3_SECRET_KEY,
    },
});

export const buckets = {
    registries: "registries",
    assets: "assets",
    portfolio: "portfolio",
    albums: "albums",
};

export const cdn1_s3 = new S3Client({
    endpoint: serverConfig.env.CDN1_S3_URL,
    region: serverConfig.env.CDN1_S3_REGION,
    credentials: {
        accessKeyId: serverConfig.env.CDN1_S3_ACCESS_KEY,
        secretAccessKey: serverConfig.env.CDN1_S3_SECRET_KEY,
    },
});

export const cdn1_buckets = {
    albums: "vestvisuals-albums",
};
