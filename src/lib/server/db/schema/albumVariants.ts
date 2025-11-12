import {
    sqliteTable,
    text,
    integer,
    index,
    primaryKey,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { MediaInfo } from "@type/media/info";
import { albumContents } from "./albumContents";

export const albumVariants = sqliteTable("album_variants", {
    contentId: text("content_id")
        .notNull()
        .references(() => albumContents.id, { onDelete: "cascade" }),
    variant: text("variant")
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
    primaryKey({ columns: [table.contentId, table.variant] }),
    index("album_variants_content_id_idx").on(table.variant),
    index("album_variants_variant_idx").on(table.variant),
    index("album_variants_type_idx").on(table.type),
]));

export const albumVariantsRelations = relations(albumVariants, ({ one }) => ({
    albumContent: one(albumContents, {
        fields: [albumVariants.contentId],
        references: [albumContents.id],
    }),
}));
