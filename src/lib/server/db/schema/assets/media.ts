import {
    sqliteTable,
    text,
    integer,
    index,
    primaryKey,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { MediaInfo } from "@type/media/info";
import { createId } from "@paralleldrive/cuid2";

export const ASSETS_MEDIA = sqliteTable("assets_media", {
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

export const ASSETS_MEDIA_VARIANTS = sqliteTable("assets_media_variants", {
    mediaId: text("media_id")
        .notNull()
        .references(() => ASSETS_MEDIA.id, { onDelete: "cascade" }),
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
    index("assets_media_variants_media_id_idx").on(table.mediaId),
    index("assets_media_variants_tag_idx").on(table.tag),
    index("assets_media_variants_type_idx").on(table.type),
]));

export const ASSETS_MEDIA_RELATIONS = relations(ASSETS_MEDIA, ({ many }) => ({
    assetsMediaVariants: many(ASSETS_MEDIA_VARIANTS),
}));

export const ASSETS_MEDIA_VARIANTS_RELATIONS = relations(ASSETS_MEDIA_VARIANTS, ({ one }) => ({
    assetsMedia: one(ASSETS_MEDIA, {
        fields: [ASSETS_MEDIA_VARIANTS.mediaId],
        references: [ASSETS_MEDIA.id],
    }),
}));
