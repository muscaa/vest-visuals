import { db } from "@server/db";
import { ALBUMS_CONTENTS } from "@server/db/schema";
import { eq, inArray } from "drizzle-orm";
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
        albumsMedia: props.albumsMedia ? media.format(props.albumId, props.albumsMedia) : undefined,
        albumsDirectory: props.albumsDirectory ? directories.format(props.albumId, props.albumsDirectory) : undefined,
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
    } as unknown as AutoContent<T>;
}

export async function getAllPartial(): Promise<PartialContent[]> {
    const result = await contentsQuery.findMany({
        orderBy: (fields, operators) => operators.asc(fields.order),
    });
    return result.map(format);
}

export async function getAll(): Promise<Content[]> {
    const result = await contentsQuery.findMany({
        orderBy: (fields, operators) => operators.asc(fields.order),
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

export async function getByAlbumId(albumId: string): Promise<PartialContent[]> {
    const result = await contentsQuery.findMany({
        where: (fields, operators) => operators.eq(fields.albumId, albumId),
        orderBy: (fields, operators) => operators.asc(fields.order),
    });
    return result.map(format);
}

export async function getByPath(albumId: string, path?: string[]): Promise<Content[]> {
    const pathname = path && path.length > 0 ? path.join("/") + "/" : "";

    const result = await contentsQuery.findMany({
        where: (fields, operators) => operators.and(
            operators.eq(fields.albumId, albumId),
            operators.like(fields.path, `${pathname}%`),
            operators.notLike(fields.path, `${pathname}%/%`),
        ),
        orderBy: (fields, operators) => operators.asc(fields.order),
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

export async function getPaginatedByPathAndTags(offset: number, limit: number, albumId: string, path: string[] | undefined, tags: string[]): Promise<Content[]> {
    const pathname = path && path.length > 0 ? path.join("/") + "/" : "";

    const result = await contentsQuery.findMany({
        offset,
        limit,
        where: (fields, operators) => operators.and(
            operators.eq(fields.albumId, albumId),
            operators.like(fields.path, `${pathname}%`),
            operators.notLike(fields.path, `${pathname}%/%`),
        ),
        orderBy: (fields, operators) => operators.asc(fields.order),
        with: {
            albumsMedia: {
                with: {
                    albumsMediaVariants: {
                        where: (fields, operators) => operators.inArray(fields.tag, tags),
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
            path: props.path.join("/"),
            type: props.type,
            order: props.order,
        })
        .returning()
        .get();
    if (!result) {
        return undefined;
    }

    switch (props.type) {
        case "media":
            await media.create(props.albumId, {
                contentId: result.id,
                ...props.albumsMedia,
            });
            break;

        case "directory":
            await directories.create(props.albumId, {
                contentId: result.id,
                ...props.albumsDirectory,
            });
            break;
    }

    return format(result);
}

export async function update(id: string, props: types.UpdateProps): Promise<PartialContent | undefined> {
    if (props.path !== undefined || props.order !== undefined) {
        await db.update(contentsTable)
            .set({
                path: props.path?.join("/"),
                order: props.order,
            })
            .where(eq(contentsTable.id, id));
    }

    const content = await getPartial(id);

    if (content) {
        switch (props.type) {
            case "media":
                await media.update(content.albumId, id, props.albumsMedia);
                break;

            case "directory":
                console.log(id, props.albumsDirectory);
                await directories.update(content.albumId, id, props.albumsDirectory);
                break;
        }
    }

    return content;
}

export async function remove(id: string): Promise<number> {
    const content = await getPartial(id);
    if (!content) {
        return 0;
    }

    await media.remove(content.albumId, id);
    await directories.remove(content.albumId, id);

    const result = await db.delete(contentsTable)
        .where(eq(contentsTable.id, id));
    return result.rowsAffected;
}

export async function removeByAlbumId(albumId: string): Promise<number> {
    const list = await getByAlbumId(albumId);
    const ids = list.map((content) => content.id);

    await media.removeList(albumId, ids);
    await directories.removeList(albumId, ids);

    const result = await db.delete(contentsTable)
        .where(inArray(contentsTable.id, ids));
    return result.rowsAffected;
}
