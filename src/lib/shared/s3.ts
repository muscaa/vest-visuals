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
} as const;

export type Bucket = keyof typeof buckets;

/**
 * Where anyone can open a file of a public bucket. `PUBLIC_S3_URL` is a template, since providers serve buckets
 * differently: MinIO all from one host (`http://localhost:9000/vestvisuals-{bucket}`), R2 each from its own domain
 * (`https://{bucket}.vestvisuals.ro`).
 */
export function publicUrl(bucket: Bucket, key: string) {
    return `${envClient.PUBLIC_S3_URL.replace("{bucket}", bucket)}/${key}`;
}
