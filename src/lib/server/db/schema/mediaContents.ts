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

export const mediaContentVariants = sqliteTable("media_content_variants", {
    contentId: text("content_id")
        .notNull()
        .references(() => mediaContents.id, { onDelete: "cascade" }),
    variantId: text("variant_id")
        .notNull()
        .references(() => mediaVariants.id, { onDelete: "cascade" }),
    order: integer("order")
        .notNull(),
});

export const mediaContentsRelations = relations(mediaContents, ({ many }) => ({
    mediaContentVariants: many(mediaContentVariants),
}));

export const mediaContentVariantsRelations = relations(mediaContentVariants, ({ one }) => ({
    mediaVariant: one(mediaVariants, {
        fields: [mediaContentVariants.variantId],
        references: [mediaVariants.id],
    }),
}));
