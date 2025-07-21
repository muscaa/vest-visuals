import { RecordModel } from "pocketbase";
import { MediaRecord } from "@/types/db/media";

export type MediaVariantsRecord = RecordModel & {
    media: string[];
    created: string;
    updated: string;

    expand?: {
        media?: MediaRecord[];
    };
};

export type MediaVariantsValue = {
    id?: string;
    media: string[];
};
