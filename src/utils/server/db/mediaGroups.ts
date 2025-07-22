import PocketBase from "pocketbase";
import { RecordListOptions } from "pocketbase";
import { createClientDB } from "@/utils/server/db";
import * as types from "@/types/db/mediaGroups";

interface GetProps {
    pb?: PocketBase;
    id: string;
}

export async function get(props: GetProps) {
    props.pb ||= await createClientDB();

    try {
        return await props.pb.collection("mediaGroups").getOne<types.MediaGroupsRecord>(props.id);
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
        return await props.pb.collection("mediaGroups").getList<types.MediaGroupsRecord>(props.page, props.perPage, props.options);
    } catch (error) {}

    return null;
}

interface CreateProps {
    pb?: PocketBase;
    value: types.MediaGroupsValue;
}

export async function create(props: CreateProps) {
    props.pb ||= await createClientDB();

    try {
        return await props.pb.collection("mediaGroups").create<types.MediaGroupsRecord>(props.value);
    } catch (error) {}
    
    return null;
}

interface UpdateProps {
    pb?: PocketBase;
    id: string;
    value: Partial<types.MediaGroupsValue> & {
        "mediaVariants+"?: string[];
        "mediaVariants-"?: string[];
    };
}

export async function update(props: UpdateProps) {
    props.pb ||= await createClientDB();

    try {
        return await props.pb.collection("mediaGroups").update<types.MediaGroupsRecord>(props.id, props.value);
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
        return await props.pb.collection("mediaGroups").delete(props.id);
    } catch (error) {}
    
    return null;
}
