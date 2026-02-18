import { db } from "@server/db";
import {
    eq,
    inArray,
} from "drizzle-orm";
import { ALBUMS_DIRECTORIES } from "@server/db/schema";
import * as types from "@type/albums/directories";

export type SelectProps = typeof ALBUMS_DIRECTORIES.$inferSelect;
export type Directory = types.AlbumsDirectory;

const directoriesTable = ALBUMS_DIRECTORIES;
const directoriesQuery = db.query.ALBUMS_DIRECTORIES;

export function format<T extends SelectProps>(props: T): Directory {
    return {
        contentId: props.contentId,
        name: props.name,
        cover: props.cover,
        // createdAt: props.createdAt,
        // updatedAt: props.updatedAt,
    } as Directory;
}

export async function getAll(): Promise<Directory[]> {
    const result = await directoriesQuery.findMany({});
    return result.map(format);
}

export async function get(id: string): Promise<Directory | undefined> {
    const result = await directoriesQuery.findFirst({
        where: (fields, operators) => operators.eq(fields.contentId, id),
    });
    return result ? format(result) : undefined;
}

export async function create(props: types.CreateProps): Promise<Directory | undefined> {
    const result = await db.insert(directoriesTable)
        .values({
            contentId: props.contentId,
            name: props.name,
            cover: props.cover,
        })
        .returning()
        .get();
    if (!result) {
        return undefined;
    }

    return await get(result.contentId);
}

export async function update(id: string, props: types.UpdateProps): Promise<Directory | undefined> {
    await db.update(directoriesTable)
        .set({
            name: props.name,
            cover: props.cover,
        })
        .where(eq(directoriesTable.contentId, id));

    return await get(id);
}

export async function remove(id: string): Promise<number> {
    const query = await get(id);
    if (!query) return 0;

    const result = await db.delete(directoriesTable)
        .where(eq(directoriesTable.contentId, id));
    return result.rowsAffected;
}

export async function removeList(ids: string[]): Promise<number> {
    const result = await db.delete(directoriesTable)
        .where(inArray(directoriesTable.contentId, ids));
    return result.rowsAffected;
}
