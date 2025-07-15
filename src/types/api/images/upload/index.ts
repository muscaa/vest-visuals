import {
    ImagesItemSize,
    ImagesSizeMap,
} from "@/types/db/images";

// POST

export interface FileData {
    alt?: string;
    sizes: ImagesSizeMap<Partial<ImagesItemSize> & {
        percent?: number;
        quality?: number;
    }>;
}

export interface PostRequest {
    group: string;
}

export interface PostResponse {
    success: boolean;
}
