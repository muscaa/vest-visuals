import {
    sqliteTable,
    text,
    integer,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { mediaGroups } from "./mediaGroups";

export const mediaCategories = sqliteTable("media_categories", {
    id: text("id")
        .$defaultFn(() => createId())
        .primaryKey(),
    category: text("category")
        .unique()
        .notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .$defaultFn(() => new Date())
        .notNull(),
});

export const mediaCategoryGroups = sqliteTable("media_category_groups", {
    categoryId: text("category_id")
        .notNull()
        .references(() => mediaCategories.id),
    groupId: text("group_id")
        .notNull()
        .references(() => mediaGroups.id),
    order: integer("order")
        .notNull(),
});

export const mediaCategoriesRelations = relations(mediaCategories, ({ many }) => ({
    mediaGroups: many(mediaCategoryGroups),
}));
