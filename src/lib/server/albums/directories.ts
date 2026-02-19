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

export function format<T extends SelectProps>(albumId: string, props: T): Directory {
    return {
        contentId: props.contentId,
        name: props.name,
        cover: props.cover,
    } as Directory;
}

// export async function getAll(): Promise<Directory[]> {
//     const result = await directoriesQuery.findMany({});
//     return result.map(format);
// }

export async function get(albumId: string, contentId: string): Promise<Directory | undefined> {
    const result = await directoriesQuery.findFirst({
        where: (fields, operators) => operators.eq(fields.contentId, contentId),
    });
    return result ? format(albumId, result) : undefined;
}

export async function create(albumId: string, props: types.CreateProps): Promise<Directory | undefined> {
    const result = await db.insert(directoriesTable)
        .values({
            contentId: props.contentId,
            name: props.name,
            cover: props.cover,
        })
        .returning()
        .get();
    return result ? format(albumId, result) : undefined;
}

export async function update(albumId: string, contentId: string, props: types.UpdateProps): Promise<Directory | undefined> {
    const result = await db.update(directoriesTable)
        .set({
            name: props.name,
            cover: props.cover,
        })
        .where(eq(directoriesTable.contentId, contentId))
        .returning()
        .get();
    return result ? format(albumId, result) : undefined;
}

export async function remove(albumId: string, contentId: string): Promise<number> {
    const result = await db.delete(directoriesTable)
        .where(eq(directoriesTable.contentId, contentId));
    return result.rowsAffected;
}
