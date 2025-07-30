// POST

export interface PostRequest {
    id: string;
    category?: string;
    mediaGroups?: {
        set?: string[];
        append?: string[];
        remove?: string[];
    };
}

export interface PostResponse {
    success: boolean;
}
