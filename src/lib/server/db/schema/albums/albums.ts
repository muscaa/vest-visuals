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
    title: text("title")
        .notNull(),
    description: text("description"),
    cover: text("cover"),
    email: text("email"),
    phoneNumber: text("phone_number"),
    lockAt: integer("lock_at", { mode: "timestamp" })
        .notNull(),
    deleteAt: integer("delete_at", { mode: "timestamp" })
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
