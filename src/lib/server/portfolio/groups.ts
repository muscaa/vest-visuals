import { db } from "@server/db";
import {
    PORTFOLIO_GROUPS,
    PORTFOLIO_GROUP_MEDIA,
} from "@server/db/schema";
import {
    eq,
    inArray,
    desc,
} from "drizzle-orm";
import * as media from "./media";
import * as types from "@type/portfolio/groups";

export type SelectProps =
    typeof PORTFOLIO_GROUPS.$inferSelect
    & {
        portfolioGroupMedia: (
            typeof PORTFOLIO_GROUP_MEDIA.$inferSelect
            & {
                portfolioMedia?: media.SelectProps;
            }
        )[];
    };
export type Group = types.PortfolioGroup;
export type PartialGroup = types.PartialPortfolioGroup;

type AutoGroup<T extends SelectProps> =
    T extends { portfolioGroupMedia: (infer V)[]; }
    ? V extends { portfolioMedia: media.SelectProps; }
    ? Group
    : PartialGroup
    : PartialGroup;

const groupsTable = PORTFOLIO_GROUPS;
const groupsQuery = db.query.PORTFOLIO_GROUPS;
const groupMediaTable = PORTFOLIO_GROUP_MEDIA;

export function format<T extends SelectProps>(props: T): AutoGroup<T> {
    return {
        id: props.id,
        location: props.location,
        description: props.description,
        portfolioMediaIds: props.portfolioGroupMedia.map((value) => value.mediaId),
        portfolioMedia: props.portfolioGroupMedia.every((value) => value.portfolioMedia != undefined)
            ? props.portfolioGroupMedia.map((value) => media.format(value.portfolioMedia!))
            : undefined,
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
    } as AutoGroup<T>;
}

export async function getAllPartial(): Promise<PartialGroup[]> {
    const result = await groupsQuery.findMany({
        with: {
            portfolioGroupMedia: {
                orderBy: (fields, operators) => operators.asc(fields.order),
            },
        },
    });
    return result.map(format);
}

export async function getAll(): Promise<Group[]> {
    const result = await groupsQuery.findMany({
        with: {
            portfolioGroupMedia: {
                orderBy: (fields, operators) => operators.asc(fields.order),
                with: {
                    portfolioMedia: {
                        with: {
                            portfolioMediaVariants: {
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

export async function getPartial(id: string): Promise<PartialGroup | undefined> {
    const result = await groupsQuery.findFirst({
        where: (fields, operators) => operators.eq(fields.id, id),
        with: {
            portfolioGroupMedia: {
                orderBy: (fields, operators) => operators.asc(fields.order),
            },
        },
    });
    return result ? format(result) : undefined;
}

export async function get(id: string): Promise<Group | undefined> {
    const result = await groupsQuery.findFirst({
        where: (fields, operators) => operators.eq(fields.id, id),
        with: {
            portfolioGroupMedia: {
                orderBy: (fields, operators) => operators.asc(fields.order),
                with: {
                    portfolioMedia: {
                        with: {
                            portfolioMediaVariants: {
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

export async function getByLocation(location: string): Promise<Group[]> {
    const result = await groupsQuery.findMany({
        where: (fields, operators) => operators.eq(fields.location, location),
        with: {
            portfolioGroupMedia: {
                orderBy: (fields, operators) => operators.asc(fields.order),
                with: {
                    portfolioMedia: {
                        with: {
                            portfolioMediaVariants: {
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

export async function create(props: types.CreateProps): Promise<PartialGroup | undefined> {
    const result = await db.insert(groupsTable)
        .values({
            location: props.location,
            description: props.description,
        })
        .returning()
        .get();
    if (!result) {
        return undefined;
    }

    if (props.portfolioMedia) {
        const results = await db.insert(groupMediaTable)
            .values(props.portfolioMedia.map((value, index) => ({
                groupId: result.id,
                mediaId: value,
                order: index,
            })))
            .returning()
            .all();
        if (!results.every((value) => value != undefined)) {
            await db.delete(groupMediaTable)
                .where(eq(groupMediaTable.groupId, result.id));
            await db.delete(groupsTable)
                .where(eq(groupsTable.id, result.id));
            return undefined;
        }
    }

    return await getPartial(result.id);
}

export async function update(id: string, props: types.UpdateProps): Promise<PartialGroup | undefined> {
    if (props.location || props.location === null) {
        await db.update(groupsTable)
            .set({
                location: props.location,
            })
            .where(eq(groupsTable.id, id));
    }
    if (props.description || props.description === null) {
        await db.update(groupsTable)
            .set({
                description: props.description,
            })
            .where(eq(groupsTable.id, id));
    }

    if (props.portfolioMedia) {
        if (props.portfolioMedia.set) {
            await db.delete(groupMediaTable)
                .where(eq(groupMediaTable.groupId, id));
            await db.insert(groupMediaTable)
                .values(props.portfolioMedia.set.map((value, index) => ({
                    groupId: id,
                    mediaId: value,
                    order: index,
                })));
        } else {
            if (props.portfolioMedia.remove) {
                await db.delete(groupMediaTable)
                    .where(inArray(groupMediaTable.mediaId, props.portfolioMedia.remove));
            }
            if (props.portfolioMedia.append) {
                const last = await db.select()
                    .from(groupMediaTable)
                    .where(eq(groupMediaTable.groupId, id))
                    .orderBy(desc(groupMediaTable.order))
                    .get();
                const startOrder = last ? last.order + 1 : 0;
                await db.insert(groupMediaTable)
                    .values(props.portfolioMedia.append.map((value, index) => ({
                        groupId: id,
                        mediaId: value,
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

    await db.delete(groupMediaTable)
        .where(eq(groupMediaTable.groupId, id));
    const result = await db.delete(groupsTable)
        .where(eq(groupsTable.id, id));
    return result.rowsAffected;
}

export async function removeList(ids: string[]): Promise<number> {
    await db.delete(groupMediaTable)
        .where(inArray(groupMediaTable.groupId, ids));
    const result = await db.delete(groupsTable)
        .where(inArray(groupsTable.id, ids));
    return result.rowsAffected;
}
