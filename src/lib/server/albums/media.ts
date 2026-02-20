import { db } from "@server/db";
import {
    eq,
    inArray,
} from "drizzle-orm";
import { ALBUMS_MEDIA } from "@server/db/schema";
import * as mediaVariants from "./mediaVariants";
import * as types from "@type/albums/media";

export type SelectProps =
    typeof ALBUMS_MEDIA.$inferSelect
    & {
        albumsMediaVariants?: mediaVariants.SelectProps[];
    };
export type Media = types.AlbumsMedia;
export type PartialMedia = types.PartialAlbumsMedia;

type AutoMedia<T extends SelectProps> =
    T extends { albumsMediaVariants: mediaVariants.SelectProps[]; }
    ? Media
    : PartialMedia;

const mediaTable = ALBUMS_MEDIA;
const mediaQuery = db.query.ALBUMS_MEDIA;

export function format<T extends SelectProps>(albumId: string, props: T): AutoMedia<T> {
    return {
        contentId: props.contentId,
        albumsMediaVariants: props.albumsMediaVariants?.map((value) => mediaVariants.format(albumId, value)),
    } as AutoMedia<T>;
}

// export async function getAllPartial(): Promise<PartialMedia[]> {
//     const result = await mediaQuery.findMany({});
//     return result.map(format);
// }

// export async function getAll(): Promise<Media[]> {
//     const result = await mediaQuery.findMany({
//         with: {
//             albumsMediaVariants: {
//                 orderBy: (fields, operators) => operators.asc(fields.order),
//             },
//         },
//     });
//     return result.map(format);
// }

export async function getPartial(albumId: string, contentId: string): Promise<PartialMedia | undefined> {
    const result = await mediaQuery.findFirst({
        where: (fields, operators) => operators.eq(fields.contentId, contentId),
    });
    return result ? format(albumId, result) : undefined;
}

export async function get(albumId: string, contentId: string): Promise<Media | undefined> {
    const result = await mediaQuery.findFirst({
        where: (fields, operators) => operators.eq(fields.contentId, contentId),
        with: {
            albumsMediaVariants: {
                orderBy: (fields, operators) => operators.asc(fields.order),
            },
        },
    });
    return result ? format(albumId, result) : undefined;
}

export async function create(albumId: string, props: types.CreateProps): Promise<PartialMedia | undefined> {
    const result = await db.insert(mediaTable)
        .values({
            contentId: props.contentId,
        })
        .returning()
        .get();
    if (!result) {
        return undefined;
    }

    const list = await Promise.all(props.albumsMediaVariants.map((value) => mediaVariants.create(albumId, {
        mediaId: result.contentId,
        ...value,
    })));
    if (!list.every((value): value is mediaVariants.MediaVariant => value != undefined)) {
        await Promise.all(list.map((value) => value ? mediaVariants.remove(albumId, value.mediaId, value.tag) : undefined));
        await db.delete(mediaTable)
            .where(eq(mediaTable.contentId, result.contentId));
        return undefined;
    }

    return format(albumId, result);
}

export async function update(albumId: string, contentId: string, props: types.UpdateProps): Promise<PartialMedia | undefined> {
    if (props.albumsMediaVariants) {
        if (props.albumsMediaVariants.set) {
            await mediaVariants.removeList(albumId, contentId);
            await Promise.all(props.albumsMediaVariants.set.map((value) => mediaVariants.create(albumId, {
                mediaId: contentId,
                ...value,
            })));
        } else {
            if (props.albumsMediaVariants.remove) {
                await mediaVariants.removeList(albumId, contentId, props.albumsMediaVariants.remove);
            }
            if (props.albumsMediaVariants.append) {
                await Promise.all(props.albumsMediaVariants.append.map((value) => mediaVariants.create(albumId, {
                    mediaId: contentId,
                    ...value,
                })));
            }
        }
    }

    return await getPartial(albumId, contentId);
}

export async function remove(albumId: string, contentId: string): Promise<number> {
    await mediaVariants.removeList(albumId, contentId);
    const result = await db.delete(mediaTable)
        .where(eq(mediaTable.contentId, contentId));
    return result.rowsAffected;
}

export async function removeList(albumId: string, contentIds: string[]): Promise<number> {
    await Promise.all(contentIds.map((contentId) => mediaVariants.removeList(albumId, contentId)));
    const result = await db.delete(mediaTable)
        .where(inArray(mediaTable.contentId, contentIds));
    return result.rowsAffected;
}
