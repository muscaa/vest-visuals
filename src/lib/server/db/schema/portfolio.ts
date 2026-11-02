/**
 * The portfolio: categories hold groups (one event or shoot each), groups hold media (photos and YouTube videos). Both
 * links are many to many, each with its own order, so a group or a photo can be in several places without copies.
 */
import { sql } from "drizzle-orm";
import { check, index, integer, pgTable, primaryKey, text, uuid } from "drizzle-orm/pg-core";
import { id, timestamps } from "./columns";

/** A category by its key, the same in every language; it's the url's `/portfolio/{key}` and names its messages. */
export const portfolioCategories = pgTable("portfolio_categories", {
    key: text("key").primaryKey(),
    ...timestamps(),
});

export const portfolioGroups = pgTable("portfolio_groups", {
    id: id(),
    location: text("location"),
    /** for the admin only, what the group is about */
    description: text("description"),
    ...timestamps(),
});

/** Which groups a category shows, in its own order. A category can't be deleted while it holds groups. */
export const portfolioCategoryGroups = pgTable("portfolio_category_groups", {
    categoryKey: text("category_key")
        .notNull()
        .references(() => portfolioCategories.key, { onDelete: "restrict", onUpdate: "cascade" }),
    groupId: uuid("group_id").notNull().references(() => portfolioGroups.id, { onDelete: "cascade" }),
    position: integer("position").notNull(),
}, (table) => [
    // also serves a category's groups, being its first column
    primaryKey({ columns: [table.categoryKey, table.groupId] }),
    index("portfolio_category_groups_group_id_idx").on(table.groupId),
]);

/** A photo or a video; what it is, and its files, are its variants. Its id is its folder in the portfolio bucket. */
export const portfolioMedia = pgTable("portfolio_media", {
    id: id(),
    ...timestamps(),
});

/** Which media a group shows, in its own order. */
export const portfolioGroupMedia = pgTable("portfolio_group_media", {
    groupId: uuid("group_id").notNull().references(() => portfolioGroups.id, { onDelete: "cascade" }),
    mediaId: uuid("media_id").notNull().references(() => portfolioMedia.id, { onDelete: "cascade" }),
    position: integer("position").notNull(),
}, (table) => [
    primaryKey({ columns: [table.groupId, table.mediaId] }),
    index("portfolio_group_media_media_id_idx").on(table.mediaId),
]);

/**
 * A media's variants: a photo's original and sizes, each a file at `variantFile(mediaId, variant, contentType)`, or a
 * video's `video`, which plays from YouTube and has no file.
 */
export const portfolioMediaVariants = pgTable("portfolio_media_variants", {
    mediaId: uuid("media_id").notNull().references(() => portfolioMedia.id, { onDelete: "cascade" }),
    variant: text("variant").notNull(),
    /** MIME type of its file; none for a YouTube video */
    contentType: text("content_type"),
    /** only the `video` variant */
    youtubeId: text("youtube_id"),
    /** for a video, its shape: 16:9, or 9:16 for a short */
    width: integer("width").notNull(),
    height: integer("height").notNull(),
    ...timestamps(),
}, (table) => [
    primaryKey({ columns: [table.mediaId, table.variant] }),
    // a file or a YouTube video, never both or neither
    check("portfolio_media_variants_file_or_youtube", sql`(${table.contentType} is null) <> (${table.youtubeId} is null)`),
]);
