import PocketBase from "pocketbase";
import { createClientDB } from "@/utils/server/db";
import { server_config } from "@/utils/server/config";
import { BaseRecord } from "@/types/db";
import {
    ImageMediaInfo,
    VideoMediaInfo,
} from "@/types/media/info";

export type Record = BaseRecord & {
    variant: string;
    file: string;
} & ({
    type: "image";
    info?: ImageMediaInfo;
} | {
    type: "video";
    info?: VideoMediaInfo;
});

export type Value = {
    variant: string;
    file: string;
} & ({
    type: "image";
    info?: ImageMediaInfo;
} | {
    type: "video";
    info?: VideoMediaInfo;
});

const COLLECTION_NAME = "newMediaVariants";

export function format(record: Record) {
    record.file = `${server_config.env.S3_URL}/public/${record.collectionId}/${record.id}/${record.file}`;
}

interface CreateProps {
    pb?: PocketBase;
    value: Value;
}

export async function create(props: CreateProps) {
    props.pb ||= await createClientDB();

    try {
        return await props.pb.collection(COLLECTION_NAME).create<Record>(props.value);
    } catch (error) {}
    
    return null;
}

interface RemoveProps {
    pb?: PocketBase;
    ids: string[];
}

export async function remove(props: RemoveProps) {
    props.pb ||= await createClientDB();

    try {
        const batch = props.pb.createBatch();
        for (const id of props.ids) {
            batch.collection(COLLECTION_NAME).delete(id);
        }

        const result = await batch.send();
        return result != null;
    } catch (error) {}
    
    return null;
}
