import { db } from "@server/db";
import { ALBUMS } from "@server/db/schema";
import { eq } from "drizzle-orm";
import * as contents from "./contents";
import * as types from "@type/albums/albums";
import {
    s3,
    buckets,
} from "@server/s3";
import { HeadObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { serverConfig } from "@server/config";

export type SelectProps =
    typeof ALBUMS.$inferSelect
    & {
        albumsContents?: contents.SelectProps[];
    };
export type Album = types.Album;
export type PartialAlbum = types.PartialAlbum;

type AutoAlbum<T extends SelectProps> =
    T extends { albumsContents: contents.SelectProps[]; }
    ? Album
    : PartialAlbum;

const albumsTable = ALBUMS;
const albumsQuery = db.query.ALBUMS;
const bucket = buckets.albums;
const contentsPath = (id: string) => `${id}/contents.zip`;

export function format<T extends SelectProps>(props: T): AutoAlbum<T> {
    return {
        id: props.id,
        title: props.title,
        description: props.description,
        cover: props.cover,
        downloadUrl: `${serverConfig.env.S3_URL}/${bucket}/${contentsPath(props.id)}`,
        shareUrl: `${serverConfig.env.URL}/albums/${props.id}`,
        deleteAt: props.deleteAt,
        locked: props.locked,
        albumsContents: props.albumsContents?.map((value) => contents.format(value)),
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
    } as AutoAlbum<T>;
}

export async function getAllPartial(): Promise<PartialAlbum[]> {
    const result = await albumsQuery.findMany({});
    return result.map(format);
}

export async function getAll(): Promise<Album[]> {
    const result = await albumsQuery.findMany({
        with: {
            albumsContents: {
                orderBy: (fields, operators) => operators.asc(fields.order),
                with: {
                    albumsMedia: {
                        with: {
                            albumsMediaVariants: {
                                orderBy: (fields, operators) => operators.asc(fields.order),
                            },
                        },
                    },
                    albumsDirectory: true,
                },
            },
        },
    });
    return result.map(format);
}

export async function getPartial(id: string): Promise<PartialAlbum | undefined> {
    const result = await albumsQuery.findFirst({
        where: (fields, operators) => operators.eq(fields.id, id),
    });
    return result ? format(result) : undefined;
}

export async function get(id: string): Promise<Album | undefined> {
    const result = await albumsQuery.findFirst({
        where: (fields, operators) => operators.eq(fields.id, id),
        with: {
            albumsContents: {
                orderBy: (fields, operators) => operators.asc(fields.order),
                with: {
                    albumsMedia: {
                        with: {
                            albumsMediaVariants: {
                                orderBy: (fields, operators) => operators.asc(fields.order),
                            },
                        },
                    },
                    albumsDirectory: true,
                },
            },
        },
    });
    return result ? format(result) : undefined;
}

async function exists(id: string): Promise<boolean> {
    try {
        const command = new HeadObjectCommand({
            Bucket: bucket,
            Key: contentsPath(id),
        });
        await s3.send(command);

        return true;
    } catch (error) { }
    return false;
}

async function upload(id: string, blob: Blob): Promise<boolean> {
    try {
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const command = new PutObjectCommand({
            Bucket: bucket,
            Key: contentsPath(id),
            Body: buffer,
            ContentType: blob.type,
        });
        await s3.send(command);

        return true;
    } catch (error) { }
    return false;
}

export async function create(props: types.CreateProps): Promise<PartialAlbum | undefined> {
    const result = await db.insert(albumsTable)
        .values({
            title: props.title,
            description: props.description,
            cover: props.cover,
        })
        .returning()
        .get();
    return result ? format(result) : undefined;
}

export async function update(id: string, props: types.UpdateProps): Promise<PartialAlbum | undefined> {
    const result = await db.update(albumsTable)
        .set({
            title: props.title,
            description: props.description,
            cover: props.cover,
        })
        .where(eq(albumsTable.id, id))
        .returning()
        .get();
    return format(result);
}

export async function remove(id: string): Promise<number> {
    const query = await getPartial(id);
    if (!query) return 0;

    await contents.removeByAlbumId(id);

    const result = await db.delete(albumsTable)
        .where(eq(albumsTable.id, id));
    return result.rowsAffected;
}
