import { db } from "@server/db";
import { mediaVariants } from "@server/db/schema/mediaVariants";
import { eq } from "drizzle-orm";

export type MediaVariant = typeof mediaVariants.$inferSelect;
type InsertProps = typeof mediaVariants.$inferInsert;
type CreateProps = InsertProps;
type UpdateProps = InsertProps;

export async function create(props: CreateProps): Promise<MediaVariant | undefined> {
    const result = await db.insert(mediaVariants)
        .values(props)
        .returning()
        .get();
    return result;
}

export async function getAll(): Promise<MediaVariant[]> {
    const result = await db.select()
        .from(mediaVariants)
        .all();
    return result;
}

export async function get(id: string): Promise<MediaVariant | undefined> {
    const result = await db.select()
        .from(mediaVariants)
        .where(eq(mediaVariants.id, id))
        .get();
    return result;
}

export async function update(id: string, props: UpdateProps): Promise<MediaVariant | undefined> {
    const result = await db.update(mediaVariants)
        .set(props)
        .where(eq(mediaVariants.id, id))
        .returning()
        .get();
    return result;
}

export async function remove(id: string): Promise<number> {
    const result = await db.delete(mediaVariants)
        .where(eq(mediaVariants.id, id));
    return result.rowsAffected;
}
