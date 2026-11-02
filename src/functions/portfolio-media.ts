/** Every photo and video in the portfolio, for the admin; they're added from their group's page. */
import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import { start } from "workflow/api";
import { z } from "zod";
import { db } from "@server/db";
import { portfolioMediaVariants } from "@server/db/schema";
import { adminMedia, deleteMedia } from "@server/portfolio";
import { imageSizeList } from "@shared/images";
import { adminMiddleware } from "./auth";
import { reprocessPortfolioMedia } from "@/workflows/portfolio";

export const listPortfolioMedia = createServerFn({ method: "GET" })
    .middleware([adminMiddleware])
    .handler(async () => {
        const media = await db.query.portfolioMedia.findMany({
            orderBy: (row, { desc }) => [desc(row.createdAt)],
            with: { variants: true, groups: { columns: { groupId: true } } },
        });
        return media.map(adminMedia);
    });

export const portfolioMediaQuery = queryOptions({
    queryKey: ["admin", "portfolio", "media"],
    queryFn: () => listPortfolioMedia(),
});

/** Deletes a media from every group, with its files. */
export const deletePortfolioMedia = createServerFn({ method: "POST" })
    .middleware([adminMiddleware])
    .validator(z.object({ id: z.uuid() }))
    .handler(async ({ data }) => {
        await deleteMedia([data.id]);
    });

/** Remakes a photo's sizes from its original in the background, only the chosen ones; the others are deleted. */
export const changePortfolioMediaVariants = createServerFn({ method: "POST" })
    .middleware([adminMiddleware])
    .validator(z.object({ id: z.uuid(), sizes: imageSizeList }))
    .handler(async ({ data }) => {
        const [original] = await db.select({ mediaId: portfolioMediaVariants.mediaId })
            .from(portfolioMediaVariants)
            .where(and(eq(portfolioMediaVariants.mediaId, data.id), eq(portfolioMediaVariants.variant, "original")));
        if (!original) {
            throw new Error(`The portfolio media ${data.id} has no original to make sizes from`);
        }
        await start(reprocessPortfolioMedia, [data.id, data.sizes]);
    });
