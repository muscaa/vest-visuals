import { db } from "@server/db";
import {
    mediaContents,
    mediaContentVariants,
} from "@server/db/schema/mediaContents";
import { eq } from "drizzle-orm";

export type MediaContent = typeof mediaContents.$inferSelect;
type InsertProps = typeof mediaContents.$inferInsert;
type CreateProps = InsertProps;
type UpdateProps = InsertProps;

export async function getAll(): Promise<MediaContent[]> {
    const result = await db.select()
        .from(mediaContents)
        .all();
    return result;
}

export async function get(id: string): Promise<MediaContent | undefined> {
    const result = await db.select()
        .from(mediaContents)
        .where(eq(mediaContents.id, id))
        .get();
    return result;
}

export async function create(props: CreateProps): Promise<MediaContent | undefined> {
    const result = await db.insert(mediaContents)
        .values(props)
        .returning()
        .get();
    return result;
}

export async function update(id: string, props: UpdateProps): Promise<MediaContent | undefined> {
    const result = await db.update(mediaContents)
        .set(props)
        .where(eq(mediaContents.id, id))
        .returning()
        .get();
    return result;
}

export async function remove(id: string): Promise<number> {
    const result = await db.delete(mediaContents)
        .where(eq(mediaContents.id, id));
    return result.rowsAffected;
}
