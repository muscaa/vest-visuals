export type AlbumsContentVariant = {
    src: string;
    width: number;
    height: number;
};

export type AlbumsContent = {
    preview: AlbumsContentVariant;
    full: AlbumsContentVariant;
};
