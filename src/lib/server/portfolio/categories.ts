import { db } from "@server/db";
import {
    PORTFOLIO_CATEGORIES,
    PORTFOLIO_CATEGORY_GROUPS,
} from "@server/db/schema";
import {
    eq,
    inArray,
    desc,
} from "drizzle-orm";
import * as groups from "./groups";
import * as types from "@type/portfolio/categories";

export type SelectProps =
    typeof PORTFOLIO_CATEGORIES.$inferSelect
    & {
        portfolioCategoryGroups: (
            typeof PORTFOLIO_CATEGORY_GROUPS.$inferSelect
            & {
                portfolioGroup?: groups.SelectProps;
            }
        )[];
    };
export type Category = types.PortfolioCategory;
export type PartialCategory = types.PartialPortfolioCategory;

type AutoCategory<T extends SelectProps> =
    T extends { portfolioCategoryGroups: (infer V)[]; }
    ? V extends { portfolioGroup: groups.SelectProps; }
    ? Category
    : PartialCategory
    : PartialCategory;

const categoriesTable = PORTFOLIO_CATEGORIES;
const categoriesQuery = db.query.PORTFOLIO_CATEGORIES;
const categoryGroupTable = PORTFOLIO_CATEGORY_GROUPS;

export function format<T extends SelectProps>(props: T): AutoCategory<T> {
    return {
        id: props.id,
        tag: props.tag,
        portfolioGroupIds: props.portfolioCategoryGroups.map((value) => value.groupId),
        portfolioGroups: props.portfolioCategoryGroups.every((value) => value.portfolioGroup != undefined)
            ? props.portfolioCategoryGroups.map((value) => groups.format(value.portfolioGroup!))
            : undefined,
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
    } as AutoCategory<T>;
}

export async function getAllPartial(): Promise<PartialCategory[]> {
    const result = await categoriesQuery.findMany({
        with: {
            portfolioCategoryGroups: {
                orderBy: (fields, operators) => operators.asc(fields.order),
            },
        },
    });
    return result.map(format);
}

export async function getAll(): Promise<Category[]> {
    const result = await categoriesQuery.findMany({
        with: {
            portfolioCategoryGroups: {
                orderBy: (fields, operators) => operators.asc(fields.order),
                with: {
                    portfolioGroup: {
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
                    },
                },
            },
        },
    });
    return result.map(format);
}

export async function getPartial(id: string): Promise<PartialCategory | undefined> {
    const result = await categoriesQuery.findFirst({
        where: (fields, operators) => operators.eq(fields.id, id),
        with: {
            portfolioCategoryGroups: {
                orderBy: (fields, operators) => operators.asc(fields.order),
            },
        },
    });
    return result ? format(result) : undefined;
}

export async function get(id: string): Promise<Category | undefined> {
    const result = await categoriesQuery.findFirst({
        where: (fields, operators) => operators.eq(fields.id, id),
        with: {
            portfolioCategoryGroups: {
                orderBy: (fields, operators) => operators.asc(fields.order),
                with: {
                    portfolioGroup: {
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
                    },
                },
            },
        },
    });
    return result ? format(result) : undefined;
}

export async function getByTag(tag: string): Promise<Category | undefined> {
    const result = await categoriesQuery.findFirst({
        where: (fields, operators) => operators.eq(fields.tag, tag),
        with: {
            portfolioCategoryGroups: {
                orderBy: (fields, operators) => operators.asc(fields.order),
                with: {
                    portfolioGroup: {
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
                    },
                },
            },
        },
    });
    return result ? format(result) : undefined;
}

export async function create(props: types.CreateProps): Promise<PartialCategory | undefined> {
    const result = await db.insert(categoriesTable)
        .values({
            tag: props.tag,
        })
        .returning()
        .get();
    if (!result) {
        return undefined;
    }

    if (props.portfolioGroups) {
        const results = await db.insert(categoryGroupTable)
            .values(props.portfolioGroups.map((value, index) => ({
                categoryId: result.id,
                groupId: value,
                order: index,
            })))
            .returning()
            .all();
        if (!results.every((value) => value != undefined)) {
            await db.delete(categoryGroupTable)
                .where(eq(categoryGroupTable.categoryId, result.id));
            await db.delete(categoriesTable)
                .where(eq(categoriesTable.id, result.id));
            return undefined;
        }
    }

    return await getPartial(result.id);
}

export async function update(id: string, props: types.UpdateProps): Promise<PartialCategory | undefined> {
    if (props.tag) {
        await db.update(categoriesTable)
            .set({
                tag: props.tag,
            })
            .where(eq(categoriesTable.id, id));
    }

    if (props.portfolioGroups) {
        if (props.portfolioGroups.set) {
            await db.delete(categoryGroupTable)
                .where(eq(categoryGroupTable.categoryId, id));
            await db.insert(categoryGroupTable)
                .values(props.portfolioGroups.set.map((value, index) => ({
                    categoryId: id,
                    groupId: value,
                    order: index,
                })));
        } else {
            if (props.portfolioGroups.remove) {
                await db.delete(categoryGroupTable)
                    .where(inArray(categoryGroupTable.groupId, props.portfolioGroups.remove));
            }
            if (props.portfolioGroups.append) {
                const last = await db.select()
                    .from(categoryGroupTable)
                    .where(eq(categoryGroupTable.categoryId, id))
                    .orderBy(desc(categoryGroupTable.order))
                    .get();
                const startOrder = last ? last.order + 1 : 0;
                await db.insert(categoryGroupTable)
                    .values(props.portfolioGroups.append.map((value, index) => ({
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

    await db.delete(categoryGroupTable)
        .where(eq(categoryGroupTable.categoryId, id));
    const result = await db.delete(categoriesTable)
        .where(eq(categoriesTable.id, id));
    return result.rowsAffected;
}

export async function removeList(ids: string[]): Promise<number> {
    await db.delete(categoryGroupTable)
        .where(inArray(categoryGroupTable.categoryId, ids));
    const result = await db.delete(categoriesTable)
        .where(inArray(categoriesTable.id, ids));
    return result.rowsAffected;
}
