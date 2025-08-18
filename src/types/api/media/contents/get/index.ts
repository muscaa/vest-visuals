import { Response } from "@/types/http";
import { FullMediaContent } from "@/types/api/media/contents";

// POST

export type PostRequest = {
    id: string;
};

export type PostResponse = Response<{
    value: FullMediaContent;
}>;
