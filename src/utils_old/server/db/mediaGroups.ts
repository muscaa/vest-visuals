import PocketBase from "pocketbase";
import {
    RecordOptions,
    RecordFullListOptions,
} from "pocketbase";
import {
    createClientDB,
    mediaContentsDB,
} from "@/utils/server/db";
import { BaseRecord } from "./base";

export type Record = BaseRecord & {
    mediaContents: string[];

    expand?: {
        mediaContents?: mediaContentsDB.Record[];
    };
};

export type Value = {
    mediaContents?: string[];
};

export type ValueUpdate = {
    mediaContents?: {
        set?: string[];
        append?: string[];
        remove?: string[];
    };
};

export const COLLECTION_NAME = "mediaGroups";

export function format(record: Record) {
    if (!record.expand || !record.expand.mediaContents) return;

    for (const mediaContent of record.expand.mediaContents) {
        mediaContentsDB.format(mediaContent);
    }
}

interface GetProps {
    pb?: PocketBase;
    id: string;
    options?: RecordOptions;
}

export async function get(props: GetProps) {
    props.pb ||= await createClientDB();

    try {
        const result = await props.pb.collection(COLLECTION_NAME).getOne<Record>(props.id, props.options);
        format(result);
        return result;
    } catch (error) {}

    return null;
}

interface GetListProps {
    pb?: PocketBase;
    options?: RecordFullListOptions;
}

export async function getList(props: GetListProps) {
    props.pb ||= await createClientDB();

    try {
        const result = await props.pb.collection(COLLECTION_NAME).getFullList<Record>(props.options);
        result.forEach(format);
        return result;
    } catch (error) {}

    return null;
}

interface CreateProps {
    pb?: PocketBase;
    value: Value;
}

export async function create(props: CreateProps) {
    props.pb ||= await createClientDB();

    try {
        const result = await props.pb.collection(COLLECTION_NAME).create<Record>(props.value);
        format(result);
        return result;
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
        const result = await props.pb.collection(COLLECTION_NAME).update<Record>(props.id, {
            mediaContents: props.value.mediaContents?.set,
            "mediaContents+": props.value.mediaContents?.append,
            "mediaContents-": props.value.mediaContents?.remove,
        });
        format(result);
        return result;
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
