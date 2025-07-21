import { MediaVariantsRecord } from "@/types/db/mediaVariants";

// POST

export interface PostRequest {
    id?: string;
    media: string[];
}

export interface PostResponse {
    success: boolean;
    value?: MediaVariantsRecord;
}
