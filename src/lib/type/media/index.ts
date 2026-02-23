export interface MediaVariant {
    src: string;
    width: number;
    height: number;
}

export interface Media {
    preview: MediaVariant;
    full: MediaVariant;
    download?: MediaVariant;
    alt?: string;
}
