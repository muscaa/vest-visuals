import { db } from "@server/db";
import { albumMediaContents } from "@server/db/schema";
import {
    eq,
    inArray,
} from "drizzle-orm";
import * as variants from "./variants";
import * as types from "@type/albums/contents";
import { AlbumMediaVariant } from "@type/albums/variants";

export type SelectProps =
    typeof albumMediaContents.$inferSelect
    & {
        albumMediaVariants?: variants.SelectProps[];
    };
type AutoAlbumMediaContent<T extends SelectProps> =
    T extends { albumMediaVariants: variants.SelectProps[]; }
    ? types.AlbumMediaContent
    : types.PartialAlbumMediaContent;

export function format<T extends SelectProps>(props: T): AutoAlbumMediaContent<T> {
    return {
        id: props.id,
        albumId: props.albumId,
        order: props.order,
        albumMediaVariants: props.albumMediaVariants?.map((value) => variants.format(value)),
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
    } as AutoAlbumMediaContent<T>;
}

export async function getAllPartial(): Promise<types.PartialAlbumMediaContent[]> {
    const result = await db.query.albumMediaContents.findMany({});
    return result.map(format);
}

export async function getAll(): Promise<types.AlbumMediaContent[]> {
    const result = await db.query.albumMediaContents.findMany({
        with: {
            albumMediaVariants: {
                orderBy: (fields, operators) => operators.asc(fields.order),
            },
        },
    });
    return result.map(format);
}

export async function getPartial(id: string): Promise<types.PartialAlbumMediaContent | undefined> {
    const result = await db.query.albumMediaContents.findFirst({
        where: (fields, operators) => operators.eq(fields.id, id),
    });
    return result ? format(result) : undefined;
}

export async function get(id: string): Promise<types.AlbumMediaContent | undefined> {
    const result = await db.query.albumMediaContents.findFirst({
        where: (fields, operators) => operators.eq(fields.id, id),
        with: {
            albumMediaVariants: {
                orderBy: (fields, operators) => operators.asc(fields.order),
            },
        },
    });
    return result ? format(result) : undefined;
}

export async function create(props: types.CreateProps): Promise<types.PartialAlbumMediaContent | undefined> {
    const result = await db.insert(albumMediaContents)
        .values({
            // TODO
        })
        .returning()
        .get();
    if (!result) {
        return undefined;
    }

    const albumVariants = await Promise.all(props.albumMediaVariants.map((value) => variants.create({
        contentId: result.id,
        ...value,
    })));
    if (!albumVariants.every((value): value is AlbumMediaVariant => value != undefined)) {
        await Promise.all(albumVariants.map((value) => value ? variants.remove(value.contentId, value.tag) : undefined));
        await db.delete(albumMediaContents)
            .where(eq(albumMediaContents.id, result.id));
        return undefined;
    }

    return await getPartial(result.id);
}

export async function update(id: string, props: types.UpdateProps): Promise<types.PartialAlbumMediaContent | undefined> {
    if (props.albumMediaVariants) {
        if (props.albumMediaVariants.set) {
            await variants.removeContent(id);
            await Promise.all(props.albumMediaVariants.set.map((value) => variants.create({
                contentId: id,
                ...value,
            })));
        } else {
            if (props.albumMediaVariants.remove) {
                await variants.removeAll(id, props.albumMediaVariants.remove);
            }
            if (props.albumMediaVariants.append) {
                await Promise.all(props.albumMediaVariants.append.map((value) => variants.create({
                    contentId: id,
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

    await variants.removeContent(id);
    const result = await db.delete(albumMediaContents)
        .where(eq(albumMediaContents.id, id));
    return result.rowsAffected;
}

export async function removeAll(ids: string[]): Promise<number> {
    await Promise.all(ids.map((id) => variants.removeContent(id)));
    const result = await db.delete(albumMediaContents)
        .where(inArray(albumMediaContents.id, ids));
    return result.rowsAffected;
}
