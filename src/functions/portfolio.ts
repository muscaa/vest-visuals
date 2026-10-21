import { infiniteQueryOptions } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { demoCategories, demoCategoryMedia, demoPage } from "@server/demo/gallery";
import type { GalleryPage } from "@shared/gallery";

const pageSize = 30;

/** A page of a portfolio category's photos and videos, by the category's tag. */
export const getPortfolioPage = createServerFn({ method: "GET" })
    .validator(z.object({ category: z.string(), cursor: z.number().int().min(0) }))
    .handler(({ data }): GalleryPage => {
        // TODO: read from the database
        if (!demoCategories.includes(data.category)) {
            throw notFound();
        }
        return demoPage(demoCategoryMedia(data.category), data.cursor, pageSize);
    });

export const portfolioQuery = (category: string) => infiniteQueryOptions({
    queryKey: ["portfolio", category],
    queryFn: ({ pageParam }) => getPortfolioPage({ data: { category, cursor: pageParam } }),
    initialPageParam: 0,
    getNextPageParam: (page) => page.nextCursor,
});
