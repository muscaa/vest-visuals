import {
    S3Client,
} from "@aws-sdk/client-s3";
import { serverConfig } from "./config";

export function createS3Client() {
    const s3 = new S3Client({
        region: "us-east-1",
        endpoint: serverConfig.env.S3_URL,
        forcePathStyle: true,
        credentials: {
            accessKeyId: serverConfig.env.S3_ACCESS_KEY,
            secretAccessKey: serverConfig.env.S3_SECRET_KEY,
        },
    });

    return s3;
}
