import { db } from "@server/db";
import {
    mediaGroups,
    mediaGroupContents,
} from "@server/db/schema";
import {
    eq,
    inArray,
    desc,
} from "drizzle-orm";
import * as contents from "./contents";
import {
    SelectRequired,
    ListProps,
} from "@shared/types/utils";

export type SelectProps =
    typeof mediaGroups.$inferSelect
    & {
        mediaGroupContents: (
            typeof mediaGroupContents.$inferSelect
            & {
                mediaContent?: contents.SelectProps;
            }
        )[];
    };
export type PartialMediaGroup = {
    id: string;
    mediaContentIds: string[];
    mediaContents?: contents.PartialMediaContent[];
    createdAt: Date;
    updatedAt: Date;
};
export type MediaGroup = Omit<PartialMediaGroup, "mediaContents"> & { mediaContents: contents.MediaContent[]; };
type AutoMediaGroup<T extends SelectProps> =
    T extends { mediaGroupContents: (infer V)[]; }
        ? V extends { mediaContent: contents.SelectProps; }
            ? MediaGroup
            : PartialMediaGroup
        : PartialMediaGroup;
export type CreateProps = {
    mediaContents?: string[];
};
export type UpdateProps = {
    mediaContents?: ListProps<string>;
};

export function format<T extends SelectProps>(props: T): AutoMediaGroup<T> {
    return {
        id: props.id,
        mediaContentIds: props.mediaGroupContents.map((value) => value.contentId),
        mediaContents: props.mediaGroupContents.every((value) => value.mediaContent != undefined)
            ? props.mediaGroupContents.map((value) => contents.format(value.mediaContent!))
            : undefined,
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
    } as AutoMediaGroup<T>;
}

export async function getAllPartial(): Promise<PartialMediaGroup[]> {
    const result = await db.query.mediaGroups.findMany({
        with: {
            mediaGroupContents: {
                orderBy: (fields, operators) => operators.asc(fields.order),
            },
        },
    });
    return result.map(format);
}

export async function getAll(): Promise<MediaGroup[]> {
    const result = await db.query.mediaGroups.findMany({
        with: {
            mediaGroupContents: {
                orderBy: (fields, operators) => operators.asc(fields.order),
                with: {
                    mediaContent: {
                        with: {
                            mediaContentVariants: {
                                orderBy: (fields, operators) => operators.asc(fields.order),
                                with: {
                                    mediaVariant: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });
    return result.map(format);
}

export async function getPartial(id: string): Promise<PartialMediaGroup | undefined> {
    const result = await db.query.mediaGroups.findFirst({
        where: (fields, operators) => operators.eq(fields.id, id),
        with: {
            mediaGroupContents: {
                orderBy: (fields, operators) => operators.asc(fields.order),
            },
        },
    });
    return result ? format(result) : undefined;
}

export async function get(id: string): Promise<MediaGroup | undefined> {
    const result = await db.query.mediaGroups.findFirst({
        where: (fields, operators) => operators.eq(fields.id, id),
        with: {
            mediaGroupContents: {
                orderBy: (fields, operators) => operators.asc(fields.order),
                with: {
                    mediaContent: {
                        with: {
                            mediaContentVariants: {
                                orderBy: (fields, operators) => operators.asc(fields.order),
                                with: {
                                    mediaVariant: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });
    return result ? format(result) : undefined;
}

export async function create(props: CreateProps): Promise<PartialMediaGroup | undefined> {
    const result = await db.insert(mediaGroups)
        .values({})
        .returning()
        .get();
    if (!result) {
        return undefined;
    }

    if (props.mediaContents) {
        const results = await db.insert(mediaGroupContents)
            .values(props.mediaContents.map((value, index) => ({
                groupId: result.id,
                contentId: value,
                order: index,
            })))
            .returning()
            .all();
        if (!results.every((value) => value != undefined)) {
            await db.delete(mediaGroupContents)
                .where(eq(mediaGroupContents.groupId, result.id));
            await db.delete(mediaGroups)
                .where(eq(mediaGroups.id, result.id));
            return undefined;
        }
    }

    return await getPartial(result.id);
}

export async function update(id: string, props: UpdateProps): Promise<PartialMediaGroup | undefined> {
    if (props.mediaContents) {
        if (props.mediaContents.set) {
            await db.delete(mediaGroupContents)
                .where(eq(mediaGroupContents.groupId, id));
            await db.insert(mediaGroupContents)
                .values(props.mediaContents.set.map((value, index) => ({
                    groupId: id,
                    contentId: value,
                    order: index,
                })));
        } else {
            if (props.mediaContents.remove) {
                await db.delete(mediaGroupContents)
                    .where(inArray(mediaGroupContents.contentId, props.mediaContents.remove));
            }
            if (props.mediaContents.append) {
                const last = await db.select()
                    .from(mediaGroupContents)
                    .where(eq(mediaGroupContents.groupId, id))
                    .orderBy(desc(mediaGroupContents.order))
                    .get();
                const startOrder = last ? last.order + 1 : 0;
                await db.insert(mediaGroupContents)
                    .values(props.mediaContents.append.map((value, index) => ({
                        groupId: id,
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

    await db.delete(mediaGroupContents)
        .where(eq(mediaGroupContents.groupId, id));
    const result = await db.delete(mediaGroups)
        .where(eq(mediaGroups.id, id));
    return result.rowsAffected;
}

export async function removeAll(ids: string[]): Promise<number> {
    await db.delete(mediaGroupContents)
        .where(inArray(mediaGroupContents.groupId, ids));
    const result = await db.delete(mediaGroups)
        .where(inArray(mediaGroups.id, ids));
    return result.rowsAffected;
}
