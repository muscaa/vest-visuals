import * as media from "./media";
import * as directories from "./directories";

type AlbumsContentBase = {
    id: string;
    albumId: string;
    path: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}
type AlbumsContentType = {
    type: "media";
    albumsMedia?: media.PartialAlbumsMedia;
} | {
    type: "directory";
    albumsDirectory?: directories.AlbumsDirectory;
};

export type PartialAlbumsContent = AlbumsContentBase & AlbumsContentType;
export type AlbumsContent = AlbumsContentBase & Required<AlbumsContentType>;
type CreateAlbumsMediaProps = Omit<media.CreateProps, "contentId">;
type CreateAlbumsDirectoryProps = Omit<directories.CreateProps, "contentId">;
export type CreateProps = {
    albumId: string;
    path: string;
    order?: number;
} & ({
    type: "media";
    albumsMedia: CreateAlbumsMediaProps;
} | {
    type: "directory";
    albumsDirectory: CreateAlbumsDirectoryProps;
});
export type UpdateProps = {
    // albumsMediaVariants?: ListProps<CreateAlbumsMediaVariantProps, CreateAlbumsMediaVariantProps, string>;
};
