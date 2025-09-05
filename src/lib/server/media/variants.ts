import { db } from "@server/db";
import { mediaVariants } from "@server/db/schema";
import { eq } from "drizzle-orm";
import {
    s3,
    buckets,
} from "@server/s3";
import { serverConfig } from "@server/config";
import { MediaTypeInfo } from "@shared/types/media/info";
import {
    HeadObjectCommand,
    PutObjectCommand,
    DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { v4 } from "uuid";

export type SelectProps = typeof mediaVariants.$inferSelect;
export type MediaVariant =
    Omit<SelectProps, "fileName" | "type" | "info">
    & {
        fileUrl: string;
    }
    & MediaTypeInfo;
export type InsertProps = typeof mediaVariants.$inferInsert;
export type CreateProps =
    Omit<InsertProps, "id" | "createdAt" | "updatedAt" | "fileName" | "type" | "info">
    & {
        blob: Blob;
    }
    & MediaTypeInfo;
export type UpdateProps = Partial<CreateProps>;

export function format(props: SelectProps): MediaVariant {
    return {
        id: props.id,
        variant: props.variant,
        fileUrl: `${serverConfig.env.S3_URL}/${buckets.public}/${filePath(props.fileName)}`,
        type: props.type,
        info: props.info ?? undefined,
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
    };
}

function filePath(fileName: string) {
    return `${mediaVariants._.name}/${fileName}`;
}

export async function getAll(): Promise<MediaVariant[]> {
    const result = await db.select()
        .from(mediaVariants)
        .all();
    return result.map(format);
}

export async function get(id: string): Promise<MediaVariant | undefined> {
    const result = await db.select()
        .from(mediaVariants)
        .where(eq(mediaVariants.id, id))
        .get();
    return result ? format(result) : undefined;
}

async function newFileName(): Promise<string> {
    let fileName: string;
    let exists: boolean;

    do {
        fileName = v4();
        exists = false;

        try {
            const command = new HeadObjectCommand({
                Bucket: buckets.public,
                Key: filePath(fileName),
            });
            await s3.send(command);
            exists = true;
        } catch (error) { }
    } while (exists);

    return fileName;
}

async function upload(fileName: string, blob: Blob): Promise<boolean> {
    try {
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const command = new PutObjectCommand({
            Bucket: buckets.public,
            Key: filePath(fileName),
            Body: buffer,
            ContentType: blob.type,
        });
        await s3.send(command);

        return true;
    } catch (error) { }
    return false;
}

export async function create(props: CreateProps): Promise<MediaVariant | undefined> {
    const fileName = await newFileName();

    const uploaded = await upload(fileName, props.blob);
    if (!uploaded) return undefined;

    const result = await db.insert(mediaVariants)
        .values({
            variant: props.variant,
            fileName,
            type: props.type,
            info: props.info,
        })
        .returning()
        .get();
    return result ? format(result) : undefined;
}

export async function update(id: string, props: UpdateProps): Promise<MediaVariant | undefined> {
    if (props.blob) {
        const query = await db.select()
            .from(mediaVariants)
            .where(eq(mediaVariants.id, id))
            .get();
        if (!query) return undefined;

        const uploaded = await upload(query.fileName, props.blob);
        if (!uploaded) return undefined;
    }

    const result = await db.update(mediaVariants)
        .set({
            variant: props.variant,
            type: props.type,
            info: props.info,
        })
        .where(eq(mediaVariants.id, id))
        .returning()
        .get();
    return result ? format(result) : undefined;
}

export async function remove(id: string): Promise<number> {
    const query = await db.select()
        .from(mediaVariants)
        .where(eq(mediaVariants.id, id))
        .get();
    if (query) {
        try {
            const command = new DeleteObjectCommand({
                Bucket: buckets.public,
                Key: filePath(query.fileName),
            });
            await s3.send(command);
        } catch (error) { }
    }

    const result = await db.delete(mediaVariants)
        .where(eq(mediaVariants.id, id));
    return result.rowsAffected;
}
