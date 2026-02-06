import {
    sqliteTable,
    text,
    integer,
    index,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { PORTFOLIO_MEDIA } from "./media";

export const PORTFOLIO_GROUPS = sqliteTable("portfolio_groups", {
    id: text("id")
        .$defaultFn(() => createId())
        .primaryKey(),
    location: text("location"),
    description: text("description"),
    createdAt: integer("created_at", { mode: "timestamp" })
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .$defaultFn(() => new Date())
        .notNull(),
}, (table) => ([
    index("portfolio_groups_location_idx").on(table.location),
]));

export const PORTFOLIO_GROUP_MEDIA = sqliteTable("portfolio_group_media", {
    groupId: text("group_id")
        .notNull()
        .references(() => PORTFOLIO_GROUPS.id, { onDelete: "cascade" }),
    mediaId: text("media_id")
        .notNull()
        .references(() => PORTFOLIO_MEDIA.id, { onDelete: "cascade" }),
    order: integer("order")
        .notNull(),
});

export const PORTFOLIO_GROUPS_RELATIONS = relations(PORTFOLIO_GROUPS, ({ many }) => ({
    portfolioGroupMedia: many(PORTFOLIO_GROUP_MEDIA),
}));

export const PORTFOLIO_GROUP_MEDIA_RELATIONS = relations(PORTFOLIO_GROUP_MEDIA, ({ one }) => ({
    portfolioGroup: one(PORTFOLIO_GROUPS, {
        fields: [PORTFOLIO_GROUP_MEDIA.groupId],
        references: [PORTFOLIO_GROUPS.id],
    }),
    portfolioMedia: one(PORTFOLIO_MEDIA, {
        fields: [PORTFOLIO_GROUP_MEDIA.mediaId],
        references: [PORTFOLIO_MEDIA.id],
    }),
}));
