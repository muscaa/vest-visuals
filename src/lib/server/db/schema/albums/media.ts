import {
    sqliteTable,
    text,
    integer,
    index,
    primaryKey,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { MediaInfo } from "@type/media/info";
import { ALBUMS_CONTENTS } from "./contents";

export const ALBUMS_MEDIA = sqliteTable("albums_media", {
    contentId: text("content_id")
        .primaryKey(),
});

export const ALBUMS_MEDIA_VARIANTS = sqliteTable("albums_media_variants", {
    mediaId: text("media_id")
        .notNull()
        .references(() => ALBUMS_MEDIA.contentId, { onDelete: "cascade" }),
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
    primaryKey({ columns: [table.mediaId, table.tag] }),
    index("albums_media_variants_media_id_idx").on(table.mediaId),
    index("albums_media_variants_tag_idx").on(table.tag),
    index("albums_media_variants_type_idx").on(table.type),
]));

export const ALBUMS_MEDIA_RELATIONS = relations(ALBUMS_MEDIA, ({ one, many }) => ({
    albumsContent: one(ALBUMS_CONTENTS, {
        fields: [ALBUMS_MEDIA.contentId],
        references: [ALBUMS_CONTENTS.id],
    }),
    albumsMediaVariants: many(ALBUMS_MEDIA_VARIANTS),
}));

export const ALBUMS_MEDIA_VARIANTS_RELATIONS = relations(ALBUMS_MEDIA_VARIANTS, ({ one }) => ({
    albumsMedia: one(ALBUMS_MEDIA, {
        fields: [ALBUMS_MEDIA_VARIANTS.mediaId],
        references: [ALBUMS_MEDIA.contentId],
    }),
}));
