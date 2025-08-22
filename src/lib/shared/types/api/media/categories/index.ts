import { Response } from "@shared/types/http";
import { MediaGroup } from "../groups";

interface BaseMediaCategory<T extends "min" | "full"> {
    id: string;
    category: string;
    mediaGroups: T extends "min" ? string[] : MediaGroup[];
    created: string;
    updated: string;
}

export type MediaCategory = BaseMediaCategory<"min">;
export type FullMediaCategory = BaseMediaCategory<"full">;

// POST

export type PostRequest = {
};

export type PostResponse = Response<{
    values: MediaCategory[];
}>;
