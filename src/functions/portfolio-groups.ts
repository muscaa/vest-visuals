/** The portfolio's groups, for the admin: each with its media, in the order the site shows them. */
import { queryOptions } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@server/db";
import { portfolioGroupMedia, portfolioGroups, portfolioMedia, portfolioMediaVariants } from "@server/db/schema";
import { publish } from "@server/events";
import { adminGroup, adminMedia, appendGroups, appendMedia, deleteOrphanMedia, groupMediaCounts } from "@server/portfolio";
import { reorder } from "@server/order";
import { youtubeShapes } from "@shared/portfolio";
import { adminMiddleware } from "./auth";
import type { YoutubeShape } from "@shared/portfolio";

export const listPortfolioGroups = createServerFn({ method: "GET" })
    .middleware([adminMiddleware])
    .handler(async () => {
        const groups = await db.query.portfolioGroups.findMany({
            orderBy: (group, { desc }) => [desc(group.createdAt)],
            with: {
                categories: { columns: { categoryKey: true } },
                media: {
                    orderBy: (link, { asc }) => [asc(link.position)],
                    limit: 1,
                    with: { media: { with: { variants: true } } },
                },
            },
        });
        const counts = await groupMediaCounts();
        return groups.map((group) => adminGroup(group, counts));
    });

export const portfolioGroupsQuery = queryOptions({
    queryKey: ["admin", "portfolio", "groups"],
    queryFn: () => listPortfolioGroups(),
});

/** A group and its media, in its order. */
export const getPortfolioGroup = createServerFn({ method: "GET" })
    .middleware([adminMiddleware])
    .validator(z.object({ id: z.uuid() }))
    .handler(async ({ data }) => {
        const group = await db.query.portfolioGroups.findFirst({
            where: eq(portfolioGroups.id, data.id),
            with: {
                categories: { columns: { categoryKey: true } },
                media: {
                    orderBy: (link, { asc }) => [asc(link.position)],
                    with: { media: { with: { variants: true, groups: { columns: { groupId: true } } } } },
                },
            },
        });
        if (!group) {
            throw notFound();
        }

        const counts = await groupMediaCounts();
        return { group: adminGroup(group, counts), media: group.media.map((link) => adminMedia(link.media)) };
    });

export const portfolioGroupQuery = (id: string) => queryOptions({
    queryKey: ["admin", "portfolio", "groups", id],
    queryFn: () => getPortfolioGroup({ data: { id } }),
});

const details = {
    location: z.string().trim().max(100).transform((value) => value || null),
    description: z.string().trim().max(1000).transform((value) => value || null),
};

/** A new, empty group at the end of a category. */
export const createPortfolioGroup = createServerFn({ method: "POST" })
    .middleware([adminMiddleware])
    .validator(z.object({ categoryKey: z.string(), ...details }))
    .handler(async ({ data }) => {
        await db.transaction(async (tx) => {
            const [group] = await tx.insert(portfolioGroups)
                .values({ location: data.location, description: data.description })
                .returning({ id: portfolioGroups.id });
            await appendGroups(tx, data.categoryKey, [group.id]);
        });
        await publish("portfolio", {});
    });

export const updatePortfolioGroup = createServerFn({ method: "POST" })
    .middleware([adminMiddleware])
    .validator(z.object({ id: z.uuid(), ...details }))
    .handler(async ({ data }) => {
        await db.update(portfolioGroups)
            .set({ location: data.location, description: data.description })
            .where(eq(portfolioGroups.id, data.id));
        await publish("portfolio", {});
    });

/** Deletes a group from every category; its media go too, with their files, unless another group holds them. */
export const deletePortfolioGroup = createServerFn({ method: "POST" })
    .middleware([adminMiddleware])
    .validator(z.object({ id: z.uuid() }))
    .handler(async ({ data }) => {
        const held = await db.select({ id: portfolioGroupMedia.mediaId }).from(portfolioGroupMedia).where(eq(portfolioGroupMedia.groupId, data.id));
        await db.delete(portfolioGroups).where(eq(portfolioGroups.id, data.id));
        await deleteOrphanMedia(held.map((row) => row.id));
        await publish("portfolio", {});
    });

/** Saves the order of a group's media, after dragging. */
export const reorderPortfolioGroup = createServerFn({ method: "POST" })
    .middleware([adminMiddleware])
    .validator(z.object({ id: z.uuid(), mediaIds: z.array(z.uuid()) }))
    .handler(async ({ data }) => {
        await db.transaction(async (tx) => {
            const current = await tx.select({ id: portfolioGroupMedia.mediaId }).from(portfolioGroupMedia).where(eq(portfolioGroupMedia.groupId, data.id));
            await reorder(current.map((row) => row.id), data.mediaIds, (mediaId, position) => tx.update(portfolioGroupMedia)
                .set({ position })
                .where(and(eq(portfolioGroupMedia.groupId, data.id), eq(portfolioGroupMedia.mediaId, mediaId))));
        });
        await publish("portfolio", {});
    });

/** Adds media already in the portfolio at the end of a group. */
export const addMediaToGroup = createServerFn({ method: "POST" })
    .middleware([adminMiddleware])
    .validator(z.object({ id: z.uuid(), mediaIds: z.array(z.uuid()).min(1) }))
    .handler(async ({ data }) => {
        await db.transaction((tx) => appendMedia(tx, data.id, data.mediaIds));
        await publish("portfolio", {});
    });

/** Adds a YouTube video at the end of a group: a new media whose only variant is the video, no file. */
export const addYoutubeToGroup = createServerFn({ method: "POST" })
    .middleware([adminMiddleware])
    .validator(z.object({
        id: z.uuid(),
        youtubeId: z.string().regex(/^[\w-]{11}$/),
        shape: z.enum(Object.keys(youtubeShapes) as [YoutubeShape, ...YoutubeShape[]]),
    }))
    .handler(async ({ data }) => {
        await db.transaction(async (tx) => {
            const [media] = await tx.insert(portfolioMedia).values({}).returning({ id: portfolioMedia.id });
            await tx.insert(portfolioMediaVariants).values({ mediaId: media.id, variant: "video", youtubeId: data.youtubeId, ...youtubeShapes[data.shape] });
            await appendMedia(tx, data.id, [media.id]);
        });
        await publish("portfolio", {});
    });

/** Takes a media out of a group; it's deleted with its files when no other group holds it. */
export const removeMediaFromGroup = createServerFn({ method: "POST" })
    .middleware([adminMiddleware])
    .validator(z.object({ id: z.uuid(), mediaId: z.uuid() }))
    .handler(async ({ data }) => {
        await db.delete(portfolioGroupMedia).where(and(eq(portfolioGroupMedia.groupId, data.id), eq(portfolioGroupMedia.mediaId, data.mediaId)));
        await deleteOrphanMedia([data.mediaId]);
        await publish("portfolio", {});
    });
