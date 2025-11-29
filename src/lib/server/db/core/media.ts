import {
    sqliteTable,
    text,
    integer,
    index,
    primaryKey,
    SQLiteColumnBuilderBase,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { MediaInfo } from "@type/media/info";
import { createId } from "@paralleldrive/cuid2";

export interface CreateMediaProps<
    TContentsName extends string,
    TContentsColumns extends Record<string, SQLiteColumnBuilderBase>,
    TVariantsName extends string,
    TVariantsColumns extends Record<string, SQLiteColumnBuilderBase>
> {
    contents: {
        name: TContentsName;
        columns?: TContentsColumns;
    };
    variants: {
        name: TVariantsName;
        columns?: TVariantsColumns;
    };
}

export function createMedia<
    TContentsName extends string,
    TVariantsName extends string,
    TContentsColumns extends Record<string, SQLiteColumnBuilderBase> = {},
    TVariantsColumns extends Record<string, SQLiteColumnBuilderBase> = {}
>(props: CreateMediaProps<
    TContentsName,
    TContentsColumns,
    TVariantsName,
    TVariantsColumns
>) {
    const contentsName = props.contents.name;
    const contentsColumns = props.contents?.columns || {} as TContentsColumns;

    const variantsName = props.variants.name;
    const variantsColumns = props.variants?.columns || {} as TVariantsColumns;

    const contentsTable = sqliteTable(contentsName, {
        id: text("id")
            .$defaultFn(() => createId())
            .primaryKey(),
        createdAt: integer("created_at", { mode: "timestamp" })
            .$defaultFn(() => new Date())
            .notNull(),
        updatedAt: integer("updated_at", { mode: "timestamp" })
            .$defaultFn(() => new Date())
            .notNull(),
        ...contentsColumns,
    });

    const variantsTable = sqliteTable(variantsName, {
        contentId: text("content_id")
            .notNull()
            .references(() => contentsTable.id, { onDelete: "cascade" }),
        tag: text("tag")
            .notNull(),
        order: integer("order")
            .default(0)
            .notNull(),
        type: text("type", { enum: ["image", "video"] })
            .notNull(),
        info: text("info", { mode: "json" })
            .$type<MediaInfo>(),
        createdAt: integer("created_at", { mode: "timestamp" })
            .$defaultFn(() => new Date())
            .notNull(),
        updatedAt: integer("updated_at", { mode: "timestamp" })
            .$defaultFn(() => new Date())
            .notNull(),
        ...variantsColumns,
    }, (table) => ([
        primaryKey({ columns: [table.contentId, table.tag] }),
        index(`${variantsName}_content_id_idx`).on(table.contentId),
        index(`${variantsName}_tag_idx`).on(table.tag),
        index(`${variantsName}_type_idx`).on(table.type),
    ]));

    const contentsRelations = relations(contentsTable, ({ many }) => ({
        mediaVariants: many(variantsTable),
    }));

    const variantsRelations = relations(variantsTable, ({ one }) => ({
        mediaContent: one(contentsTable, {
            fields: [variantsTable.contentId],
            references: [contentsTable.id],
        }),
    }));

    return {
        contentsTable,
        variantsTable,
        contentsRelations,
        variantsRelations,
    };
}
