import { db } from "@server/db";
import {
    mediaContents,
    mediaContentVariants,
} from "@server/db/schema";
import { eq } from "drizzle-orm";
import * as variants from "./variants";
import { SelectRequired } from "@server/db/utils";

export type SelectProps =
    typeof mediaContents.$inferSelect
    & {
        mediaContentVariants: (
            typeof mediaContentVariants.$inferSelect
            & {
                mediaVariant?: variants.SelectProps;
            }
        )[];
    };
export type PartialMediaContent = {
    id: string;
    mediaVariantIds: string[];
    mediaVariants?: variants.MediaVariant[];
    createdAt: Date;
    updatedAt: Date;
};
export type MediaContent = SelectRequired<PartialMediaContent, "mediaVariants">;
type AutoMediaContent<T extends SelectProps> =
    T extends { mediaContentVariants: (infer V)[]; }
        ? V extends { mediaVariant: variants.SelectProps; }
            ? MediaContent
            : PartialMediaContent
        : PartialMediaContent;
export type CreateProps = {
    mediaVariants: variants.CreateProps[];
};

export function format<T extends SelectProps>(props: T): AutoMediaContent<T> {
    return {
        id: props.id,
        mediaVariantIds: props.mediaContentVariants.map((value) => value.variantId),
        mediaVariants: props.mediaContentVariants.every((value) => value.mediaVariant != undefined)
            ? props.mediaContentVariants.map((value) => variants.format(value.mediaVariant!))
            : undefined,
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
    } as AutoMediaContent<T>;
}

export async function getAllPartial(): Promise<PartialMediaContent[]> {
    const result = await db.query.mediaContents.findMany({
        with: {
            mediaContentVariants: {
                orderBy: (fields, operators) => operators.asc(fields.order),
            },
        },
    });
    return result.map(format);
}

export async function getAll(): Promise<MediaContent[]> {
    const result = await db.query.mediaContents.findMany({
        with: {
            mediaContentVariants: {
                orderBy: (fields, operators) => operators.asc(fields.order),
                with: {
                    mediaVariant: true,
                },
            },
        },
    });
    return result.map(format);
}

export async function getPartial(id: string): Promise<PartialMediaContent | undefined> {
    const result = await db.query.mediaContents.findFirst({
        where: (fields, operators) => operators.eq(fields.id, id),
        with: {
            mediaContentVariants: {
                orderBy: (fields, operators) => operators.asc(fields.order),
            },
        },
    });
    return result ? format(result) : undefined;
}

export async function get(id: string): Promise<MediaContent | undefined> {
    const result = await db.query.mediaContents.findFirst({
        where: (fields, operators) => operators.eq(fields.id, id),
        with: {
            mediaContentVariants: {
                orderBy: (fields, operators) => operators.asc(fields.order),
                with: {
                    mediaVariant: true,
                },
            },
        },
    });
    return result ? format(result) : undefined;
}

export async function create(props: CreateProps): Promise<PartialMediaContent | undefined> {
    const mediaVariants = await Promise.all(props.mediaVariants.map(variants.create));
    if (!mediaVariants.every((value): value is variants.MediaVariant => value != undefined)) {
        await Promise.all(mediaVariants.map((value) => value ? variants.remove(value.id) : undefined));
        return undefined;
    }

    const result = await db.insert(mediaContents)
        .values({})
        .returning()
        .get();
    if (!result) {
        await Promise.all(mediaVariants.map((value) => variants.remove(value.id)));
        return undefined;
    }

    const results = await db.insert(mediaContentVariants)
        .values(mediaVariants.map((value, index) => ({
            contentId: result.id,
            variantId: value.id,
            order: index,
        })))
        .returning()
        .all();
    if (!results.every((value) => value != undefined)) {
        await Promise.all(mediaVariants.map((value) => value ? variants.remove(value.id) : undefined));
        await db.delete(mediaContents)
            .where(eq(mediaContents.id, result.id));
        return undefined;
    }

    return await getPartial(result.id);
}

export async function remove(id: string): Promise<number> {
    const query = await getPartial(id);
    if (!query) return 0;

    await Promise.all(query.mediaVariantIds.map(variants.remove));
    const result = await db.delete(mediaContents)
        .where(eq(mediaContents.id, id));
    return result.rowsAffected;
}
