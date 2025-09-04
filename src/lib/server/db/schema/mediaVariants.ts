import {
    sqliteTable,
    text,
    integer,
    index,
} from "drizzle-orm/sqlite-core";
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
