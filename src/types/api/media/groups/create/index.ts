import { Value } from "@/types/api/media/groups";

// POST

export type PostRequest = {
    media?: string[];
};

export type PostResponse = {
    success: boolean;
    value?: Value;
};
