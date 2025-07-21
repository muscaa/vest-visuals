import { MediaGroupsRecord } from "@/types/db/mediaGroups";

// POST

export interface PostRequest {
    id: string;
}

export interface PostResponse {
    success: boolean;
    value?: MediaGroupsRecord;
}
