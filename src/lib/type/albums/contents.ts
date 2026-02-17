import { SelectRequired } from "@type/utils";
import * as media from "./media";
import * as directories from "./directories";

export type PartialAlbumsContent = {
    id: string;
    albumId: string;
    path: string;
    type: "media" | "directory";
    order: number;
    albumsMedia?: media.PartialAlbumsMedia;
    albumsDirectory?: directories.AlbumsDirectory;
    createdAt: Date;
    updatedAt: Date;
};
export type AlbumsContent = SelectRequired<PartialAlbumsContent, "albumsMedia" | "albumsDirectory">;
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
