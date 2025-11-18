import { db } from "@server/db";
import {
    albums,
    albumMediaContents,
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
        albumMediaContents?: contents.SelectProps[];
    };
type AutoAlbum<T extends SelectProps> =
    T extends { albumMediaContents: (infer V)[]; }
        ? V extends contents.SelectProps
            ? types.Album
            : types.PartialAlbum
        : types.PartialAlbum;

export function format<T extends SelectProps>(props: T): AutoAlbum<T> {
    return {
        id: props.id,
        description: props.description,
        albumMediaContents: props.albumMediaContents?.map(contents.format),
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
    } as AutoAlbum<T>;
}

export async function getAllPartial(): Promise<types.PartialAlbum[]> {
    const result = await db.query.albums.findMany({
        // with: {
        //     albumMediaContents: {
        //         orderBy: (fields, operators) => operators.asc(fields.order),
        //     },
        // },
    });
    return result.map(format);
}

export async function getAll(): Promise<types.Album[]> {
    const result = await db.query.albums.findMany({
        with: {
            albumMediaContents: {
                orderBy: (fields, operators) => operators.asc(fields.order),
                with: {
                    albumMediaVariants: {
                        orderBy: (fields, operators) => operators.asc(fields.order),
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
        // with: {
        //     albumMediaContents: {
        //         orderBy: (fields, operators) => operators.asc(fields.order),
        //     },
        // },
    });
    return result ? format(result) : undefined;
}

export async function get(id: string): Promise<types.Album | undefined> {
    const result = await db.query.albums.findFirst({
        where: (fields, operators) => operators.eq(fields.id, id),
        with: {
            albumMediaContents: {
                orderBy: (fields, operators) => operators.asc(fields.order),
                with: {
                    albumMediaVariants: {
                        orderBy: (fields, operators) => operators.asc(fields.order),
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

    if (props.albumMediaContents) { // TODO
        const results = await db.insert(albumsAlbumContents)
            .values(props.albumMediaContents.map((value, index) => ({
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

    if (props.albumMediaContents) { // TODO
        if (props.albumMediaContents.set) {
            await db.delete(albumsAlbumContents)
                .where(eq(albumsAlbumContents.albumId, id));
            await db.insert(albumsAlbumContents)
                .values(props.albumMediaContents.set.map((value, index) => ({
                    albumId: id,
                    contentId: value,
                    order: index,
                })));
        } else {
            if (props.albumMediaContents.remove) {
                await db.delete(albumsAlbumContents)
                    .where(inArray(albumsAlbumContents.contentId, props.albumMediaContents.remove));
            }
            if (props.albumMediaContents.append) {
                const last = await db.select()
                    .from(albumsAlbumContents)
                    .where(eq(albumsAlbumContents.albumId, id))
                    .orderBy(desc(albumsAlbumContents.order))
                    .get();
                const startOrder = last ? last.order + 1 : 0;
                await db.insert(albumsAlbumContents)
                    .values(props.albumMediaContents.append.map((value, index) => ({
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
