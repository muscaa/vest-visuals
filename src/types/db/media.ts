import { RecordModel } from "pocketbase";

interface MediaInfo {
    [key: string]: any;
}

export interface ImageMediaInfo extends MediaInfo {
    width?: number;
    height?: number;
}

export interface VideoMediaInfo extends MediaInfo {
    duration?: number;
}

export type MediaRecord = RecordModel & {
    variant?: string;
    file: string;
    created: string;
    updated: string;
} & ({
    type: "image";
    info?: ImageMediaInfo;
} | {
    type: "video";
    info?: VideoMediaInfo;
});

export type MediaValue = {
    id?: string;
    variant?: string;
    file: File | Blob;
} & ({
    type: "image";
    info?: ImageMediaInfo;
} | {
    type: "video";
    info?: VideoMediaInfo;
});
