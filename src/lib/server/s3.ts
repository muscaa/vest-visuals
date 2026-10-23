/**
 * The S3 storage: one client, the buckets by what they hold, and the few operations the site needs.
 * Keys are paths inside a bucket, like `{mediaId}/large`; never write a bucket's name, use `buckets`.
 */
import {
    DeleteObjectsCommand,
    GetObjectCommand,
    HeadObjectCommand,
    ListObjectsV2Command,
    PutObjectCommand,
    S3Client,
    S3ServiceException,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { envServer } from "@server/env";
import type { PutObjectCommandInput } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
    endpoint: envServer.S3_ENDPOINT,
    region: envServer.S3_REGION,
    forcePathStyle: envServer.S3_FORCE_PATH_STYLE,
    credentials: {
        accessKeyId: envServer.S3_ACCESS_KEY,
        secretAccessKey: envServer.S3_SECRET_KEY,
    },
});

/** The buckets' names, the only place they're written. */
export const buckets = {
    portfolio: "vestvisuals-portfolio",
    albums: "vestvisuals-albums",
    assets: "vestvisuals-assets",
} as const;

export type Bucket = keyof typeof buckets;

/** How long signed links work, in seconds. */
const signedFor = 60 * 60;

/** Whether S3 answered "not found", for a missing object or bucket. */
function isNotFound(error: unknown) {
    return error instanceof S3ServiceException && (error.$metadata.httpStatusCode === 404 || error.name === "NotFound" || error.name === "NoSuchKey");
}

//
// urls
//

/** Where anyone can open a file: `{S3_PUBLIC_URL}/{bucket}/{key}`. */
export function publicUrl(bucket: Bucket, key: string) {
    return `${envServer.S3_PUBLIC_URL}/${buckets[bucket]}/${key}`;
}

/**
 * A temporary link to a private file, an hour by default. With `filename`, the browser saves it under that name
 * instead of opening it.
 */
export function signedDownloadUrl(bucket: Bucket, key: string, options: { filename?: string; expiresIn?: number } = {}) {
    const command = new GetObjectCommand({
        Bucket: buckets[bucket],
        Key: key,
        ResponseContentDisposition: options.filename
            ? `attachment; filename*=UTF-8''${encodeURIComponent(options.filename)}`
            : undefined,
    });
    return getSignedUrl(s3, command, { expiresIn: options.expiresIn ?? signedFor });
}

/** A temporary link the browser can upload one file to directly (PUT), without going through the server. */
export function signedUploadUrl(bucket: Bucket, key: string, options: { contentType: string; expiresIn?: number }) {
    const command = new PutObjectCommand({ Bucket: buckets[bucket], Key: key, ContentType: options.contentType });
    return getSignedUrl(s3, command, { expiresIn: options.expiresIn ?? signedFor });
}

//
// objects
//

export interface PutOptions {
    contentType?: string;
    /** e.g. `public, max-age=31536000, immutable` for files that never change under the same key */
    cacheControl?: string;
}

/** Uploads one file from the server. */
export async function putObject(bucket: Bucket, key: string, body: PutObjectCommandInput["Body"], options: PutOptions = {}) {
    await s3.send(new PutObjectCommand({
        Bucket: buckets[bucket],
        Key: key,
        Body: body,
        ContentType: options.contentType,
        CacheControl: options.cacheControl,
    }));
}

/** A file's contents, or null when there's none under this key. */
export async function getObject(bucket: Bucket, key: string) {
    try {
        const object = await s3.send(new GetObjectCommand({ Bucket: buckets[bucket], Key: key }));
        return object.Body ? new Uint8Array(await object.Body.transformToByteArray()) : null;
    } catch (error) {
        if (isNotFound(error)) return null;
        throw error;
    }
}

/** A file's size, type and date, or null when there's none under this key. */
export async function headObject(bucket: Bucket, key: string) {
    try {
        const head = await s3.send(new HeadObjectCommand({ Bucket: buckets[bucket], Key: key }));
        return { size: head.ContentLength ?? 0, contentType: head.ContentType, lastModified: head.LastModified };
    } catch (error) {
        if (isNotFound(error)) return null;
        throw error;
    }
}

/** Every key under a prefix (`{albumId}/`), page by page as S3 lists them. */
export async function* listKeys(bucket: Bucket, prefix: string) {
    let token: string | undefined;
    do {
        const page = await s3.send(new ListObjectsV2Command({ Bucket: buckets[bucket], Prefix: prefix, ContinuationToken: token }));
        for (const object of page.Contents ?? []) {
            if (object.Key) yield object.Key;
        }
        token = page.NextContinuationToken;
    } while (token);
}

/** Deletes files, any number of them; S3 takes up to 1000 at a time. Missing keys are fine. */
export async function deleteObjects(bucket: Bucket, keys: string[]) {
    for (let start = 0; start < keys.length; start += 1000) {
        const batch = keys.slice(start, start + 1000);
        const result = await s3.send(new DeleteObjectsCommand({
            Bucket: buckets[bucket],
            Delete: { Objects: batch.map((key) => ({ Key: key })), Quiet: true },
        }));
        if (result.Errors?.length) {
            throw new Error(`S3 couldn't delete ${result.Errors.length} file(s) from ${buckets[bucket]}: ${result.Errors[0].Message}`);
        }
    }
}

/** Deletes everything under a prefix, like all the sizes of a photo (`{mediaId}/`) or a whole album (`{albumId}/`). */
export async function deletePrefix(bucket: Bucket, prefix: string) {
    const keys: string[] = [];
    for await (const key of listKeys(bucket, prefix)) keys.push(key);
    await deleteObjects(bucket, keys);
    return keys.length;
}
