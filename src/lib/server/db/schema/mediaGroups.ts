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
        .references(() => mediaGroups.id),
    contentId: text("content_id")
        .notNull()
        .references(() => mediaContents.id),
    order: integer("order")
        .notNull(),
});

export const mediaGroupsRelations = relations(mediaGroups, ({ many }) => ({
    mediaContents: many(mediaGroupContents),
}));
