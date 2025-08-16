// POST

export interface PostRequest {
    id: string;
    category?: string;
    mediaVariants?: {
        replace?: string[];
        append?: string[];
        remove?: string[];
    };
}

export interface PostResponse {
    success: boolean;
}
