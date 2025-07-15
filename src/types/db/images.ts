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
        large?: ImagesItemSize;
        medium?: ImagesItemSize;
        small?: ImagesItemSize;
    };
}

export interface ImagesRecord extends RecordModel {
    group: string;
    type: string;
    items: ImagesItem[]
    created: string; // Date
    updated: string; // Date
}
