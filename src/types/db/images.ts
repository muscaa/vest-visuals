import { RecordModel } from "pocketbase";

export interface ImagesItemSize {
    w: number;
    h: number;
}

export interface ImagesItem {
    src: string;
    alt: string;
    sizes: {
        [key: string]: ImagesItemSize | undefined;

        original?: ImagesItemSize;
        medium?: ImagesItemSize;
        preview?: ImagesItemSize;
    };
}

export interface ImagesRecord extends RecordModel {
    group: string;
    type: string;
    items: string; // ImagesItem[]
    created: string; // Date
    updated: string; // Date
}
