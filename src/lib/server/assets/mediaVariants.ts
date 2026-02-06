import { db } from "@server/db";
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
import { ASSETS_MEDIA_VARIANTS } from "@server/db/schema";
import * as types from "@type/assets/mediaVariants";

export type SelectProps = typeof ASSETS_MEDIA_VARIANTS.$inferSelect;
export type MediaVariant = types.AssetsMediaVariant;

const bucket = buckets.assets;
const mediaVariantsTable = ASSETS_MEDIA_VARIANTS;

function filePath(mediaId: string, tag: string) {
    return `${mediaId}/${tag}`;
}

export function format(props: SelectProps): MediaVariant {
    return {
        mediaId: props.mediaId,
        tag: props.tag,
        order: props.order,
        fileUrl: `${serverConfig.env.S3_URL}/${bucket}/${filePath(props.mediaId, props.tag)}`,
        type: props.type,
        info: props.info ?? undefined,
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
    };
}

export async function getAll(): Promise<MediaVariant[]> {
    const result = await db.select()
        .from(mediaVariantsTable)
        .orderBy(
            asc(mediaVariantsTable.mediaId),
            asc(mediaVariantsTable.order),
        )
        .all();
    return result.map(format);
}

export async function getList(mediaId: string): Promise<MediaVariant[]> {
    const result = await db.select()
        .from(mediaVariantsTable)
        .where(eq(mediaVariantsTable.mediaId, mediaId))
        .orderBy(asc(mediaVariantsTable.order))
        .all();
    return result.map(format);
}

export async function get(mediaId: string, tag: string): Promise<MediaVariant | undefined> {
    const result = await db.select()
        .from(mediaVariantsTable)
        .where(
            and(
                eq(mediaVariantsTable.mediaId, mediaId),
                eq(mediaVariantsTable.tag, tag),
            )
        )
        .get();
    return result ? format(result) : undefined;
}

async function exists(mediaId: string, tag: string): Promise<boolean> {
    try {
        const command = new HeadObjectCommand({
            Bucket: bucket,
            Key: filePath(mediaId, tag),
        });
        await s3.send(command);

        return true;
    } catch (error) { }
    return false;
}

async function upload(mediaId: string, tag: string, blob: Blob): Promise<boolean> {
    try {
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const command = new PutObjectCommand({
            Bucket: bucket,
            Key: filePath(mediaId, tag),
            Body: buffer,
            ContentType: blob.type,
        });
        await s3.send(command);

        return true;
    } catch (error) { }
    return false;
}

export async function create(props: types.CreateProps): Promise<MediaVariant | undefined> {
    if (await exists(props.mediaId, props.tag)) return undefined;

    const uploaded = await upload(props.mediaId, props.tag, props.blob);
    if (!uploaded) return undefined;

    const result = await db.insert(mediaVariantsTable)
        .values({
            mediaId: props.mediaId,
            tag: props.tag,
            order: props.order,
            type: props.type,
            info: props.info,
        })
        .returning()
        .get();
    return result ? format(result) : undefined;
}

export async function remove(mediaId: string, tag: string): Promise<number> {
    try {
        const command = new DeleteObjectCommand({
            Bucket: bucket,
            Key: filePath(mediaId, tag),
        });
        await s3.send(command);
    } catch (error) { }

    const result = await db.delete(mediaVariantsTable)
        .where(
            and(
                eq(mediaVariantsTable.mediaId, mediaId),
                eq(mediaVariantsTable.tag, tag),
            )
        );
    return result.rowsAffected;
}

export async function removeList(mediaId: string, tags?: string[]): Promise<number> {
    if (tags) {
        try {
            await Promise.all(tags.map((tag) => {
                const command = new DeleteObjectCommand({
                    Bucket: bucket,
                    Key: filePath(mediaId, tag),
                });
                return s3.send(command);
            }));
        } catch (error) { }

        const result = await db.delete(mediaVariantsTable)
            .where(
                and(
                    eq(mediaVariantsTable.mediaId, mediaId),
                    inArray(mediaVariantsTable.tag, tags),
                )
            );
        return result.rowsAffected;
    }

    const list = await getList(mediaId);

    try {
        await Promise.all(list.map((value) => {
            const command = new DeleteObjectCommand({
                Bucket: bucket,
                Key: filePath(value.mediaId, value.tag),
            });
            return s3.send(command);
        }));
    } catch (error) { }

    const result = await db.delete(mediaVariantsTable)
        .where(eq(mediaVariantsTable.mediaId, mediaId));
    return result.rowsAffected;
}
