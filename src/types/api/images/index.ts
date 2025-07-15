import {
    ImagesRecord,
} from "@/types/db/images";

// POST

export interface PostRequest {
    filter?: string;
    sort?: string;
    
    // TODO: add pagination
}

export interface PostResponse {
    success: boolean;
    value?: ImagesRecord[];
}
