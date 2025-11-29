import {
    sqliteTable,
    text,
    integer,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { portfolioGroups } from "./groups";

export const portfolioCategories = sqliteTable("portfolio_categories", {
    id: text("id")
        .$defaultFn(() => createId())
        .primaryKey(),
    tag: text("tag")
        .unique()
        .notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .$defaultFn(() => new Date())
        .notNull(),
});

export const portfolioCategoryGroups = sqliteTable("portfolio_category_groups", {
    categoryId: text("category_id")
        .notNull()
        .references(() => portfolioCategories.id, { onDelete: "cascade" }),
    groupId: text("group_id")
        .notNull()
        .references(() => portfolioGroups.id, { onDelete: "cascade" }),
    order: integer("order")
        .notNull(),
});

export const portfolioCategoriesRelations = relations(portfolioCategories, ({ many }) => ({
    portfolioCategoryGroups: many(portfolioCategoryGroups),
}));

export const portfolioCategoryGroupsRelations = relations(portfolioCategoryGroups, ({ one }) => ({
    portfolioCategory: one(portfolioCategories, {
        fields: [portfolioCategoryGroups.categoryId],
        references: [portfolioCategories.id],
    }),
    portfolioGroup: one(portfolioGroups, {
        fields: [portfolioCategoryGroups.groupId],
        references: [portfolioGroups.id],
    }),
}));
