import PocketBase from "pocketbase";
import {
    createClientDB,
    newMediaVariantsDB,
} from "@/utils/server/db";
import { BaseRecord } from "@/types/db";

export type Record = BaseRecord & {
    mediaVariants: string[];

    expand?: {
        mediaVariants?: newMediaVariantsDB.Record[];
    };
};

export type Value = {
    mediaVariants: newMediaVariantsDB.Value[];
};

export const COLLECTION_NAME = "newMediaContents";

export function format(record: Record) {
    if (!record.expand || !record.expand.mediaVariants) return;

    for (const mediaVariant of record.expand.mediaVariants) {
        newMediaVariantsDB.format(mediaVariant);
    }
}

interface CreateProps {
    pb?: PocketBase;
    value: Value;
}

export async function create(props: CreateProps) {
    props.pb ||= await createClientDB();

    try {
        const results = await Promise.all(props.value.mediaVariants.map((value) => newMediaVariantsDB.create({
            pb: props.pb,
            value,
        })));

        return await props.pb.collection(COLLECTION_NAME).create<Record>({
            mediaVariants: results.flatMap((mediaVariant) => mediaVariant ? [mediaVariant.id] : []),
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
        const listResult = await props.pb.collection(COLLECTION_NAME).getFullList<Record>({
            filter: `id IN ("${props.ids.join(`", "`)}")`,
        });

        return newMediaVariantsDB.remove({
            pb: props.pb,
            ids: listResult.flatMap((media) => media.mediaVariants || []),
        });
    } catch (error) {}

    return null;
}
