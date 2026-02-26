import {
    sqliteTable,
    text,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { ALBUMS_CONTENTS } from "./contents";

export const ALBUMS_DIRECTORIES = sqliteTable("albums_directories", {
    contentId: text("content_id")
        .primaryKey()
        .references(() => ALBUMS_CONTENTS.id, { onDelete: "cascade" }),
    name: text("name")
        .notNull(),
    cover: text("cover"),
});

export const ALBUMS_DIRECTORIES_RELATIONS = relations(ALBUMS_DIRECTORIES, ({ one }) => ({
    albumsContent: one(ALBUMS_CONTENTS, {
        fields: [ALBUMS_DIRECTORIES.contentId],
        references: [ALBUMS_CONTENTS.id],
    }),
}));
