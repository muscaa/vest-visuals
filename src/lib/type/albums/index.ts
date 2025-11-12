import {
    ListProps,
    Replace,
} from "@type/utils";
import * as contents from "./contents";

export type PartialAlbum = {
    id: string;
    description?: string;
    albumContentIds: string[];
    albumContents?: contents.PartialAlbumContent[];
    createdAt: Date;
    updatedAt: Date;
};
export type Album = Replace<PartialAlbum, { albumContents: contents.AlbumContent[]; }>;
export type CreateProps = {
    description?: string;
    albumContents?: string[];
};
export type UpdateProps = {
    description?: string | null;
    albumContents?: ListProps<string>;
};
