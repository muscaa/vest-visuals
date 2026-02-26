import * as media from "./media";
import * as directories from "./directories";
import { MediaProcessor } from "@type/media/processor";

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
export type CreateProps = {
    albumId: string;
    path: string[];
    order: number;
} & ({
    type: "media";
    albumsMedia: Omit<media.CreateProps, "contentId">;
} | {
    type: "directory";
    albumsDirectory: Omit<directories.CreateProps, "contentId">;
});
export type UpdateProps = {
    path?: string[];
    order?: number;
} & ({
    type?: never;
} | {
    type: "media";
    albumsMedia: media.UpdateProps;
} | {
    type: "directory";
    albumsDirectory: directories.UpdateProps;
});

export namespace CreateFormData {
    export type content = {
        albumId: string;
        path: string[];
        order: number;
        type: "media" | "directory";
    };
    export const content = "content";

    export type mediaFile = File;
    export const mediaFile = "mediaFile";
    export type mediaConfig = {
        processor: MediaProcessor;
    };
    export const mediaConfig = "mediaConfig";

    export type directory = {
        name: string;
        cover?: string;
    };
    export const directory = "directory";
}
