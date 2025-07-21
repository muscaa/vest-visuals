import { RecordModel } from "pocketbase";
import { MediaVariantsRecord } from "@/types/db/mediaVariants";

export type MediaGroupsRecord = RecordModel & {
    category?: string;
    mediaVariants?: string[];
    created: string;
    updated: string;
    
    expand?: {
        mediaVariants?: MediaVariantsRecord[];
    };
};

export type MediaGroupsValue = {
    id?: string;
    category?: string;
    mediaVariants?: string[];
};
