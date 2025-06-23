"use server";

import { Main } from "@/components/main";
import * as AWS from "@aws-sdk/client-s3";
import * as config from "@/config/server";

export default async function Page() {
    const client = new AWS.S3Client({
        region: "us-east-1",
        endpoint: config.env.S3_URL,
        forcePathStyle: true,
        credentials: {
            accessKeyId: config.env.S3_ACCESS_KEY,
            secretAccessKey: config.env.S3_SECRET_KEY,
        },
    });

    const data1 = await client.send(new AWS.ListObjectsV2Command({
        Bucket: "public",
        Prefix: "categories/automotive/",
    }));

    const data2 = await client.send(new AWS.GetObjectTaggingCommand({
        Bucket: "public",
        Key: "categories/automotive/0/00.jpg",
    }));

    return (
        <Main>
            <div className="flex flex-col h-full gap-32 whitespace-pre-wrap">
                <p>{JSON.stringify(data1, null, 4)}</p>
                <p>{JSON.stringify(data2, null, 4)}</p>
            </div>
        </Main>
    );
}
