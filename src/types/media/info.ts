export interface MediaInfo {
    [key: string]: any;
}

export interface ImageMediaInfo extends MediaInfo {
    alt?: string;
    width?: number;
    height?: number;
}

export interface VideoMediaInfo extends MediaInfo {
    duration?: number;
}

export type MediaTypeInfo = {
    type: "image";
    info?: ImageMediaInfo;
} | {
    type: "video";
    info?: VideoMediaInfo;
};
