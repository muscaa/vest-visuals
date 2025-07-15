import {
    S3Client,
} from "@aws-sdk/client-s3";
import { server_config } from "@/utils/server/config";

export async function createClientS3() {
    const s3 = new S3Client({
        region: "us-east-1",
        endpoint: server_config.env.S3_URL,
        forcePathStyle: true,
        credentials: {
            accessKeyId: server_config.env.S3_ACCESS_KEY,
            secretAccessKey: server_config.env.S3_SECRET_KEY,
        },
    });

    return s3;
}
