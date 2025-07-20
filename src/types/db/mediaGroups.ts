import { RecordModel } from "pocketbase";

export type MediaGroupsRecord = RecordModel & {
    category?: string;
    mediaVariants?: string[];
    created: string;
    updated: string;
};

export type MediaGroupsValue = {
    id?: string;
    category?: string;
    mediaVariants?: string[];
};
