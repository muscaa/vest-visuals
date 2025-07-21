import { MediaGroupsRecord } from "@/types/db/mediaGroups";

// POST

export interface PostRequest {
    id?: string;
    category?: string;
    mediaVariants?: string[];
}

export interface PostResponse {
    success: boolean;
    value?: MediaGroupsRecord;
}
