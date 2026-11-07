/**
 * Cloudflare's cache in front of the public buckets. Files are cached for long, so one replaced under the same url
 * (an asset uploaded again) must be purged, or visitors keep getting the old one.
 */
import { envServer } from "@server/env";

/** Cloudflare takes at most this many urls per purge */
const batchSize = 30;

/**
 * Drops these urls from the cache in every data center; the next request gets the new file. Does nothing without
 * `CLOUDFLARE_ZONE_ID` and `CLOUDFLARE_API_TOKEN`, as in development.
 */
export async function purgeUrls(urls: string[]) {
    const zone = envServer.CLOUDFLARE_ZONE_ID;
    const token = envServer.CLOUDFLARE_API_TOKEN;
    if (!zone || !token) return;

    for (let start = 0; start < urls.length; start += batchSize) {
        const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${zone}/purge_cache`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({ files: urls.slice(start, start + batchSize) }),
        });
        const result = await response.json() as { success: boolean; errors?: { message: string }[] };
        if (!result.success) {
            throw new Error(`Cloudflare didn't purge the cache: ${result.errors?.map((error) => error.message).join(", ")}`);
        }
    }
}
