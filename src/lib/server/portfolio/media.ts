import { db } from "@server/db";
import { PORTFOLIO_MEDIA } from "@server/db/schema";
import {
    eq,
    inArray,
} from "drizzle-orm";
import * as mediaVariants from "./mediaVariants";
import * as types from "@type/portfolio/media";

export type SelectProps =
    typeof PORTFOLIO_MEDIA.$inferSelect
    & {
        portfolioMediaVariants?: mediaVariants.SelectProps[];
    };
export type Media = types.PortfolioMedia;
export type PartialMedia = types.PartialPortfolioMedia;

type AutoMedia<T extends SelectProps> =
    T extends { portfolioMediaVariants: mediaVariants.SelectProps[]; }
    ? Media
    : PartialMedia;

const mediaTable = PORTFOLIO_MEDIA;
const mediaQuery = db.query.PORTFOLIO_MEDIA;

export function format<T extends SelectProps>(props: T): AutoMedia<T> {
    return {
        id: props.id,
        portfolioMediaVariants: props.portfolioMediaVariants?.map((value) => mediaVariants.format(value)),
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
    } as AutoMedia<T>;
}

export async function getAllPartial(): Promise<PartialMedia[]> {
    const result = await mediaQuery.findMany({});
    return result.map(format);
}

export async function getAll(): Promise<Media[]> {
    const result = await mediaQuery.findMany({
        with: {
            portfolioMediaVariants: {
                orderBy: (fields, operators) => operators.asc(fields.order),
            },
        },
    });
    return result.map(format);
}

export async function getPartial(id: string): Promise<PartialMedia | undefined> {
    const result = await mediaQuery.findFirst({
        where: (fields, operators) => operators.eq(fields.id, id),
    });
    return result ? format(result) : undefined;
}

export async function get(id: string): Promise<Media | undefined> {
    const result = await mediaQuery.findFirst({
        where: (fields, operators) => operators.eq(fields.id, id),
        with: {
            portfolioMediaVariants: {
                orderBy: (fields, operators) => operators.asc(fields.order),
            },
        },
    });
    return result ? format(result) : undefined;
}

export async function create(props: types.CreateProps): Promise<PartialMedia | undefined> {
    const result = await db.insert(mediaTable)
        .values({})
        .returning()
        .get();
    if (!result) {
        return undefined;
    }

    const portfolioMediaVariants = await Promise.all(props.portfolioMediaVariants.map((value) => mediaVariants.create({
        mediaId: result.id,
        ...value,
    })));
    if (!portfolioMediaVariants.every((value): value is mediaVariants.MediaVariant => value != undefined)) {
        await Promise.all(portfolioMediaVariants.map((value) => value ? mediaVariants.remove(value.mediaId, value.tag) : undefined));
        await db.delete(mediaTable)
            .where(eq(mediaTable.id, result.id));
        return undefined;
    }

    return await getPartial(result.id);
}

export async function update(id: string, props: types.UpdateProps): Promise<PartialMedia | undefined> {
    if (props.portfolioMediaVariants) {
        if (props.portfolioMediaVariants.set) {
            await mediaVariants.removeList(id);
            await Promise.all(props.portfolioMediaVariants.set.map((value) => mediaVariants.create({
                mediaId: id,
                ...value,
            })));
        } else {
            if (props.portfolioMediaVariants.remove) {
                await mediaVariants.removeList(id, props.portfolioMediaVariants.remove);
            }
            if (props.portfolioMediaVariants.append) {
                await Promise.all(props.portfolioMediaVariants.append.map((value) => mediaVariants.create({
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
        .where(eq(mediaTable.id, id));
    return result.rowsAffected;
}

export async function removeList(ids: string[]): Promise<number> {
    await Promise.all(ids.map((id) => mediaVariants.removeList(id)));
    const result = await db.delete(mediaTable)
        .where(inArray(mediaTable.id, ids));
    return result.rowsAffected;
}
