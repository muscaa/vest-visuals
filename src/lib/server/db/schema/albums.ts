/**
 * Clients' albums: each a tree of entries, directories and media, in their own order. A media's variants are its files
 * (a photo's original and sizes, a video's file for downloading) and, for a video, its YouTube link.
 */
import { relations, sql } from "drizzle-orm";
import { check, date, index, integer, jsonb, pgEnum, pgTable, primaryKey, text, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { id, instant, randomToken, timestamps } from "./columns";
import type { AnyPgColumn } from "drizzle-orm/pg-core";
import type { AlbumArchive } from "@shared/albums";

/** draft: only admins see it, while it's being made; published: the client sees it, until it locks */
export const albumStatus = pgEnum("album_status", ["draft", "published"]);
export const albumEntryType = pgEnum("album_entry_type", ["directory", "media"]);
/** idle: no zip is being made, whatever the last one holds; building: one is being made now; failed: the last try failed */
export const albumArchiveStatus = pgEnum("album_archive_status", ["idle", "building", "failed"]);

export const albums = pgTable("albums", {
    id: id(),
    /** in the album's link, `/albums/{token}`; a new one makes the old link stop working */
    token: text("token").notNull().unique().$defaultFn(randomToken),
    title: text("title").notNull(),
    description: text("description"),
    /** of the event */
    date: date("date", { mode: "string" }).notNull(),
    /** the client's: the album shows in the account signed in with it */
    email: text("email"),
    /** the album's first photo when not set */
    coverEntryId: uuid("cover_entry_id").references((): AnyPgColumn => albumEntries.id, { onDelete: "set null" }),
    status: albumStatus("status").default("draft").notNull(),
    publishedAt: instant("published_at"),
    /** from then, nobody opens it, as if deleted, while the client can still pay; set when it's published */
    lockAt: instant("lock_at"),
    /** when it's deleted for good, with its files */
    deleteAt: instant("delete_at"),
    /** the last zip of the whole album and what's in it */
    archive: jsonb("archive").$type<AlbumArchive>(),
    archiveStatus: albumArchiveStatus("archive_status").default("idle").notNull(),
    ...timestamps(),
}, (table) => [
    index("albums_email_idx").on(table.email),
]);

/**
 * A directory or a media of an album, in its parent directory (none at the album's root), in its own order. Deleting
 * a directory deletes everything in it.
 */
export const albumEntries = pgTable("album_entries", {
    /** for a media, also its folder in the albums bucket */
    id: id(),
    albumId: uuid("album_id").notNull().references(() => albums.id, { onDelete: "cascade" }),
    parentId: uuid("parent_id").references((): AnyPgColumn => albumEntries.id, { onDelete: "cascade" }),
    position: integer("position").notNull(),
    type: albumEntryType("type").notNull(),
    /** a directory's, as shown: "Ceremonie religioasă" */
    name: text("name"),
    /** a directory's, in urls: "ceremonie-religioasa", unique in its parent */
    slug: text("slug"),
    /** a media's file, as it was named, for downloads; none for a video until its file is uploaded */
    filename: text("filename"),
    ...timestamps(),
}, (table) => [
    // a directory has a name and a slug, a media neither
    check("album_entries_directory_or_media", sql`
        (${table.type} = 'directory' and ${table.name} is not null and ${table.slug} is not null and ${table.filename} is null)
        or (${table.type} = 'media' and ${table.name} is null and ${table.slug} is null)
    `),
    // a directory's slug is unique in its parent, the root included (no parent counts as one); media have none
    uniqueIndex("album_entries_slug_uidx")
        .on(table.albumId, sql`coalesce(${table.parentId}, '00000000-0000-0000-0000-000000000000'::uuid)`, table.slug)
        .where(sql`${table.slug} is not null`),
    index("album_entries_parent_idx").on(table.albumId, table.parentId, table.position),
]);

/**
 * A media's variants: a photo's original and sizes, each a file at `variantFile(entryId, variant, contentType)`; a
 * video's `video`, which plays from YouTube, and its `original`, the file for downloading.
 */
export const albumEntryVariants = pgTable("album_entry_variants", {
    entryId: uuid("entry_id").notNull().references(() => albumEntries.id, { onDelete: "cascade" }),
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
    primaryKey({ columns: [table.entryId, table.variant] }),
    check("album_entry_variants_file_or_youtube", sql`(${table.contentType} is null) <> (${table.youtubeId} is null)`),
]);

//
// relations, for `db.query`
//

export const albumsRelations = relations(albums, ({ one, many }) => ({
    entries: many(albumEntries),
    cover: one(albumEntries, {
        fields: [albums.coverEntryId],
        references: [albumEntries.id],
        relationName: "cover",
    }),
}));

export const albumEntriesRelations = relations(albumEntries, ({ one, many }) => ({
    album: one(albums, {
        fields: [albumEntries.albumId],
        references: [albums.id],
    }),
    parent: one(albumEntries, {
        fields: [albumEntries.parentId],
        references: [albumEntries.id],
        relationName: "children",
    }),
    children: many(albumEntries, { relationName: "children" }),
    variants: many(albumEntryVariants),
}));

export const albumEntryVariantsRelations = relations(albumEntryVariants, ({ one }) => ({
    entry: one(albumEntries, {
        fields: [albumEntryVariants.entryId],
        references: [albumEntries.id],
    }),
}));
