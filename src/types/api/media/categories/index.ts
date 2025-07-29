export interface Value {
    id: string;
    category: string;
    created: string;
    updated: string;
}

// POST

export type PostRequest = {
};

export type PostResponse = {
    success: boolean;
    values?: Value[];
};
