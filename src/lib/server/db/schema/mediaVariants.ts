import {
    sqliteTable,
    text,
    integer,
    index,
    primaryKey,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { MediaInfo } from "@type/media/info";
import { mediaContents } from "./mediaContents";

export const mediaVariants = sqliteTable("media_variants", {
    contentId: text("content_id")
        .notNull()
        .references(() => mediaContents.id, { onDelete: "cascade" }),
    tag: text("tag")
        .notNull(),
    order: integer("order")
        .default(0)
        .notNull(),
    type: text("type", { enum: ["image", "video"] })
        .notNull(),
    info: text("info", { mode: "json" })
        .$type<MediaInfo>(),
    createdAt: integer("created_at", { mode: "timestamp" })
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .$defaultFn(() => new Date())
        .notNull(),
}, (table) => ([
    primaryKey({ columns: [table.contentId, table.tag] }),
    index("media_variants_content_id_idx").on(table.contentId),
    index("media_variants_tag_idx").on(table.tag),
    index("media_variants_type_idx").on(table.type),
]));

export const mediaVariantsRelations = relations(mediaVariants, ({ one }) => ({
    mediaContent: one(mediaContents, {
        fields: [mediaVariants.contentId],
        references: [mediaContents.id],
    }),
}));
