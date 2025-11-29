import {
    sqliteTable,
    text,
    integer,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { portfolioMedia } from "./media";

export const portfolioGroups = sqliteTable("portfolio_groups", {
    id: text("id")
        .$defaultFn(() => createId())
        .primaryKey(),
    description: text("description"),
    createdAt: integer("created_at", { mode: "timestamp" })
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .$defaultFn(() => new Date())
        .notNull(),
});

export const portfolioGroupMedia = sqliteTable("portfolio_group_media", {
    groupId: text("group_id")
        .notNull()
        .references(() => portfolioGroups.id, { onDelete: "cascade" }),
    mediaId: text("media_id")
        .notNull()
        .references(() => portfolioMedia.id, { onDelete: "cascade" }),
    order: integer("order")
        .notNull(),
});

export const portfolioGroupsRelations = relations(portfolioGroups, ({ many }) => ({
    portfolioGroupMedia: many(portfolioGroupMedia),
}));

export const portfolioGroupMediaRelations = relations(portfolioGroupMedia, ({ one }) => ({
    portfolioGroup: one(portfolioGroups, {
        fields: [portfolioGroupMedia.groupId],
        references: [portfolioGroups.id],
    }),
    portfolioMedia: one(portfolioMedia, {
        fields: [portfolioGroupMedia.mediaId],
        references: [portfolioMedia.id],
    }),
}));
