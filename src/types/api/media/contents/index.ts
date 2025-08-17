interface BaseMediaContent<T extends "min" | "full"> {
    id: string;
    mediaVariants: T extends "min" ? string[] : never[];
    created: string;
    updated: string;
}

export type MediaContent = BaseMediaContent<"min">;
export type FullMediaContent = BaseMediaContent<"full">;

// POST

export type PostRequest = {
};

export type PostResponse = {
    success: boolean;
    values?: MediaContent[];
};
