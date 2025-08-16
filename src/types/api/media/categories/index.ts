export interface MediaCategory {
    id: string;
    category: string;
    mediaGroups: string[];
    created: string;
    updated: string;
}

// POST

export type PostRequest = {
};

export type PostResponse = {
    success: boolean;
    values?: MediaCategory[];
};
