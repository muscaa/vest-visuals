import {
    sqliteTable,
    text,
    integer,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { albumsMediaContents } from "./albumsMediaContents";

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

export const albumsRelations = relations(albums, ({ many }) => ({
    albumsMediaContents: many(albumsMediaContents),
}));
