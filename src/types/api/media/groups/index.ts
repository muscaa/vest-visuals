import { MediaGroupsRecord } from "@/types/db/mediaGroups";

// POST

export interface PostRequest {
    filter?: string;
    sort?: string;
    
    // TODO: add pagination
}

export interface PostResponse {
    success: boolean;
    values?: MediaGroupsRecord[];
}
