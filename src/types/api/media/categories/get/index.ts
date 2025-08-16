import { Value } from "@/types/api/media/categories";

// POST

export type PostRequest = {
    category: string;
};

export type PostResponse = {
    success: boolean;
    value?: Value;
};
