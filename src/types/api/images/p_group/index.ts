import {
    ImagesRecord,
    ImagesItem,
    ImagesItemSize,
    ImagesSizeMap,
} from "@/types/db/images";

interface Props {
    params: Promise<{
        group: string;
    }>;
}

// GET

export type GetProps = Props;

export interface GetResponse {
    success: boolean;
    value?: ImagesRecord;
}

// POST

export type PostProps = Props;

export interface PostRequest {
    group?: string;
    type?: string;
    items?: ImagesItem[];
}

export interface PostResponse {
    success: boolean;
}

// PUT

export type PutProps = Props;

export interface PutRequest {
    alt?: string;
    sizes: ImagesSizeMap<Partial<ImagesItemSize> & {
        percent?: number;
        quality?: number;
    }>;
}

export interface PutResponse {
    success: boolean;
}
