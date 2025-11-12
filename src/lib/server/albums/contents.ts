import { db } from "@server/db";
import { albumContents } from "@server/db/schema";
import {
    eq,
    inArray,
} from "drizzle-orm";
import * as variants from "./variants";
import * as types from "@type/albums/contents";
import { AlbumVariant } from "@type/albums/variants";

export type SelectProps =
    typeof albumContents.$inferSelect
    & {
        albumVariants?: variants.SelectProps[];
    };
type AutoAlbumContent<T extends SelectProps> =
    T extends { albumVariants: variants.SelectProps[]; }
    ? types.AlbumContent
    : types.PartialAlbumContent;

export function format<T extends SelectProps>(props: T): AutoAlbumContent<T> {
    return {
        id: props.id,
        albumVariants: props.albumVariants?.map((value) => variants.format(value)),
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
    } as AutoAlbumContent<T>;
}

export async function getAllPartial(): Promise<types.PartialAlbumContent[]> {
    const result = await db.query.albumContents.findMany({});
    return result.map(format);
}

export async function getAll(): Promise<types.AlbumContent[]> {
    const result = await db.query.albumContents.findMany({
        with: {
            albumVariants: {
                orderBy: (fields, operators) => operators.asc(fields.order),
            },
        },
    });
    return result.map(format);
}

export async function getPartial(id: string): Promise<types.PartialAlbumContent | undefined> {
    const result = await db.query.albumContents.findFirst({
        where: (fields, operators) => operators.eq(fields.id, id),
    });
    return result ? format(result) : undefined;
}

export async function get(id: string): Promise<types.AlbumContent | undefined> {
    const result = await db.query.albumContents.findFirst({
        where: (fields, operators) => operators.eq(fields.id, id),
        with: {
            albumVariants: {
                orderBy: (fields, operators) => operators.asc(fields.order),
            },
        },
    });
    return result ? format(result) : undefined;
}

export async function create(props: types.CreateProps): Promise<types.PartialAlbumContent | undefined> {
    const result = await db.insert(albumContents)
        .values({})
        .returning()
        .get();
    if (!result) {
        return undefined;
    }

    const albumVariants = await Promise.all(props.albumVariants.map((value) => variants.create({
        contentId: result.id,
        ...value,
    })));
    if (!albumVariants.every((value): value is AlbumVariant => value != undefined)) {
        await Promise.all(albumVariants.map((value) => value ? variants.remove(value.contentId, value.variant) : undefined));
        await db.delete(albumContents)
            .where(eq(albumContents.id, result.id));
        return undefined;
    }

    return await getPartial(result.id);
}

export async function update(id: string, props: types.UpdateProps): Promise<types.PartialAlbumContent | undefined> {
    if (props.albumVariants) {
        if (props.albumVariants.set) {
            await variants.removeContent(id);
            await Promise.all(props.albumVariants.set.map((value) => variants.create({
                contentId: id,
                ...value,
            })));
        } else {
            if (props.albumVariants.remove) {
                await variants.removeAll(id, props.albumVariants.remove);
            }
            if (props.albumVariants.append) {
                await Promise.all(props.albumVariants.append.map((value) => variants.create({
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
    const result = await db.delete(albumContents)
        .where(eq(albumContents.id, id));
    return result.rowsAffected;
}

export async function removeAll(ids: string[]): Promise<number> {
    await Promise.all(ids.map((id) => variants.removeContent(id)));
    const result = await db.delete(albumContents)
        .where(inArray(albumContents.id, ids));
    return result.rowsAffected;
}
