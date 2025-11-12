import { db } from "@server/db";
import { albumVariants } from "@server/db/schema";
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
import * as types from "@type/albums/variants";

export type SelectProps = typeof albumVariants.$inferSelect;

export function format(props: SelectProps): types.AlbumVariant {
    return {
        contentId: props.contentId,
        variant: props.variant,
        order: props.order,
        fileUrl: `${serverConfig.env.S3_URL}/${buckets.albums}/${filePath(props.contentId, props.variant)}`,
        type: props.type,
        info: props.info ?? undefined,
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
    };
}

function filePath(contentId: string, variant: string) {
    return `album/${contentId}/${variant}`;
}

export async function getAll(): Promise<types.AlbumVariant[]> {
    const result = await db.select()
        .from(albumVariants)
        .orderBy(
            asc(albumVariants.contentId),
            asc(albumVariants.order),
        )
        .all();
    return result.map(format);
}

export async function getContent(contentId: string): Promise<types.AlbumVariant[]> {
    const result = await db.select()
        .from(albumVariants)
        .where(eq(albumVariants.contentId, contentId))
        .orderBy(asc(albumVariants.order))
        .all();
    return result.map(format);
}

export async function get(contentId: string, variant: string): Promise<types.AlbumVariant | undefined> {
    const result = await db.select()
        .from(albumVariants)
        .where(
            and(
                eq(albumVariants.contentId, contentId),
                eq(albumVariants.variant, variant),
            )
        )
        .get();
    return result ? format(result) : undefined;
}

async function exists(contentId: string, variant: string): Promise<boolean> {
    try {
        const command = new HeadObjectCommand({
            Bucket: buckets.albums,
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
            Bucket: buckets.albums,
            Key: filePath(contentId, variant),
            Body: buffer,
            ContentType: blob.type,
        });
        await s3.send(command);

        return true;
    } catch (error) { }
    return false;
}

export async function create(props: types.CreateProps): Promise<types.AlbumVariant | undefined> {
    if (await exists(props.contentId, props.variant)) return undefined;

    const uploaded = await upload(props.contentId, props.variant, props.blob);
    if (!uploaded) return undefined;

    const result = await db.insert(albumVariants)
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

export async function remove(contentId: string, variant: string): Promise<number> {
    try {
        const command = new DeleteObjectCommand({
            Bucket: buckets.albums,
            Key: filePath(contentId, variant),
        });
        await s3.send(command);
    } catch (error) { }

    const result = await db.delete(albumVariants)
        .where(
            and(
                eq(albumVariants.contentId, contentId),
                eq(albumVariants.variant, variant),
            )
        );
    return result.rowsAffected;
}

export async function removeContent(contentId: string): Promise<number> {
    const byContent = await getContent(contentId);

    try {
        await Promise.all(byContent.map((value) => {
            const command = new DeleteObjectCommand({
                Bucket: buckets.albums,
                Key: filePath(value.contentId, value.variant),
            });
            return s3.send(command);
        }));
    } catch (error) { }

    const result = await db.delete(albumVariants)
        .where(eq(albumVariants.contentId, contentId));
    return result.rowsAffected;
}

export async function removeAll(contentId: string, variants: string[]): Promise<number> {
    try {
        await Promise.all(variants.map((variant) => {
            const command = new DeleteObjectCommand({
                Bucket: buckets.albums,
                Key: filePath(contentId, variant),
            });
            return s3.send(command);
        }));
    } catch (error) { }

    const result = await db.delete(albumVariants)
        .where(
            and(
                eq(albumVariants.contentId, contentId),
                inArray(albumVariants.variant, variants),
            )
        );
    return result.rowsAffected;
}
