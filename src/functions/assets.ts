import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { and, desc, eq, sql } from "drizzle-orm";
import { start } from "workflow/api";
import { z } from "zod";
import { db } from "@server/db";
import { publish } from "@server/events";
import { assets, uploads } from "@server/db/schema";
import { deletePrefix } from "@server/s3";
import { assetKeys } from "@shared/assets";
import { imageSizeList } from "@shared/images";
import { adminMiddleware } from "./auth";
import { reprocessAsset } from "@/workflows/assets";

/**
 * processing: its last upload is being processed; failed: its last upload failed, after its current files if any;
 * missing: no files yet; unlisted: has files, but isn't in `assetKeys`, so the code can't use it without a cast.
 */
export type AssetStatus = "ready" | "missing" | "unlisted" | "processing" | "failed";

/** Every asset the admin should know about: the listed keys, ready or missing, and any other key with files or uploads. */
export const listAssets = createServerFn({ method: "GET" })
    .middleware([adminMiddleware])
    .handler(async () => {
        const variants = await db.select().from(assets);
        const uploadKey = sql<string>`${uploads.data}->>'key'`;
        const lastUploads = await db.selectDistinctOn([uploadKey], { key: uploadKey, status: uploads.status, createdAt: uploads.createdAt })
            .from(uploads)
            .where(eq(uploads.type, "asset"))
            .orderBy(uploadKey, desc(uploads.createdAt));

        const listed = new Set<string>(assetKeys);
        const keys = new Set([...assetKeys, ...variants.map((row) => row.key), ...lastUploads.map((upload) => upload.key)]);

        return [...keys].map((key) => {
            const rows = variants.filter((row) => row.key === key);
            const lastUpload = lastUploads.find((upload) => upload.key === key);
            const createdAt = rows.length ? new Date(Math.min(...rows.map((row) => row.createdAt.getTime()))) : null;
            const updatedAt = rows.length ? new Date(Math.max(...rows.map((row) => row.updatedAt.getTime()))) : null;

            let status: AssetStatus = "ready";
            if (lastUpload?.status === "uploaded" || lastUpload?.status === "processing") status = "processing";
            else if (lastUpload?.status === "failed" && (!updatedAt || lastUpload.createdAt > updatedAt)) status = "failed";
            else if (!rows.length) status = "missing";
            else if (!listed.has(key)) status = "unlisted";

            return {
                key,
                status,
                variants: rows.map(({ variant, contentType, width, height }) => ({ variant, contentType, width, height })),
                createdAt,
                updatedAt,
            };
        });
    });

export type AdminAsset = Awaited<ReturnType<typeof listAssets>>[number];

/** The assets for the admin's table; refreshed with `invalidateQueries(assetsQuery)` after changing one. */
export const assetsQuery = queryOptions({
    queryKey: ["admin", "assets"],
    queryFn: () => listAssets(),
});

/** Deletes every variant of an asset, files and rows; the pages using it show no image until it's uploaded again. */
export const deleteAsset = createServerFn({ method: "POST" })
    .middleware([adminMiddleware])
    .validator(z.object({ key: z.string().min(1) }))
    .handler(async ({ data }) => {
        await deletePrefix("assets", `${data.key}/`);
        await db.delete(assets).where(eq(assets.key, data.key));
        await publish("assets", { key: data.key });
        // TODO: once Cloudflare is in front of the assets, purge its urls too (`purgeUrls` in @server/cloudflare)
    });

/** Remakes an asset's sizes from its original in the background, only the chosen ones; the others are deleted. */
export const changeAssetVariants = createServerFn({ method: "POST" })
    .middleware([adminMiddleware])
    .validator(z.object({ key: z.string().min(1), sizes: imageSizeList }))
    .handler(async ({ data }) => {
        const [original] = await db.select({ key: assets.key }).from(assets).where(and(eq(assets.key, data.key), eq(assets.variant, "original")));
        if (!original) {
            throw new Error(`The asset ${data.key} has no original to make sizes from`);
        }
        await start(reprocessAsset, [data.key, data.sizes]);
    });
