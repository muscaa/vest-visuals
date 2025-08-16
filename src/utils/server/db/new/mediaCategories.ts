import PocketBase from "pocketbase";
import {
    RecordOptions,
    RecordFullListOptions,
} from "pocketbase";
import {
    createClientDB,
    newMediaGroupsDB,
} from "@/utils/server/db";
import { BaseRecord } from "@/types/db";

export type Record = BaseRecord & {
    category: string;
    mediaGroups: string[];

    expand?: {
        mediaGroups?: newMediaGroupsDB.Record[];
    };
};

export type Value = {
    category: string;
    mediaGroups?: string[];
};

export type ValueUpdate = {
    category?: string;
    mediaGroups?: {
        set?: string[];
        append?: string[];
        remove?: string[];
    };
};

export const COLLECTION_NAME = "newMediaCategories";

export function format(record: Record) {
    if (!record.expand || !record.expand.mediaGroups) return;

    for (const mediaGroup of record.expand.mediaGroups) {
        newMediaGroupsDB.format(mediaGroup);
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
        return await props.pb.collection(COLLECTION_NAME).getOne<Record>(props.id, props.options);
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
        return await props.pb.collection(COLLECTION_NAME).getFullList<Record>(props.options);
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
            category: props.value.category,
            mediaGroups: props.value.mediaGroups?.set,
            "mediaGroups+": props.value.mediaGroups?.append,
            "mediaGroups-": props.value.mediaGroups?.remove,
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
