import {
    sqliteTable,
    text,
    integer,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { ALBUMS_CONTENTS } from "./contents";

export const ALBUMS = sqliteTable("albums", {
    id: text("id")
        .$defaultFn(() => createId())
        .primaryKey(),
    title: text("title"),
    description: text("description"),
    cover: text("cover"),
    // TODO add user info (email, phone, pin etc)
    deleteAt: integer("delete_at", { mode: "timestamp" })
        .$defaultFn(() => new Date())
        .notNull(),
    locked: integer("locked", { mode: "boolean" })
        .$defaultFn(() => false)
        .notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .$defaultFn(() => new Date())
        .notNull(),
});

export const ALBUMS_RELATIONS = relations(ALBUMS, ({ many }) => ({
    albumsContents: many(ALBUMS_CONTENTS),
}));
