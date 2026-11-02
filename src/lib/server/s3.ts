/**
 * The S3 storage: one client and the few operations the site needs. The buckets and their public urls are shared with
 * the browser, in `@shared/s3`. Keys are paths inside a bucket, like `{mediaId}/large`; never write a bucket's
 * name, use `buckets`.
 */
import {
    AbortMultipartUploadCommand,
    CompleteMultipartUploadCommand,
    CopyObjectCommand,
    CreateMultipartUploadCommand,
    DeleteObjectsCommand,
    GetObjectCommand,
    HeadObjectCommand,
    ListMultipartUploadsCommand,
    ListObjectsV2Command,
    PutObjectCommand,
    S3Client,
    S3ServiceException,
    UploadPartCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { envServer } from "@server/env";
import { buckets } from "@shared/s3";
import type { PutObjectCommandInput } from "@aws-sdk/client-s3";
import type { Bucket } from "@shared/s3";

export const s3 = new S3Client({
    endpoint: envServer.S3_ENDPOINT,
    region: envServer.S3_REGION,
    forcePathStyle: envServer.S3_FORCE_PATH_STYLE,
    credentials: {
        accessKeyId: envServer.S3_ACCESS_KEY,
        secretAccessKey: envServer.S3_SECRET_KEY,
    },
});

/** How long signed links work, in seconds. */
const signedFor = 60 * 60;

/** Whether S3 answered "not found", for a missing object, bucket or multipart upload. */
function isNotFound(error: unknown) {
    return error instanceof S3ServiceException && (
        error.$metadata.httpStatusCode === 404 || error.name === "NotFound" || error.name === "NoSuchKey" || error.name === "NoSuchUpload"
    );
}

//
// urls
//

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

/** Copies a file within the storage, between buckets too, without downloading it. Up to 5 GB, S3's limit for one copy. */
export async function copyObject(from: { bucket: Bucket; key: string }, to: { bucket: Bucket; key: string }, options: PutOptions = {}) {
    await s3.send(new CopyObjectCommand({
        CopySource: `${buckets[from.bucket]}/${encodeURIComponent(from.key)}`,
        Bucket: buckets[to.bucket],
        Key: to.key,
        // the copy gets these instead of the source's
        MetadataDirective: "REPLACE",
        ContentType: options.contentType,
        CacheControl: options.cacheControl,
    }));
}

//
// multipart uploads: the browser uploads a big file in parts, each to its own signed link, then they're joined
//

/** Starts one, returning S3's id for it. */
export async function createMultipartUpload(bucket: Bucket, key: string, contentType: string) {
    const { UploadId } = await s3.send(new CreateMultipartUploadCommand({ Bucket: buckets[bucket], Key: key, ContentType: contentType }));
    if (!UploadId) throw new Error(`S3 didn't start a multipart upload for ${buckets[bucket]}/${key}`);
    return UploadId;
}

/** A temporary link the browser uploads one part to (PUT); the response's ETag header is needed to complete it. */
export function signedUploadPartUrl(bucket: Bucket, key: string, multipartId: string, partNumber: number) {
    const command = new UploadPartCommand({ Bucket: buckets[bucket], Key: key, UploadId: multipartId, PartNumber: partNumber });
    return getSignedUrl(s3, command, { expiresIn: signedFor });
}

export interface UploadedPart {
    partNumber: number;
    etag: string;
}

/** Joins the parts into the file, in order. */
export async function completeMultipartUpload(bucket: Bucket, key: string, multipartId: string, parts: UploadedPart[]) {
    await s3.send(new CompleteMultipartUploadCommand({
        Bucket: buckets[bucket],
        Key: key,
        UploadId: multipartId,
        MultipartUpload: {
            Parts: parts.toSorted((a, b) => a.partNumber - b.partNumber).map((part) => ({ PartNumber: part.partNumber, ETag: part.etag })),
        },
    }));
}

/** Throws away the parts uploaded so far. One already completed or aborted is fine. */
export async function abortMultipartUpload(bucket: Bucket, key: string, multipartId: string) {
    try {
        await s3.send(new AbortMultipartUploadCommand({ Bucket: buckets[bucket], Key: key, UploadId: multipartId }));
    } catch (error) {
        if (!isNotFound(error)) throw error;
    }
}

/** Every multipart upload not completed or aborted yet, page by page as S3 lists them. */
export async function* listMultipartUploads(bucket: Bucket) {
    let keyMarker: string | undefined;
    let idMarker: string | undefined;
    do {
        const page = await s3.send(new ListMultipartUploadsCommand({ Bucket: buckets[bucket], KeyMarker: keyMarker, UploadIdMarker: idMarker }));
        for (const upload of page.Uploads ?? []) {
            if (upload.Key && upload.UploadId) yield { key: upload.Key, multipartId: upload.UploadId, startedAt: upload.Initiated };
        }
        keyMarker = page.IsTruncated ? page.NextKeyMarker : undefined;
        idMarker = page.IsTruncated ? page.NextUploadIdMarker : undefined;
    } while (keyMarker);
}
