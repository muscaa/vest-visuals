import { db } from "@server/db";
import {
    albums,
    albumsAlbumContents,
} from "@server/db/schema";
import {
    eq,
    inArray,
    desc,
} from "drizzle-orm";
import * as contents from "./contents";
import * as types from "@type/albums";

export type SelectProps =
    typeof albums.$inferSelect
    & {
        albumsAlbumContents: (
            typeof albumsAlbumContents.$inferSelect
            & {
                albumContent?: contents.SelectProps;
            }
        )[];
    };
type AutoAlbum<T extends SelectProps> =
    T extends { albumsAlbumContents: (infer V)[]; }
        ? V extends { albumContent: contents.SelectProps; }
            ? types.Album
            : types.PartialAlbum
        : types.PartialAlbum;

export function format<T extends SelectProps>(props: T): AutoAlbum<T> {
    return {
        id: props.id,
        description: props.description,
        albumContentIds: props.albumsAlbumContents.map((value) => value.contentId),
        albumContents: props.albumsAlbumContents.every((value) => value.albumContent != undefined)
            ? props.albumsAlbumContents.map((value) => contents.format(value.albumContent!))
            : undefined,
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
    } as AutoAlbum<T>;
}

export async function getAllPartial(): Promise<types.PartialAlbum[]> {
    const result = await db.query.albums.findMany({
        with: {
            albumsAlbumContents: {
                orderBy: (fields, operators) => operators.asc(fields.order),
            },
        },
    });
    return result.map(format);
}

export async function getAll(): Promise<types.Album[]> {
    const result = await db.query.albums.findMany({
        with: {
            albumsAlbumContents: {
                orderBy: (fields, operators) => operators.asc(fields.order),
                with: {
                    albumContent: {
                        with: {
                            albumVariants: {
                                orderBy: (fields, operators) => operators.asc(fields.order),
                            },
                        },
                    },
                },
            },
        },
    });
    return result.map(format);
}

export async function getPartial(id: string): Promise<types.PartialAlbum | undefined> {
    const result = await db.query.albums.findFirst({
        where: (fields, operators) => operators.eq(fields.id, id),
        with: {
            albumsAlbumContents: {
                orderBy: (fields, operators) => operators.asc(fields.order),
            },
        },
    });
    return result ? format(result) : undefined;
}

export async function get(id: string): Promise<types.Album | undefined> {
    const result = await db.query.albums.findFirst({
        where: (fields, operators) => operators.eq(fields.id, id),
        with: {
            albumsAlbumContents: {
                orderBy: (fields, operators) => operators.asc(fields.order),
                with: {
                    albumContent: {
                        with: {
                            albumVariants: {
                                orderBy: (fields, operators) => operators.asc(fields.order),
                            },
                        },
                    },
                },
            },
        },
    });
    return result ? format(result) : undefined;
}

export async function create(props: types.CreateProps): Promise<types.PartialAlbum | undefined> {
    const result = await db.insert(albums)
        .values({
            description: props.description,
        })
        .returning()
        .get();
    if (!result) {
        return undefined;
    }

    if (props.albumContents) {
        const results = await db.insert(albumsAlbumContents)
            .values(props.albumContents.map((value, index) => ({
                albumId: result.id,
                contentId: value,
                order: index,
            })))
            .returning()
            .all();
        if (!results.every((value) => value != undefined)) {
            await db.delete(albumsAlbumContents)
                .where(eq(albumsAlbumContents.albumId, result.id));
            await db.delete(albums)
                .where(eq(albums.id, result.id));
            return undefined;
        }
    }

    return await getPartial(result.id);
}

export async function update(id: string, props: types.UpdateProps): Promise<types.PartialAlbum | undefined> {
    if (props.description || props.description === null) {
        await db.update(albums)
            .set({
                description: props.description,
            })
            .where(eq(albums.id, id));
    }

    if (props.albumContents) {
        if (props.albumContents.set) {
            await db.delete(albumsAlbumContents)
                .where(eq(albumsAlbumContents.albumId, id));
            await db.insert(albumsAlbumContents)
                .values(props.albumContents.set.map((value, index) => ({
                    albumId: id,
                    contentId: value,
                    order: index,
                })));
        } else {
            if (props.albumContents.remove) {
                await db.delete(albumsAlbumContents)
                    .where(inArray(albumsAlbumContents.contentId, props.albumContents.remove));
            }
            if (props.albumContents.append) {
                const last = await db.select()
                    .from(albumsAlbumContents)
                    .where(eq(albumsAlbumContents.albumId, id))
                    .orderBy(desc(albumsAlbumContents.order))
                    .get();
                const startOrder = last ? last.order + 1 : 0;
                await db.insert(albumsAlbumContents)
                    .values(props.albumContents.append.map((value, index) => ({
                        albumId: id,
                        contentId: value,
                        order: startOrder + index,
                    })));
            }
        }
    }

    return await getPartial(id);
}

export async function remove(id: string): Promise<number> {
    const query = await getPartial(id);
    if (!query) return 0;

    await db.delete(albumsAlbumContents)
        .where(eq(albumsAlbumContents.albumId, id));
    const result = await db.delete(albums)
        .where(eq(albums.id, id));
    return result.rowsAffected;
}

export async function removeAll(ids: string[]): Promise<number> {
    await db.delete(albumsAlbumContents)
        .where(inArray(albumsAlbumContents.albumId, ids));
    const result = await db.delete(albums)
        .where(inArray(albums.id, ids));
    return result.rowsAffected;
}
