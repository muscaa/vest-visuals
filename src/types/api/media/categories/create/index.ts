import { Value } from "@/types/api/media/categories";

// POST

export interface PostRequest {
    category: string;
    mediaGroups?: string[];
}

export interface PostResponse {
    success: boolean;
    value?: Value;
}
