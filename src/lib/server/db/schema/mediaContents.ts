import {
    sqliteTable,
    text,
    integer,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { mediaVariants } from "./mediaVariants";

export const mediaContents = sqliteTable("media_contents", {
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

export const mediaContentsRelations = relations(mediaContents, ({ many }) => ({
    mediaVariants: many(mediaVariants),
}));
