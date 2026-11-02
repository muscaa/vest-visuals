import { integer, pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";

/**
 * Every stored variant of the site's own images (see `assetKeys`): one row per key and variant, so what's really in
 * the assets bucket is known even after the sizes in the code change. A key without rows is still missing.
 */
export const assets = pgTable("assets", {
    key: text("key").notNull(),
    /** "original", or a size from when it was made, e.g. "large" */
    variant: text("variant").notNull(),
    /** MIME type, which gives its file's extension: `assetFile(key, variant, contentType)` */
    contentType: text("content_type").notNull(),
    /** as it's shown, EXIF rotation applied */
    width: integer("width").notNull(),
    height: integer("height").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    /** when it was last replaced */
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
}, (table) => [
    // also serves lookups by key alone, being its first column
    primaryKey({ columns: [table.key, table.variant] }),
]);
