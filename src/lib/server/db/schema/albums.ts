import {
    sqliteTable,
    text,
    integer,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { albumContents } from "./albumContents";

export const albums = sqliteTable("albums", {
    id: text("id")
        .$defaultFn(() => createId())
        .primaryKey(),
    description: text("description"),
    createdAt: integer("created_at", { mode: "timestamp" })
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .$defaultFn(() => new Date())
        .notNull(),
});

export const albumsAlbumContents = sqliteTable("albums_album_contents", {
    albumId: text("album_id")
        .notNull()
        .references(() => albums.id, { onDelete: "cascade" }),
    contentId: text("content_id")
        .notNull()
        .references(() => albumContents.id, { onDelete: "cascade" }),
    order: integer("order")
        .notNull(),
});

export const albumsRelations = relations(albums, ({ many }) => ({
    albumsAlbumContents: many(albumsAlbumContents),
}));

export const albumsAlbumContentsRelations = relations(albumsAlbumContents, ({ one }) => ({
    album: one(albums, {
        fields: [albumsAlbumContents.albumId],
        references: [albums.id],
    }),
    albumContent: one(albumContents, {
        fields: [albumsAlbumContents.contentId],
        references: [albumContents.id],
    }),
}));
