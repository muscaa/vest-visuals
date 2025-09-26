import { db } from "@server/db";
import {
    mediaContents,
} from "@server/db/schema";
import {
    eq,
    inArray,
} from "drizzle-orm";
import * as variants from "./variants";
import * as types from "@type/media/contents";
import { MediaVariant } from "@type/media/variants";

export type SelectProps =
    typeof mediaContents.$inferSelect
    & {
        mediaVariants?: variants.SelectProps[];
    };
type AutoMediaContent<T extends SelectProps> =
    T extends { mediaVariants: variants.SelectProps[]; }
    ? types.MediaContent
    : types.PartialMediaContent;

export function format<T extends SelectProps>(props: T): AutoMediaContent<T> {
    return {
        id: props.id,
        mediaVariants: props.mediaVariants?.map((value) => variants.format(value)),
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
    } as AutoMediaContent<T>;
}

export async function getAllPartial(): Promise<types.PartialMediaContent[]> {
    const result = await db.query.mediaContents.findMany({});
    return result.map(format);
}

export async function getAll(): Promise<types.MediaContent[]> {
    const result = await db.query.mediaContents.findMany({
        with: {
            mediaVariants: {
                orderBy: (fields, operators) => operators.asc(fields.order),
            },
        },
    });
    return result.map(format);
}

export async function getPartial(id: string): Promise<types.PartialMediaContent | undefined> {
    const result = await db.query.mediaContents.findFirst({
        where: (fields, operators) => operators.eq(fields.id, id),
    });
    return result ? format(result) : undefined;
}

export async function get(id: string): Promise<types.MediaContent | undefined> {
    const result = await db.query.mediaContents.findFirst({
        where: (fields, operators) => operators.eq(fields.id, id),
        with: {
            mediaVariants: {
                orderBy: (fields, operators) => operators.asc(fields.order),
            },
        },
    });
    return result ? format(result) : undefined;
}

export async function create(props: types.CreateProps): Promise<types.PartialMediaContent | undefined> {
    const result = await db.insert(mediaContents)
        .values({})
        .returning()
        .get();
    if (!result) {
        return undefined;
    }

    const mediaVariants = await Promise.all(props.mediaVariants.map((value) => variants.create({
        contentId: result.id,
        ...value,
    })));
    if (!mediaVariants.every((value): value is MediaVariant => value != undefined)) {
        await Promise.all(mediaVariants.map((value) => value ? variants.remove(value.contentId, value.variant) : undefined));
        await db.delete(mediaContents)
            .where(eq(mediaContents.id, result.id));
        return undefined;
    }

    return await getPartial(result.id);
}

export async function update(id: string, props: types.UpdateProps): Promise<types.PartialMediaContent | undefined> {
    if (props.mediaVariants) {
        if (props.mediaVariants.set) {
            await variants.removeContent(id);
            await Promise.all(props.mediaVariants.set.map((value) => variants.create({
                contentId: id,
                ...value,
            })));
        } else {
            if (props.mediaVariants.remove) {
                await variants.removeAll(id, props.mediaVariants.remove);
            }
            if (props.mediaVariants.append) {
                await Promise.all(props.mediaVariants.append.map((value) => variants.create({
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
    const result = await db.delete(mediaContents)
        .where(eq(mediaContents.id, id));
    return result.rowsAffected;
}

export async function removeAll(ids: string[]): Promise<number> {
    await Promise.all(ids.map((id) => variants.removeContent(id)));
    const result = await db.delete(mediaContents)
        .where(inArray(mediaContents.id, ids));
    return result.rowsAffected;
}
