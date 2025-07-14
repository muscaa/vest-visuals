import PocketBase from "pocketbase";
import { RecordListOptions } from "pocketbase";
import { createClient } from "@/utils/server/db";
import {
    ImagesRecord,
    ImagesValue,
    toImagesValue,
} from "@/types/db/images";

interface CreateProps {
    pb?: PocketBase;
    value?: ImagesValue;
}

export async function create(props: CreateProps = {}) {
    props.pb ||= await createClient();

    try {
        const record = await props.pb.collection("images").create<ImagesRecord>(props.value);

        return toImagesValue(record);
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
        const records = await props.pb.collection("images").getList<ImagesRecord>(props.page, props.perPage, props.options);

        return {
            ...records,
            items: records.items.map(toImagesValue),
        };
    } catch (error) {
        return null;
    }
}
