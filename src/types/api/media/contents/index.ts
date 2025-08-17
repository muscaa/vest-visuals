import { MediaTypeInfo } from "@/types/media/info";

export type MediaVariant = MediaTypeInfo & {
    id: string;
    variant: string;
    file: string;
    created: string;
    updated: string;
};

export type MediaContent = {
    id: string;
    mediaVariants: MediaVariant[];
    created: string;
    updated: string;
};

// POST

export type PostRequest = {
};

export type PostResponse = {
    success: boolean;
    values?: MediaContent[];
};
