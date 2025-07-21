// POST

export interface PostRequest {
    id: string;
    media: {
        replace?: string[];
        append?: string[];
        remove?: string[];
    };
}

export interface PostResponse {
    success: boolean;
}
