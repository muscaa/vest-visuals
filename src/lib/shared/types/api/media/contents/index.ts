import { Response } from "@shared/types/http";
import { MediaTypeInfo } from "@shared/types/media/info";

export type MediaVariant = MediaTypeInfo & {
    id: string;
    variant: string;
    file: string;
    created: string;
    updated: string;
};

interface BaseMediaContent<T extends "min" | "full"> {
    id: string;
    mediaVariants: T extends "min" ? string[] : MediaVariant[];
    created: string;
    updated: string;
}

export type MediaContent = BaseMediaContent<"min">;
export type FullMediaContent = BaseMediaContent<"full">;

// POST

export type PostRequest = {
};

export type PostResponse = Response<{
    values: FullMediaContent[];
}>;
