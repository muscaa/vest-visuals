import { ImagesRecord } from "@/types/db/images";

// POST

export interface PostRequest {
    group?: string;
    type: string;
}

export interface PostResponse {
    success: boolean;
    value?: ImagesRecord;
}
