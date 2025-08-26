import {
    sqliteTable,
    text,
    integer,
    index,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

export const mediaVariants = sqliteTable("media_variants", {
    id: text("id")
        .$defaultFn(() => createId())
        .primaryKey(),
    variant: text("variant")
        .notNull(),
    file: text("file")
        .notNull(),
    type: text("type", { enum: ["image", "video"] })
        .notNull(),
    info: text("info", { mode: "json" })
        .$type<{}>(),
    createdAt: integer("created_at", { mode: "timestamp" })
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .$defaultFn(() => new Date())
        .notNull(),
}, (table) => ([
    index("media_variants_variant_idx").on(table.variant),
    index("media_variants_type_idx").on(table.type),
]));

export const mediaContents = sqliteTable("media_contents", {
    id: text("id")
        .$defaultFn(() => createId())
        .primaryKey(),
    mediaVariantsIds: text("media_variants_ids", { mode: "json" })
        .$type<string[]>()
        //.references(() => mediaVariants.id, { onDelete: "cascade" })
        .notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .$defaultFn(() => new Date())
        .notNull(),
});

// export const mediaContentsRelations = relations(mediaVariants, ({ many }) => ({
// 	mediaVariants: many(mediaVariants),
// }));

export const mediaGroups = sqliteTable("media_groups", {
    id: text("id")
        .$defaultFn(() => createId())
        .primaryKey(),
    mediaContentsIds: text("media_contents_ids", { mode: "json" })
        .$type<string[]>()
        .$defaultFn(() => [])
        .notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .$defaultFn(() => new Date())
        .notNull(),
});

export const mediaCategories = sqliteTable("media_categories", {
    id: text("id")
        .$defaultFn(() => createId())
        .primaryKey(),
    category: text("category")
        .unique()
        .notNull(),
    mediaGroupsIds: text("media_groups_ids", { mode: "json" })
        .$type<string[]>()
        .$defaultFn(() => [])
        .notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .$defaultFn(() => new Date())
        .notNull(),
});
