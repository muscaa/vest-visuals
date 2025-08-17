import { FullMediaContent } from "../contents";

interface BaseMediaGroup<T extends "min" | "full"> {
    id: string;
    mediaContents: T extends "min" ? string[] : FullMediaContent[];
    created: string;
    updated: string;
}

export type MediaGroup = BaseMediaGroup<"min">;
export type FullMediaGroup = BaseMediaGroup<"full">;

// POST

export type PostRequest = {
};

export type PostResponse = {
    success: boolean;
    values?: MediaGroup[];
};
