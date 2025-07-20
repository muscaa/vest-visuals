import { RecordModel } from "pocketbase";

export type MediaVariantsRecord = RecordModel & {
    media: string[];
    created: string;
    updated: string;
};

export type MediaVariantsValue = {
    id?: string;
    media: string[];
};
