import { MediaRecord } from "@/types/db/media";

// POST

export interface PostRequest {
    id: string;
}

export interface PostResponse {
    success: boolean;
    value?: MediaRecord;
}
