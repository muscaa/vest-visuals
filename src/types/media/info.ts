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
