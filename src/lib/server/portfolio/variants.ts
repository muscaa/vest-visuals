import { db } from "@server/db";
import { MediaVariantsTable } from "@server/db/builder/media";
import {
    eq,
    and,
    inArray,
    asc,
} from "drizzle-orm";
import { s3 } from "@server/s3";
import {
    HeadObjectCommand,
    PutObjectCommand,
    DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { Blob } from "buffer";
import * as types from "@type/media/variants";

export interface Props {
    SELECT: types.SelectProps;
    CREATE: types.CreateProps;
    UPDATE: types.UpdateProps;
    getBucket: {};
    getPath: {
        contentId: string;
        tag: string;
    };
    getAll: {};
    getArray: {
        contentId: string;
    };
    get: {
        contentId: string;
        tag: string;
    };
    exists: {
        contentId: string;
        tag: string;
    };
    upload: {
        contentId: string;
        tag: string;
        blob: Blob;
    };
    remove: {
        contentId: string;
        tag: string;
    };
    removeArray: {
        contentId: string;
    };
    removeAll: {
        contentId: string;
        tags: string[];
    };
}

export abstract class MediaVariants<T extends MediaVariantsTable, P extends Props = Props, V extends types.MediaVariant = types.MediaVariant> {

    protected table: MediaVariantsTable;

    constructor(table: MediaVariantsTable) {
        this.table = table;
    }

    abstract format(props: P["SELECT"]): V;

    abstract insert(props: P["CREATE"]): Promise<P["SELECT"]>;

    abstract getBucket(props: P["getBucket"]): string;

    abstract getPath(props: P["getPath"]): string;

    async getAll(props: P["getAll"]): Promise<V[]> {
        const result = await db.select()
            .from(this.table)
            .orderBy(
                asc(this.table.contentId),
                asc(this.table.order),
            )
            .all();
        return result.map(this.format);
    }

    async getArray(props: P["getArray"]): Promise<V[]> {
        const result = await db.select()
            .from(this.table)
            .where(eq(this.table.contentId, props.contentId))
            .orderBy(asc(this.table.order))
            .all();
        return result.map(this.format);
    }

    async get(props: P["get"]): Promise<V | undefined> {
        const result = await db.select()
            .from(this.table)
            .where(
                and(
                    eq(this.table.contentId, props.contentId),
                    eq(this.table.tag, props.tag),
                )
            )
            .get();
        return result ? this.format(result) : undefined;
    }

    async exists(props: P["exists"]): Promise<boolean> {
        try {
            const command = new HeadObjectCommand({
                Bucket: this.getBucket({}),
                Key: this.getPath({
                    contentId: props.contentId,
                    tag: props.tag,
                }),
            });
            await s3.send(command);

            return true;
        } catch (error) { }
        return false;
    }

    async upload(props: P["upload"]): Promise<boolean> {
        try {
            const arrayBuffer = await props.blob.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const command = new PutObjectCommand({
                Bucket: this.getBucket({}),
                Key: this.getPath({
                    contentId: props.contentId,
                    tag: props.tag,
                }),
                Body: buffer,
                ContentType: props.blob.type,
            });
            await s3.send(command);

            return true;
        } catch (error) { }
        return false;
    }

    async create(props: P["CREATE"]): Promise<V | undefined> {
        const flag = await this.exists({
            contentId: props.contentId,
            tag: props.tag,
        });
        if (flag) return undefined;

        const uploaded = await this.upload({
            contentId: props.contentId,
            tag: props.tag,
            blob: props.blob,
        });
        if (!uploaded) return undefined;

        const result = await this.insert(props);
        return result ? this.format(result) : undefined;
    }

    async remove(props: P["remove"]): Promise<number> {
        try {
            const command = new DeleteObjectCommand({
                Bucket: this.getBucket({}),
                Key: this.getPath({
                    contentId: props.contentId,
                    tag: props.tag,
                }),
            });
            await s3.send(command);
        } catch (error) { }

        const result = await db.delete(this.table)
            .where(
                and(
                    eq(this.table.contentId, props.contentId),
                    eq(this.table.tag, props.tag),
                )
            );
        return result.rowsAffected;
    }

    async removeArray(props: P["removeArray"]): Promise<number> {
        const array = await this.getArray({
            contentId: props.contentId,
        });

        try {
            await Promise.all(array.map((value) => {
                const command = new DeleteObjectCommand({
                    Bucket: this.getBucket({}),
                    Key: this.getPath({
                        contentId: value.contentId,
                        tag: value.tag,
                    }),
                });
                return s3.send(command);
            }));
        } catch (error) { }

        const result = await db.delete(this.table)
            .where(eq(this.table.contentId, props.contentId));
        return result.rowsAffected;
    }

    async removeAll(props: P["removeAll"]): Promise<number> {
        try {
            await Promise.all(props.tags.map((tag) => {
                const command = new DeleteObjectCommand({
                    Bucket: this.getBucket({}),
                    Key: this.getPath({
                        contentId: props.contentId,
                        tag,
                    }),
                });
                return s3.send(command);
            }));
        } catch (error) { }

        const result = await db.delete(this.table)
            .where(
                and(
                    eq(this.table.contentId, props.contentId),
                    inArray(this.table.tag, props.tags),
                )
            );
        return result.rowsAffected;
    }
}
