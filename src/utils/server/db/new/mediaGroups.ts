import PocketBase from "pocketbase";
import {
    createClientDB,
    newMediaDB,
} from "@/utils/server/db";
import { BaseRecord } from "@/types/db";

export type Record = BaseRecord & {
    media: string[];

    expand?: {
        media?: newMediaDB.Record[];
    };
};

export type Value = {
    media?: string[];
};

export type ValueUpdate = {
    media?: {
        set?: string[];
        append?: string[];
        remove?: string[];
    };
};

export const COLLECTION_NAME = "newMediaGroups";

export function format(record: Record) {
    if (!record.expand || !record.expand.media) return;

    for (const media of record.expand.media) {
        newMediaDB.format(media);
    }
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

interface UpdateProps {
    pb?: PocketBase;
    id: string;
    value: ValueUpdate;
}

export async function update(props: UpdateProps) {
    props.pb ||= await createClientDB();

    try {
        return await props.pb.collection(COLLECTION_NAME).update<Record>(props.id, {
            media: props.value.media?.set,
            "media+": props.value.media?.append,
            "media-": props.value.media?.remove,
        });
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
