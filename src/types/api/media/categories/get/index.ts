import { Value } from "@/types/api/media/categories";

// POST

export type PostRequest = {
    id: string;
};

export type PostResponse = {
    success: boolean;
    value?: Value;
};
