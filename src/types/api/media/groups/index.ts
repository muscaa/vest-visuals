export interface MediaGroup {
    id: string;
    media: string[];
    created: string;
    updated: string;
}

// POST

export type PostRequest = {
};

export type PostResponse = {
    success: boolean;
    values?: MediaGroup[];
};
