/**
 * Where the stored files are, for the server and the browser alike. Everything that needs the credentials (uploading,
 * signed links, deleting) is in `@server/s3`.
 */
import { envClient } from "@client/env";

/** The buckets' names, the only place they're written. */
export const buckets = {
    portfolio: "portfolio",
    albums: "albums",
    assets: "assets",
    /** private: files on their way in, until `processUpload` moves them where they belong */
    uploads: "uploads",
} as const;

export type Bucket = keyof typeof buckets;

/** The buckets anyone can read from. */
export type PublicBucket = Exclude<Bucket, "uploads">;

/**
 * Where anyone can open a file of a public bucket. `PUBLIC_S3_URL` is a template, since providers serve buckets
 * differently: MinIO all from one host (`http://localhost:9000/{bucket}`), R2 each from its own domain
 * (`https://{bucket}.vestvisuals.ro`).
 */
export function publicUrl(bucket: PublicBucket, key: string) {
    return `${envClient.PUBLIC_S3_URL.replace("{bucket}", bucket)}/${key}`;
}
