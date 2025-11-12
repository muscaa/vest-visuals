import {
    sqliteTable,
    text,
    integer,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { albumVariants } from "./albumVariants";

export const albumContents = sqliteTable("album_contents", {
    id: text("id")
        .$defaultFn(() => createId())
        .primaryKey(),
    createdAt: integer("created_at", { mode: "timestamp" })
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .$defaultFn(() => new Date())
        .notNull(),
});

export const albumContentsRelations = relations(albumContents, ({ many }) => ({
    albumVariants: many(albumVariants),
}));
