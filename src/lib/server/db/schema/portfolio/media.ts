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

export const PORTFOLIO_MEDIA = sqliteTable("portfolio_media", {
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

export const PORTFOLIO_MEDIA_VARIANTS = sqliteTable("portfolio_media_variants", {
    mediaId: text("media_id")
        .notNull()
        .references(() => PORTFOLIO_MEDIA.id, { onDelete: "cascade" }),
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
    index("portfolio_media_variants_media_id_idx").on(table.mediaId),
    index("portfolio_media_variants_tag_idx").on(table.tag),
    index("portfolio_media_variants_type_idx").on(table.type),
]));

export const PORTFOLIO_MEDIA_RELATIONS = relations(PORTFOLIO_MEDIA, ({ many }) => ({
    portfolioMediaVariants: many(PORTFOLIO_MEDIA_VARIANTS),
}));

export const PORTFOLIO_MEDIA_VARIANTS_RELATIONS = relations(PORTFOLIO_MEDIA_VARIANTS, ({ one }) => ({
    portfolioMedia: one(PORTFOLIO_MEDIA, {
        fields: [PORTFOLIO_MEDIA_VARIANTS.mediaId],
        references: [PORTFOLIO_MEDIA.id],
    }),
}));
