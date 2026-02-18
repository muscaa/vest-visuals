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

export function format<T extends SelectProps>(props: T): AutoMedia<T> {
    return {
        contentId: props.contentId,
        albumsMediaVariants: props.albumsMediaVariants?.map((value) => mediaVariants.format(value)),
        // createdAt: props.createdAt,
        // updatedAt: props.updatedAt,
    } as AutoMedia<T>;
}

export async function getAllPartial(): Promise<PartialMedia[]> {
    const result = await mediaQuery.findMany({});
    return result.map(format);
}

export async function getAll(): Promise<Media[]> {
    const result = await mediaQuery.findMany({
        with: {
            albumsMediaVariants: {
                orderBy: (fields, operators) => operators.asc(fields.order),
            },
        },
    });
    return result.map(format);
}

export async function getPartial(id: string): Promise<PartialMedia | undefined> {
    const result = await mediaQuery.findFirst({
        where: (fields, operators) => operators.eq(fields.contentId, id),
    });
    return result ? format(result) : undefined;
}

export async function get(id: string): Promise<Media | undefined> {
    const result = await mediaQuery.findFirst({
        where: (fields, operators) => operators.eq(fields.contentId, id),
        with: {
            albumsMediaVariants: {
                orderBy: (fields, operators) => operators.asc(fields.order),
            },
        },
    });
    return result ? format(result) : undefined;
}

export async function create(props: types.CreateProps): Promise<PartialMedia | undefined> {
    const result = await db.insert(mediaTable)
        .values({
            contentId: props.contentId,
        })
        .returning()
        .get();
    if (!result) {
        return undefined;
    }

    const list = await Promise.all(props.albumsMediaVariants.map((value) => mediaVariants.create({
        mediaId: result.contentId,
        ...value,
    })));
    if (!list.every((value): value is mediaVariants.MediaVariant => value != undefined)) {
        await Promise.all(list.map((value) => value ? mediaVariants.remove(value.mediaId, value.tag) : undefined));
        await db.delete(mediaTable)
            .where(eq(mediaTable.contentId, result.contentId));
        return undefined;
    }

    return await getPartial(result.contentId);
}

export async function update(id: string, props: types.UpdateProps): Promise<PartialMedia | undefined> {
    if (props.albumsMediaVariants) {
        if (props.albumsMediaVariants.set) {
            await mediaVariants.removeList(id);
            await Promise.all(props.albumsMediaVariants.set.map((value) => mediaVariants.create({
                mediaId: id,
                ...value,
            })));
        } else {
            if (props.albumsMediaVariants.remove) {
                await mediaVariants.removeList(id, props.albumsMediaVariants.remove);
            }
            if (props.albumsMediaVariants.append) {
                await Promise.all(props.albumsMediaVariants.append.map((value) => mediaVariants.create({
                    mediaId: id,
                    ...value,
                })));
            }
        }
    }

    return await getPartial(id);
}

export async function remove(id: string): Promise<number> {
    const query = await getPartial(id);
    if (!query) return 0;

    await mediaVariants.removeList(id);
    const result = await db.delete(mediaTable)
        .where(eq(mediaTable.contentId, id));
    return result.rowsAffected;
}

export async function removeList(ids: string[]): Promise<number> {
    await Promise.all(ids.map((id) => mediaVariants.removeList(id)));
    const result = await db.delete(mediaTable)
        .where(inArray(mediaTable.contentId, ids));
    return result.rowsAffected;
}
