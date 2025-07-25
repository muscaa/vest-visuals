import PocketBase from "pocketbase";
import { RecordListOptions } from "pocketbase";
import { createClientDB } from "@/utils/server/db";
import * as types from "@/types/db/media";

interface GetProps {
    pb?: PocketBase;
    id: string;
}

export async function get(props: GetProps) {
    props.pb ||= await createClientDB();

    try {
        return await props.pb.collection("media").getOne<types.MediaRecord>(props.id);
    } catch (error) {}
    
    return null;
}

interface GetListProps {
    pb?: PocketBase;
    page?: number;
    perPage?: number;
    options?: RecordListOptions;
}

export async function getList(props: GetListProps = {}) {
    props.pb ||= await createClientDB();

    try {
        return await props.pb.collection("media").getList<types.MediaRecord>(props.page, props.perPage, props.options);
    } catch (error) {}

    return null;
}

interface CreateProps {
    pb?: PocketBase;
    value: types.MediaValue;
}

export async function create(props: CreateProps) {
    props.pb ||= await createClientDB();

    try {
        return await props.pb.collection("media").create<types.MediaRecord>(props.value);
    } catch (error) {}
    
    return null;
}

interface UpdateProps {
    pb?: PocketBase;
    id: string;
    value: Partial<types.MediaValue>;
}

export async function update(props: UpdateProps) {
    props.pb ||= await createClientDB();

    try {
        return await props.pb.collection("media").update<types.MediaRecord>(props.id, props.value);
    } catch (error) {}
    
    return null;
}

interface RemoveProps {
    pb?: PocketBase;
    id: string;
}

export async function remove(props: RemoveProps) {
    props.pb ||= await createClientDB();

    try {
        return await props.pb.collection("media").delete(props.id);
    } catch (error) {}
    
    return null;
}

interface RemoveAllProps {
    pb?: PocketBase;
    ids: string[];
}

export async function removeAll(props: RemoveAllProps) {
    props.pb ||= await createClientDB();

    try {
        const batch = props.pb.createBatch();

        for (const id of props.ids) {
            batch.collection("media").delete(id);
        }

        return await batch.send();
    } catch (error) {}
    
    return null;
}
