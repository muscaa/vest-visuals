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
        tag: props.tag,
        order: props.order,
        fileUrl: `${serverConfig.env.S3_URL}/${buckets.public}/${filePath(props.contentId, props.tag)}`,
        type: props.type,
        info: props.info ?? undefined,
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
    };
}

function filePath(contentId: string, tag: string) {
    return `media/${contentId}/${tag}`;
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

export async function get(contentId: string, tag: string): Promise<types.MediaVariant | undefined> {
    const result = await db.select()
        .from(mediaVariants)
        .where(
            and(
                eq(mediaVariants.contentId, contentId),
                eq(mediaVariants.tag, tag),
            )
        )
        .get();
    return result ? format(result) : undefined;
}

async function exists(contentId: string, tag: string): Promise<boolean> {
    try {
        const command = new HeadObjectCommand({
            Bucket: buckets.public,
            Key: filePath(contentId, tag),
        });
        await s3.send(command);

        return true;
    } catch (error) { }
    return false;
}

async function upload(contentId: string, tag: string, blob: Blob): Promise<boolean> {
    try {
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const command = new PutObjectCommand({
            Bucket: buckets.public,
            Key: filePath(contentId, tag),
            Body: buffer,
            ContentType: blob.type,
        });
        await s3.send(command);

        return true;
    } catch (error) { }
    return false;
}

export async function create(props: types.CreateProps): Promise<types.MediaVariant | undefined> {
    if (await exists(props.contentId, props.tag)) return undefined;

    const uploaded = await upload(props.contentId, props.tag, props.blob);
    if (!uploaded) return undefined;

    const result = await db.insert(mediaVariants)
        .values({
            contentId: props.contentId,
            tag: props.tag,
            order: props.order,
            type: props.type,
            info: props.info,
        })
        .returning()
        .get();
    return result ? format(result) : undefined;
}

export async function remove(contentId: string, tag: string): Promise<number> {
    try {
        const command = new DeleteObjectCommand({
            Bucket: buckets.public,
            Key: filePath(contentId, tag),
        });
        await s3.send(command);
    } catch (error) { }

    const result = await db.delete(mediaVariants)
        .where(
            and(
                eq(mediaVariants.contentId, contentId),
                eq(mediaVariants.tag, tag),
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
                Key: filePath(value.contentId, value.tag),
            });
            return s3.send(command);
        }));
    } catch (error) { }

    const result = await db.delete(mediaVariants)
        .where(eq(mediaVariants.contentId, contentId));
    return result.rowsAffected;
}

export async function removeAll(contentId: string, tags: string[]): Promise<number> {
    try {
        await Promise.all(tags.map((tag) => {
            const command = new DeleteObjectCommand({
                Bucket: buckets.public,
                Key: filePath(contentId, tag),
            });
            return s3.send(command);
        }));
    } catch (error) { }

    const result = await db.delete(mediaVariants)
        .where(
            and(
                eq(mediaVariants.contentId, contentId),
                inArray(mediaVariants.tag, tags),
            )
        );
    return result.rowsAffected;
}
