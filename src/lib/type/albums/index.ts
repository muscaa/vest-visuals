import {
    ListProps,
    Replace,
} from "@type/utils";
import * as contents from "./contents";

export type PartialAlbum = {
    id: string;
    description?: string;
    albumMediaContentIds: string[];
    albumMediaContents?: contents.PartialAlbumMediaContent[];
    createdAt: Date;
    updatedAt: Date;
};
export type Album = Replace<PartialAlbum, { albumMediaContents: contents.AlbumMediaContent[]; }>;
export type CreateProps = {
    description?: string;
    albumMediaContents?: string[];
};
export type UpdateProps = {
    description?: string | null;
    albumMediaContents?: ListProps<string>;
};
