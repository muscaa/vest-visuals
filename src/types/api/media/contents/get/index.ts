import { FullMediaContent } from "@/types/api/media/contents";

// POST

export type PostRequest = {
    id: string;
};

export type PostResponse = {
    success: boolean;
    value?: FullMediaContent;
};
