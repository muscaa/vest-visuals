// POST

export type PostRequest = {
    id: string;
    media?: {
        set?: string[];
        append?: string[];
        remove?: string[];
    };
};

export type PostResponse = {
    success: boolean;
};
