import { db } from "@server/db";
import {
    mediaCategories,
    mediaCategoryGroups,
} from "@server/db/schema";
import {
    eq,
    inArray,
    desc,
} from "drizzle-orm";
import * as groups from "./groups";
import {
    SelectRequired,
    ListProps,
} from "@shared/types/utils";

export type SelectProps =
    typeof mediaCategories.$inferSelect
    & {
        mediaCategoryGroups: (
            typeof mediaCategoryGroups.$inferSelect
            & {
                mediaGroup?: groups.SelectProps;
            }
        )[];
    };
export type PartialMediaCategory = {
    id: string;
    category: string;
    mediaGroupIds: string[];
    mediaGroups?: groups.PartialMediaGroup[];
    createdAt: Date;
    updatedAt: Date;
};
export type MediaCategory = SelectRequired<PartialMediaCategory, "mediaGroups">;
type AutoMediaCategory<T extends SelectProps> =
    T extends { mediaCategoryGroups: (infer V)[]; }
        ? V extends { mediaGroup: groups.SelectProps; }
            ? MediaCategory
            : PartialMediaCategory
        : PartialMediaCategory;
export type CreateProps = {
    category: string;
    mediaGroups?: string[];
};
export type UpdateProps = {
    category?: string;
    mediaGroups?: ListProps<string>;
};

export function format<T extends SelectProps>(props: T): AutoMediaCategory<T> {
    return {
        id: props.id,
        category: props.category,
        mediaGroupIds: props.mediaCategoryGroups.map((value) => value.groupId),
        mediaGroups: props.mediaCategoryGroups.every((value) => value.mediaGroup != undefined)
            ? props.mediaCategoryGroups.map((value) => groups.format(value.mediaGroup!))
            : undefined,
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
    } as AutoMediaCategory<T>;
}

export async function getAllPartial(): Promise<PartialMediaCategory[]> {
    const result = await db.query.mediaCategories.findMany({
        with: {
            mediaCategoryGroups: {
                orderBy: (fields, operators) => operators.asc(fields.order),
            },
        },
    });
    return result.map(format);
}

export async function getAll(): Promise<MediaCategory[]> {
    const result = await db.query.mediaCategories.findMany({
        with: {
            mediaCategoryGroups: {
                orderBy: (fields, operators) => operators.asc(fields.order),
                with: {
                    mediaGroup: {
                        with: {
                            mediaGroupContents: {
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

export async function getPartial(id: string): Promise<PartialMediaCategory | undefined> {
    const result = await db.query.mediaCategories.findFirst({
        where: (fields, operators) => operators.eq(fields.id, id),
        with: {
            mediaCategoryGroups: {
                orderBy: (fields, operators) => operators.asc(fields.order),
            },
        },
    });
    return result ? format(result) : undefined;
}

export async function get(id: string): Promise<MediaCategory | undefined> {
    const result = await db.query.mediaCategories.findFirst({
        where: (fields, operators) => operators.eq(fields.id, id),
        with: {
            mediaCategoryGroups: {
                orderBy: (fields, operators) => operators.asc(fields.order),
                with: {
                    mediaGroup: {
                        with: {
                            mediaGroupContents: {
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

export async function create(props: CreateProps): Promise<PartialMediaCategory | undefined> {
    const result = await db.insert(mediaCategories)
        .values({
            category: props.category,
        })
        .returning()
        .get();
    if (!result) {
        return undefined;
    }

    if (props.mediaGroups) {
        const results = await db.insert(mediaCategoryGroups)
            .values(props.mediaGroups.map((value, index) => ({
                categoryId: result.id,
                groupId: value,
                order: index,
            })))
            .returning()
            .all();
        if (!results.every((value) => value != undefined)) {
            await db.delete(mediaCategoryGroups)
                .where(eq(mediaCategoryGroups.categoryId, result.id));
            await db.delete(mediaCategories)
                .where(eq(mediaCategories.id, result.id));
            return undefined;
        }
    }

    return await getPartial(result.id);
}

export async function update(id: string, props: UpdateProps): Promise<PartialMediaCategory | undefined> {
    if (props.category) {
        await db.update(mediaCategories)
            .set({
                category: props.category,
            })
            .where(eq(mediaCategories.id, id));
    }

    if (props.mediaGroups) {
        if (props.mediaGroups.set) {
            await db.delete(mediaCategoryGroups)
                .where(eq(mediaCategoryGroups.categoryId, id));
            await db.insert(mediaCategoryGroups)
                .values(props.mediaGroups.set.map((value, index) => ({
                    categoryId: id,
                    groupId: value,
                    order: index,
                })));
        } else {
            if (props.mediaGroups.remove) {
                await db.delete(mediaCategoryGroups)
                    .where(inArray(mediaCategoryGroups.groupId, props.mediaGroups.remove));
            }
            if (props.mediaGroups.append) {
                const last = await db.select()
                    .from(mediaCategoryGroups)
                    .where(eq(mediaCategoryGroups.categoryId, id))
                    .orderBy(desc(mediaCategoryGroups.order))
                    .get();
                const startOrder = last ? last.order + 1 : 0;
                await db.insert(mediaCategoryGroups)
                    .values(props.mediaGroups.append.map((value, index) => ({
                        categoryId: id,
                        groupId: value,
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

    await db.delete(mediaCategoryGroups)
        .where(eq(mediaCategoryGroups.categoryId, id));
    const result = await db.delete(mediaCategories)
        .where(eq(mediaCategories.id, id));
    return result.rowsAffected;
}
