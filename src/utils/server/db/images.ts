import PocketBase from "pocketbase";
import { RecordListOptions } from "pocketbase";
import { createClient } from "@/utils/server/db";
import { ImagesRecord } from "@/types/db/images";

interface CreateProps {
    pb?: PocketBase;
    value?: Partial<ImagesRecord>;
}

export async function create(props: CreateProps = {}) {
    props.pb ||= await createClient();

    try {
        return await props.pb.collection("images").create<ImagesRecord>(props.value);
    } catch (error) {
        return null;
    }
}

interface GetProps {
    pb?: PocketBase;
    page?: number;
    perPage?: number;
    options?: RecordListOptions;
}

export async function get(props: GetProps = {}) {
    props.pb ||= await createClient();

    try {
        return await props.pb.collection("images").getList<ImagesRecord>(props.page, props.perPage, props.options);
    } catch (error) {
        return null;
    }
}

interface UpdateProps {
    pb?: PocketBase;
    id: string;
    value: Partial<ImagesRecord>;
}

export async function update(props: UpdateProps) {
    props.pb ||= await createClient();

    try {
        return await props.pb.collection("images").update<ImagesRecord>(props.id, props.value);
    } catch (error) {
        return null;
    }
}
