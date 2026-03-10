import { S3Client } from "@aws-sdk/client-s3";
import {
    CDN,
    CDNs,
    cdns,
    getCDNFileUrl,
} from "./cdn";

export const {
    s3: s3Cdn0,
    buckets: s3Cdn0Buckets,
} = create(cdns.cdn0, {
    registries: "registries",
    assets: "assets",
    portfolio: "portfolio",
});

export const {
    s3: s3Cdn1,
    buckets: s3Cdn1Buckets,
} = create(cdns.cdn1, {
    albums: "vestvisuals-albums",
});

export function getS3FileUrl(cdnKey: keyof CDNs, bucket: string, path: string) {
    return getCDNFileUrl(cdnKey, `${bucket}/${path}`);
}

function create<B extends Record<string, string>>(cdn: CDN, buckets: B) {
    return {
        s3: new S3Client({
            endpoint: cdn.s3.url,
            region: cdn.s3.region,
            forcePathStyle: cdn.s3.forcePathStyle,
            credentials: {
                accessKeyId: cdn.s3.accessKey,
                secretAccessKey: cdn.s3.secretKey,
            },
        }),
        buckets,
    };
}
