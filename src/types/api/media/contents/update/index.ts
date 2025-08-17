// POST

export type PostRequest = {
    id: string;
    mediaVariants?: {
        set?: string[];
        append?: string[];
        remove?: string[];
    };
};

export type PostResponse = {
    success: boolean;
};
