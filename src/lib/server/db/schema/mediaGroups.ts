import {
    sqliteTable,
    text,
    integer,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { mediaContents } from "./mediaContents";

export const mediaGroups = sqliteTable("media_groups", {
    id: text("id")
        .$defaultFn(() => createId())
        .primaryKey(),
    createdAt: integer("created_at", { mode: "timestamp" })
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .$defaultFn(() => new Date())
        .notNull(),
});

export const mediaGroupContents = sqliteTable("media_group_contents", {
    groupId: text("group_id")
        .notNull()
        .references(() => mediaGroups.id, { onDelete: "cascade" }),
    contentId: text("content_id")
        .notNull()
        .references(() => mediaContents.id, { onDelete: "cascade" }),
    order: integer("order")
        .notNull(),
});

export const mediaGroupsRelations = relations(mediaGroups, ({ many }) => ({
    mediaGroupContents: many(mediaGroupContents),
}));

export const mediaGroupContentsRelations = relations(mediaGroupContents, ({ one }) => ({
    mediaGroup: one(mediaGroups, {
        fields: [mediaGroupContents.groupId],
        references: [mediaGroups.id],
    }),
    mediaContent: one(mediaContents, {
        fields: [mediaGroupContents.contentId],
        references: [mediaContents.id],
    }),
}));
