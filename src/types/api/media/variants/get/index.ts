import { MediaVariantsRecord } from "@/types/db/mediaVariants";

// POST

export interface PostRequest {
    id: string;
}

export interface PostResponse {
    success: boolean;
    value?: MediaVariantsRecord;
}
