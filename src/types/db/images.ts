import { RecordModel } from "pocketbase";

export interface ImagesItemSize {
    w: number;
    h: number;
}

export interface ImagesSizeMap<T> {
    [key: string]: T | undefined;

    original?: T;
    large?: T;
    medium?: T;
    small?: T;
}

export interface ImagesItem {
    src: string;
    alt: string;
    sizes: ImagesSizeMap<ImagesItemSize>;
}

export interface ImagesRecord extends RecordModel {
    group: string;
    type: string;
    items: ImagesItem[]
    created: string; // Date
    updated: string; // Date
}
