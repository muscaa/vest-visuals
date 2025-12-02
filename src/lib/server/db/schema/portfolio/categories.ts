import {
    sqliteTable,
    text,
    integer,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { portfolioGroups } from "./groups";

export const PORTFOLIO_CATEGORIES = sqliteTable("portfolio_categories", {
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

export const PORTFOLIO_CATEGORY_GROUPS = sqliteTable("portfolio_category_groups", {
    categoryId: text("category_id")
        .notNull()
        .references(() => PORTFOLIO_CATEGORIES.id, { onDelete: "cascade" }),
    groupId: text("group_id")
        .notNull()
        .references(() => portfolioGroups.id, { onDelete: "cascade" }),
    order: integer("order")
        .notNull(),
});

export const PORTFOLIO_CATEGORIES_RELATIONS = relations(PORTFOLIO_CATEGORIES, ({ many }) => ({
    portfolioCategoryGroups: many(PORTFOLIO_CATEGORY_GROUPS),
}));

export const PORTFOLIO_CATEGORY_GROUPS_RELATIONS = relations(PORTFOLIO_CATEGORY_GROUPS, ({ one }) => ({
    portfolioCategory: one(PORTFOLIO_CATEGORIES, {
        fields: [PORTFOLIO_CATEGORY_GROUPS.categoryId],
        references: [PORTFOLIO_CATEGORIES.id],
    }),
    portfolioGroup: one(portfolioGroups, {
        fields: [PORTFOLIO_CATEGORY_GROUPS.groupId],
        references: [portfolioGroups.id],
    }),
}));
