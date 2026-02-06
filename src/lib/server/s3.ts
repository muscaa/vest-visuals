import { S3Client } from "@aws-sdk/client-s3";
import { serverConfig } from "./config";

export const s3 = new S3Client({
    region: "us-east-1",
    endpoint: serverConfig.env.S3_URL,
    forcePathStyle: true,
    credentials: {
        accessKeyId: serverConfig.env.S3_ACCESS_KEY,
        secretAccessKey: serverConfig.env.S3_SECRET_KEY,
    },
});

export const buckets = {
    registries: "registries",
    assets: "assets",
    portfolio: "portfolio",
    albums: "albums",
};
