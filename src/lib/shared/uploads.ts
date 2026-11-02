/**
 * Uploads: a file goes from the browser straight to the private `uploads` bucket, in parts, then `processUpload`
 * turns it into what it was uploaded for. What it's for is its type, and each type has its own data.
 */
import { z } from "zod";
import { imageSizeList } from "./images";

/** Lowercase words joined by dashes, as asset keys are; they end up in urls. */
const slug = z.string().max(100).regex(/^[a-z0-9]+(-[a-z0-9]+)*$/);

/** What an upload is for, checked on the way in; the workflow parses it again, so the row can be trusted. */
export const uploadTarget = z.discriminatedUnion("type", [
    z.object({
        type: z.literal("asset"),
        data: z.object({
            key: slug,
            /** the sizes to make; the original is always kept */
            sizes: imageSizeList,
        }),
    }),
]);

export type UploadTarget = z.infer<typeof uploadTarget>;
export type UploadType = UploadTarget["type"];
export type UploadData = UploadTarget["data"];

export const uploadTypes = ["asset"] as const satisfies readonly UploadType[];

/** The files each type takes, by MIME type. */
export const uploadContentTypes: Record<UploadType, readonly string[]> = {
    asset: ["image/jpeg", "image/png", "image/webp"],
};

/**
 * pending: its parts are being uploaded; uploaded: complete, waiting for the workflow; processing: in the workflow;
 * done or failed: finished, its file deleted either way.
 */
export const uploadStatuses = ["pending", "uploaded", "processing", "done", "failed"] as const;

export type UploadStatus = (typeof uploadStatuses)[number];

//
// parts
//

const minPartSize = 20 * 1024 * 1024;
/** S3 takes at most this many parts per upload */
const maxParts = 10_000;

/** 20 MB, or bigger for files over 200 GB so they still fit in S3's 10 000 parts. */
export function uploadPartSize(size: number) {
    return Math.max(minPartSize, Math.ceil(size / maxParts));
}

export function uploadPartCount(size: number) {
    return Math.max(1, Math.ceil(size / uploadPartSize(size)));
}
