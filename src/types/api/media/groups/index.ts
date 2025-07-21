import { MediaRecord } from "@/types/db/media";

export interface Value {
    [variant: string]: MediaRecord | undefined;

    // add some optional default variants
}

// POST

export interface PostRequest {
    category: string;
    variants: string[];
    
    // TODO: add pagination
}

export interface PostResponse {
    success: boolean;
    values?: Value[];
}
