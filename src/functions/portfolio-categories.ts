/** The portfolio's categories, for the admin: each with its groups, in the order the site shows them. */
import { queryOptions } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { and, asc, count, eq, ne, notExists } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { z } from "zod";
import { db } from "@server/db";
import { portfolioCategories, portfolioCategoryGroups } from "@server/db/schema";
import { publish } from "@server/events";
import { adminGroup, appendGroups, groupMediaCounts } from "@server/portfolio";
import { reorder } from "@server/order";
import { slug } from "@shared/uploads";
import { adminMiddleware } from "./auth";

export const listPortfolioCategories = createServerFn({ method: "GET" })
    .middleware([adminMiddleware])
    .handler(async () => {
        const categories = await db.select().from(portfolioCategories).orderBy(asc(portfolioCategories.key));
        const counts = await db.select({ key: portfolioCategoryGroups.categoryKey, count: count() })
            .from(portfolioCategoryGroups)
            .groupBy(portfolioCategoryGroups.categoryKey);
        return categories.map((category) => ({
            ...category,
            groupCount: counts.find((row) => row.key === category.key)?.count ?? 0,
        }));
    });

export type AdminPortfolioCategory = Awaited<ReturnType<typeof listPortfolioCategories>>[number];

export const portfolioCategoriesQuery = queryOptions({
    queryKey: ["admin", "portfolio", "categories"],
    queryFn: () => listPortfolioCategories(),
});

/** A category and its groups, in its order. */
export const getPortfolioCategory = createServerFn({ method: "GET" })
    .middleware([adminMiddleware])
    .validator(z.object({ key: z.string() }))
    .handler(async ({ data }) => {
        const category = await db.query.portfolioCategories.findFirst({
            where: eq(portfolioCategories.key, data.key),
            with: {
                groups: {
                    orderBy: (link, { asc: ascending }) => [ascending(link.position)],
                    with: {
                        group: {
                            with: {
                                categories: { columns: { categoryKey: true } },
                                media: {
                                    orderBy: (link, { asc: ascending }) => [ascending(link.position)],
                                    limit: 1,
                                    with: { media: { with: { variants: true } } },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (!category) {
            throw notFound();
        }

        const counts = await groupMediaCounts();
        const { groups, ...rest } = category;
        return { category: rest, groups: groups.map((link) => adminGroup(link.group, counts)) };
    });

export const portfolioCategoryQuery = (key: string) => queryOptions({
    queryKey: ["admin", "portfolio", "categories", key],
    queryFn: () => getPortfolioCategory({ data: { key } }),
});

/** A new, empty category; false when the key is taken. */
export const createPortfolioCategory = createServerFn({ method: "POST" })
    .middleware([adminMiddleware])
    .validator(z.object({ key: slug }))
    .handler(async ({ data }) => {
        const created = await db.insert(portfolioCategories).values({ key: data.key }).onConflictDoNothing().returning();
        await publish("portfolio", {});
        return { created: created.length > 0 };
    });

/**
 * Deletes a category, not its groups. Refused (false) while it holds a group that's in no other category, which would
 * be left without one.
 */
export const deletePortfolioCategory = createServerFn({ method: "POST" })
    .middleware([adminMiddleware])
    .validator(z.object({ key: z.string() }))
    .handler(async ({ data }) => {
        const deleted = await db.transaction(async (tx) => {
            // the same group, in another category
            const other = alias(portfolioCategoryGroups, "other");
            const elsewhere = tx.select()
                .from(other)
                .where(and(eq(other.groupId, portfolioCategoryGroups.groupId), ne(other.categoryKey, data.key)));
            const onlyHere = await tx.select({ groupId: portfolioCategoryGroups.groupId })
                .from(portfolioCategoryGroups)
                .where(and(eq(portfolioCategoryGroups.categoryKey, data.key), notExists(elsewhere)))
                .limit(1);
            if (onlyHere.length) return false;

            await tx.delete(portfolioCategoryGroups).where(eq(portfolioCategoryGroups.categoryKey, data.key));
            await tx.delete(portfolioCategories).where(eq(portfolioCategories.key, data.key));
            return true;
        });

        if (deleted) await publish("portfolio", {});
        return { deleted };
    });

/** Saves the order of a category's groups, after dragging. */
export const reorderPortfolioCategory = createServerFn({ method: "POST" })
    .middleware([adminMiddleware])
    .validator(z.object({ key: z.string(), groupIds: z.array(z.uuid()) }))
    .handler(async ({ data }) => {
        await db.transaction(async (tx) => {
            const current = await tx.select({ id: portfolioCategoryGroups.groupId })
                .from(portfolioCategoryGroups)
                .where(eq(portfolioCategoryGroups.categoryKey, data.key));
            await reorder(current.map((row) => row.id), data.groupIds, (groupId, position) => tx.update(portfolioCategoryGroups)
                .set({ position })
                .where(and(eq(portfolioCategoryGroups.categoryKey, data.key), eq(portfolioCategoryGroups.groupId, groupId))));
        });
        await publish("portfolio", {});
    });

/** Adds existing groups at the end of a category. */
export const addGroupsToCategory = createServerFn({ method: "POST" })
    .middleware([adminMiddleware])
    .validator(z.object({ key: z.string(), groupIds: z.array(z.uuid()).min(1) }))
    .handler(async ({ data }) => {
        await db.transaction((tx) => appendGroups(tx, data.key, data.groupIds));
        await publish("portfolio", {});
    });

/** Takes a group out of a category; it stays in the others, and in the groups list. */
export const removeGroupFromCategory = createServerFn({ method: "POST" })
    .middleware([adminMiddleware])
    .validator(z.object({ key: z.string(), groupId: z.uuid() }))
    .handler(async ({ data }) => {
        await db.delete(portfolioCategoryGroups)
            .where(and(eq(portfolioCategoryGroups.categoryKey, data.key), eq(portfolioCategoryGroups.groupId, data.groupId)));
        await publish("portfolio", {});
    });
