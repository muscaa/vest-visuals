import { Response } from "@/types/http";
import { MediaCategory } from "@/types/api/media/categories";

// POST

export type PostRequest = {
    category: string;
    mediaGroups?: string[];
};

export type PostResponse = Response<{
    value: MediaCategory;
}>;
