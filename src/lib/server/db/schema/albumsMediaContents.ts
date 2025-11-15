import {
    sqliteTable,
    text,
    integer,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { albums } from "./albums";
import { albumMediaVariants } from "./albumsMediaVariants";

export const albumMediaContents = sqliteTable("album_media_contents", {
    id: text("id")
        .$defaultFn(() => createId())
        .primaryKey(),
    albumId: text("album_id")
        .notNull()
        .references(() => albums.id, { onDelete: "cascade" }),
    order: integer("order")
        .notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .$defaultFn(() => new Date())
        .notNull(),
});

export const albumMediaContentsRelations = relations(albumMediaContents, ({ one, many }) => ({
    albumVariants: many(albumMediaVariants),
    album: one(albums, {
        fields: [albumMediaContents.albumId],
        references: [albums.id],
    }),
}));
