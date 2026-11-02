import { infiniteQueryOptions } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { asc, eq, inArray } from "drizzle-orm";
import { z } from "zod";
import { db } from "@server/db";
import { portfolioCategories, portfolioCategoryGroups, portfolioGroupMedia, portfolioMediaVariants } from "@server/db/schema";
import { galleryItem } from "@server/portfolio";
import type { GalleryItem, GalleryPage } from "@shared/gallery";

const pageSize = 30;

/**
 * A page of a portfolio category's photos and videos, by the category's key: its groups in order, each group's media
 * in order, a media in two of its groups only once. Media still processing aren't shown yet.
 */
export const getPortfolioPage = createServerFn({ method: "GET" })
    .validator(z.object({ category: z.string(), cursor: z.number().int().min(0) }))
    .handler(async ({ data }): Promise<GalleryPage> => {
        const [category] = await db.select({ key: portfolioCategories.key })
            .from(portfolioCategories)
            .where(eq(portfolioCategories.key, data.category));
        if (!category) {
            throw notFound();
        }

        const placed = await db.select({ mediaId: portfolioGroupMedia.mediaId })
            .from(portfolioCategoryGroups)
            .innerJoin(portfolioGroupMedia, eq(portfolioGroupMedia.groupId, portfolioCategoryGroups.groupId))
            .where(eq(portfolioCategoryGroups.categoryKey, category.key))
            .orderBy(asc(portfolioCategoryGroups.position), asc(portfolioGroupMedia.position));
        const ids = [...new Set(placed.map((row) => row.mediaId))];
        const page = ids.slice(data.cursor, data.cursor + pageSize);

        const variants = page.length
            ? await db.select().from(portfolioMediaVariants).where(inArray(portfolioMediaVariants.mediaId, page))
            : [];
        const items = page
            .map((id) => galleryItem(id, variants.filter((variant) => variant.mediaId === id)))
            .filter((item): item is GalleryItem => item !== null);

        const next = data.cursor + pageSize;
        return { items, nextCursor: next < ids.length ? next : null };
    });

export const portfolioQuery = (category: string) => infiniteQueryOptions({
    queryKey: ["portfolio", category],
    queryFn: ({ pageParam }) => getPortfolioPage({ data: { category, cursor: pageParam } }),
    initialPageParam: 0,
    getNextPageParam: (page) => page.nextCursor,
});
