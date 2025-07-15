import { ImagesRecord } from "@/types/db/images";

// POST

export interface PostRequest {
    group: string;
}

export interface PostResponse {
    success: boolean;
    value?: ImagesRecord;
}
