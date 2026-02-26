import {
    sqliteTable,
    text,
    integer,
    index,
    uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { ALBUMS_MEDIA } from "./media";
import { ALBUMS } from "./albums";
import { ALBUMS_DIRECTORIES } from "./directories";

export const ALBUMS_CONTENTS = sqliteTable("albums_contents", {
    id: text("id")
        .$defaultFn(() => createId())
        .primaryKey(),
    albumId: text("album_id")
        .notNull()
        .references(() => ALBUMS.id, { onDelete: "cascade" }),
    path: text("path")
        .notNull(),
    type: text("type", { enum: ["media", "directory"] })
        .notNull(),
    order: integer("order")
        .notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .$defaultFn(() => new Date())
        .notNull(),
}, (table) => ([
    index("albums_contents_album_id_idx").on(table.albumId),
    uniqueIndex("albums_contents_album_id_path_uidx").on(table.albumId, table.path),
    index("albums_contents_type_idx").on(table.type),
]));

export const ALBUMS_CONTENTS_RELATIONS = relations(ALBUMS_CONTENTS, ({ one }) => ({
    album: one(ALBUMS, {
        fields: [ALBUMS_CONTENTS.albumId],
        references: [ALBUMS.id],
    }),
    albumsMedia: one(ALBUMS_MEDIA, {
        fields: [ALBUMS_CONTENTS.id],
        references: [ALBUMS_MEDIA.contentId],
    }),
    albumsDirectory: one(ALBUMS_DIRECTORIES, {
        fields: [ALBUMS_CONTENTS.id],
        references: [ALBUMS_DIRECTORIES.contentId],
    }),
}));
