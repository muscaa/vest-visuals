import { db } from "@server/db";
import { ALBUMS_CONTENTS } from "@server/db/schema";
import {
    eq,
    inArray,
    sql,
} from "drizzle-orm";
import * as types from "@type/albums/contents";
import * as media from "./media";
import * as directories from "./directories";

export type SelectProps =
    typeof ALBUMS_CONTENTS.$inferSelect
    & {
        albumsMedia?: media.SelectProps;
        albumsDirectory?: directories.SelectProps;
    };
export type Content = types.AlbumsContent;
export type PartialContent = types.PartialAlbumsContent;

type AutoContent<T extends SelectProps> =
    T extends { albumsMedia: media.SelectProps; }
    ? Content
    : T extends { albumsDirectory: directories.SelectProps; }
    ? Content
    : PartialContent;

const contentsTable = ALBUMS_CONTENTS;
const contentsQuery = db.query.ALBUMS_CONTENTS;

export function format<T extends SelectProps>(props: T): AutoContent<T> {
    return {
        id: props.id,
        albumId: props.albumId,
        path: props.path,
        type: props.type,
        order: props.order,
        albumsMedia: props.albumsMedia ? media.format(props.albumsMedia) : undefined,
        albumsDirectory: props.albumsDirectory ? directories.format(props.albumsDirectory) : undefined,
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
    } as unknown as AutoContent<T>;
}

export async function getAllPartial(): Promise<PartialContent[]> {
    const result = await contentsQuery.findMany({
        orderBy: (fields, operators) => [
            sql`CASE
                WHEN ${fields.type} = 'directory' THEN 1
                WHEN ${fields.type} = 'file' THEN 2
                ELSE 3
            END`,
            operators.asc(fields.order),
        ],
    });
    return result.map(format);
}

export async function getAll(): Promise<Content[]> {
    const result = await contentsQuery.findMany({
        orderBy: (fields, operators) => [
            sql`CASE
                WHEN ${fields.type} = 'directory' THEN 1
                WHEN ${fields.type} = 'file' THEN 2
                ELSE 3
            END`,
            operators.asc(fields.order),
        ],
        with: {
            albumsMedia: {
                with: {
                    albumsMediaVariants: {
                        orderBy: (fields, operators) => operators.asc(fields.order),
                    },
                },
            },
            albumsDirectory: true,
        },
    });
    return result.map(format);
}

export async function getPartial(id: string): Promise<PartialContent | undefined> {
    const result = await contentsQuery.findFirst({
        where: (fields, operators) => operators.eq(fields.id, id),
    });
    return result ? format(result) : undefined;
}

export async function get(id: string): Promise<Content | undefined> {
    const result = await contentsQuery.findFirst({
        where: (fields, operators) => operators.eq(fields.id, id),
        with: {
            albumsMedia: {
                with: {
                    albumsMediaVariants: {
                        orderBy: (fields, operators) => operators.asc(fields.order),
                    },
                },
            },
            albumsDirectory: true,
        },
    });
    return result ? format(result) : undefined;
}

export async function create(props: types.CreateProps): Promise<PartialContent | undefined> {
    const result = await db.insert(contentsTable)
        .values({
            albumId: props.albumId,
            path: props.path,
            type: props.type,
            order: 0,
        })
        .returning()
        .get();
    if (!result) {
        return undefined;
    }

    // if (props.portfolioGroups) {
    //     const results = await db.insert(categoryGroupTable)
    //         .values(props.portfolioGroups.map((value, index) => ({
    //             categoryId: result.id,
    //             groupId: value,
    //             order: index,
    //         })))
    //         .returning()
    //         .all();
    //     if (!results.every((value) => value != undefined)) {
    //         await db.delete(categoryGroupTable)
    //             .where(eq(categoryGroupTable.categoryId, result.id));
    //         await db.delete(categoriesTable)
    //             .where(eq(categoriesTable.id, result.id));
    //         return undefined;
    //     }
    // }

    return await getPartial(result.id);
}

export async function update(id: string, props: types.UpdateProps): Promise<PartialContent | undefined> {
    await db.update(contentsTable)
        .set({
            
        })
        .where(eq(contentsTable.id, id));

    // if (props.portfolioGroups) {
    //     if (props.portfolioGroups.set) {
    //         await db.delete(categoryGroupTable)
    //             .where(eq(categoryGroupTable.categoryId, id));
    //         await db.insert(categoryGroupTable)
    //             .values(props.portfolioGroups.set.map((value, index) => ({
    //                 categoryId: id,
    //                 groupId: value,
    //                 order: index,
    //             })));
    //     } else {
    //         if (props.portfolioGroups.remove) {
    //             await db.delete(categoryGroupTable)
    //                 .where(inArray(categoryGroupTable.groupId, props.portfolioGroups.remove));
    //         }
    //         if (props.portfolioGroups.append) {
    //             const last = await db.select()
    //                 .from(categoryGroupTable)
    //                 .where(eq(categoryGroupTable.categoryId, id))
    //                 .orderBy(desc(categoryGroupTable.order))
    //                 .get();
    //             const startOrder = last ? last.order + 1 : 0;
    //             await db.insert(categoryGroupTable)
    //                 .values(props.portfolioGroups.append.map((value, index) => ({
    //                     categoryId: id,
    //                     groupId: value,
    //                     order: startOrder + index,
    //                 })));
    //         }
    //     }
    // }

    return await getPartial(id);
}

export async function remove(id: string): Promise<number> {
    const query = await getPartial(id);
    if (!query) return 0;

    const result = await db.delete(contentsTable)
        .where(eq(contentsTable.id, id));
    return result.rowsAffected;
}

export async function removeList(ids: string[]): Promise<number> {
    const result = await db.delete(contentsTable)
        .where(inArray(contentsTable.id, ids));
    return result.rowsAffected;
}
