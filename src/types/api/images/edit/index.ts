import { ImagesItem } from "@/types/db/images";

// POST

export interface PostRequest {
    group: string;
    newGroup?: string; // TODO if changing the group, images in s3 also need to be renamed
    newType?: string;
    newItems?: ImagesItem[]; // TODO rename to newOrder and have an array of strings
}

export interface PostResponse {
    success: boolean;
}
