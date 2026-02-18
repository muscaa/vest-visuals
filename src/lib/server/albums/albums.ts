import { db } from "@server/db";
import { ALBUMS } from "@server/db/schema";
import {
    eq,
    inArray,
    sql,
} from "drizzle-orm";
import * as contents from "./contents";
import * as types from "@type/albums/albums";

export type SelectProps =
    typeof ALBUMS.$inferSelect
    & {
        albumsContents?: contents.SelectProps[];
    };
export type Album = types.Album;
export type PartialAlbum = types.PartialAlbum;

type AutoAlbum<T extends SelectProps> =
    T extends { albumsContents: contents.SelectProps[]; }
    ? Album
    : PartialAlbum;

const albumsTable = ALBUMS;
const albumsQuery = db.query.ALBUMS;

export function format<T extends SelectProps>(props: T): AutoAlbum<T> {
    return {
        id: props.id,
        title: props.title,
        description: props.description,
        cover: props.cover,
        deleteAt: props.deleteAt,
        locked: props.locked,
        albumsContents: props.albumsContents?.map((value) => contents.format(value)),
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
    } as AutoAlbum<T>;
}

export async function getAllPartial(): Promise<PartialAlbum[]> {
    const result = await albumsQuery.findMany({});
    return result.map(format);
}

export async function getAll(): Promise<Album[]> {
    const result = await albumsQuery.findMany({
        with: {
            albumsContents: {
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
            },
        },
    });
    return result.map(format);
}

export async function getPartial(id: string): Promise<PartialAlbum | undefined> {
    const result = await albumsQuery.findFirst({
        where: (fields, operators) => operators.eq(fields.id, id),
    });
    return result ? format(result) : undefined;
}

export async function get(id: string): Promise<Album | undefined> {
    const result = await albumsQuery.findFirst({
        where: (fields, operators) => operators.eq(fields.id, id),
        with: {
            albumsContents: {
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
            },
        },
    });
    return result ? format(result) : undefined;
}

export async function create(props: types.CreateProps): Promise<PartialAlbum | undefined> {
    const result = await db.insert(albumsTable)
        .values({
            title: props.title,
            description: props.description,
            cover: props.cover,
        })
        .returning()
        .get();
    if (!result) {
        return undefined;
    }

    return await getPartial(result.id);
}

export async function update(id: string, props: types.UpdateProps): Promise<PartialAlbum | undefined> {
    await db.update(albumsTable)
        .set({
            title: props.title,
            description: props.description,
            cover: props.cover,
        })
        .where(eq(albumsTable.id, id));

    return await getPartial(id);
}

export async function remove(id: string): Promise<number> {
    const query = await getPartial(id);
    if (!query) return 0;

    const result = await db.delete(albumsTable)
        .where(eq(albumsTable.id, id));
    return result.rowsAffected;
}

export async function removeList(ids: string[]): Promise<number> {
    const result = await db.delete(albumsTable)
        .where(inArray(albumsTable.id, ids));
    return result.rowsAffected;
}
