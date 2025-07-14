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

// DB

interface ImagesBase {
    id: string;
    group: string;
    type: string;
}

export interface ImagesRecord extends RecordModel, ImagesBase {
    items: string;
    created: string;
    updated: string;
}

export interface ImagesValue extends ImagesBase {
    items: ImagesItem[];
    created: Date;
    updated: Date;
}

export function toImagesValue(record: ImagesRecord): ImagesValue {
    return {
        ...record,
        items: JSON.parse(record.items),
        created: new Date(record.created),
        updated: new Date(record.updated),
    };
}
