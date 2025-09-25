import { db } from "@server/db";
import { mediaVariants } from "@server/db/schema";
import {
    eq,
    and,
    inArray,
    asc,
} from "drizzle-orm";
import {
    s3,
    buckets,
} from "@server/s3";
import { serverConfig } from "@server/config";
import {
    HeadObjectCommand,
    PutObjectCommand,
    DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { Blob } from "buffer";
import * as types from "@type/media/variants";

export type SelectProps = typeof mediaVariants.$inferSelect;

export function format(props: SelectProps): types.MediaVariant {
    return {
        contentId: props.contentId,
        variant: props.variant,
        order: props.order,
        fileUrl: `${serverConfig.env.S3_URL}/${buckets.public}/${filePath(props.contentId, props.variant)}`,
        type: props.type,
        info: props.info ?? undefined,
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
    };
}

function filePath(contentId: string, variant: string) {
    return `media/${contentId}/${variant}`;
}

export async function getAll(): Promise<types.MediaVariant[]> {
    const result = await db.select()
        .from(mediaVariants)
        .orderBy(
            asc(mediaVariants.contentId),
            asc(mediaVariants.order),
        )
        .all();
    return result.map(format);
}

export async function getContent(contentId: string): Promise<types.MediaVariant[]> {
    const result = await db.select()
        .from(mediaVariants)
        .where(eq(mediaVariants.contentId, contentId))
        .orderBy(asc(mediaVariants.order))
        .all();
    return result.map(format);
}

export async function get(contentId: string, variant: string): Promise<types.MediaVariant | undefined> {
    const result = await db.select()
        .from(mediaVariants)
        .where(
            and(
                eq(mediaVariants.contentId, contentId),
                eq(mediaVariants.variant, variant),
            )
        )
        .get();
    return result ? format(result) : undefined;
}

async function exists(contentId: string, variant: string): Promise<boolean> {
    try {
        const command = new HeadObjectCommand({
            Bucket: buckets.public,
            Key: filePath(contentId, variant),
        });
        await s3.send(command);

        return true;
    } catch (error) { }
    return false;
}

async function upload(contentId: string, variant: string, blob: Blob): Promise<boolean> {
    try {
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const command = new PutObjectCommand({
            Bucket: buckets.public,
            Key: filePath(contentId, variant),
            Body: buffer,
            ContentType: blob.type,
        });
        await s3.send(command);

        return true;
    } catch (error) { }
    return false;
}

export async function create(props: types.CreateProps): Promise<types.MediaVariant | undefined> {
    if (await exists(props.contentId, props.variant)) return undefined;

    const uploaded = await upload(props.contentId, props.variant, props.blob);
    if (!uploaded) return undefined;

    const result = await db.insert(mediaVariants)
        .values({
            contentId: props.contentId,
            variant: props.variant,
            order: props.order,
            type: props.type,
            info: props.info,
        })
        .returning()
        .get();
    return result ? format(result) : undefined;
}

// TODO when changing contentId or variant, need to move s3 object to new path
// export async function update(contentId: string, variant: string, props: types.UpdateProps): Promise<types.MediaVariant | undefined> {
//     if (props.blob) {
//         const query = await db.select()
//             .from(mediaVariants)
//             .where(
//                 and(
//                     eq(mediaVariants.contentId, contentId),
//                     eq(mediaVariants.variant, variant),
//                 )
//             )
//             .get();
//         if (!query) return undefined;

//         const uploaded = await upload(query.id, props.blob);
//         if (!uploaded) return undefined;
//     }

//     const result = await db.update(mediaVariants)
//         .set({
//             variant: props.variant,
//             type: props.type,
//             info: props.info,
//         })
//         .where(eq(mediaVariants.id, id))
//         .returning()
//         .get();
//     return result ? format(result) : undefined;
// }

export async function remove(contentId: string, variant: string): Promise<number> {
    try {
        const command = new DeleteObjectCommand({
            Bucket: buckets.public,
            Key: filePath(contentId, variant),
        });
        await s3.send(command);
    } catch (error) { }

    const result = await db.delete(mediaVariants)
        .where(
            and(
                eq(mediaVariants.contentId, contentId),
                eq(mediaVariants.variant, variant),
            )
        );
    return result.rowsAffected;
}

export async function removeContent(contentId: string): Promise<number> {
    const byContent = await getContent(contentId);

    try {
        await Promise.all(byContent.map((value) => {
            const command = new DeleteObjectCommand({
                Bucket: buckets.public,
                Key: filePath(value.contentId, value.variant),
            });
            return s3.send(command);
        }));
    } catch (error) { }

    const result = await db.delete(mediaVariants)
        .where(eq(mediaVariants.contentId, contentId));
    return result.rowsAffected;
}

export async function removeAll(contentId: string, variants: string[]): Promise<number> {
    try {
        await Promise.all(variants.map((variant) => {
            const command = new DeleteObjectCommand({
                Bucket: buckets.public,
                Key: filePath(contentId, variant),
            });
            return s3.send(command);
        }));
    } catch (error) { }

    const result = await db.delete(mediaVariants)
        .where(
            and(
                eq(mediaVariants.contentId, contentId),
                inArray(mediaVariants.variant, variants),
            )
        );
    return result.rowsAffected;
}
