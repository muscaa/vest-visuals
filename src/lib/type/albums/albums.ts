import { SelectRequired } from "@type/utils";
import * as contents from "./contents";

export type PartialAlbum = {
    id: string;
    title?: string;
    description?: string;
    cover?: string;
    deleteAt: Date;
    locked: boolean;
    albumsContents?: contents.PartialAlbumsContent[];
    createdAt: Date;
    updatedAt: Date;
};
export type Album = SelectRequired<PartialAlbum, "albumsContents">;
export type CreateProps = {
    title?: string;
    description?: string;
    cover?: string;
};
export type UpdateProps = {
    title?: string;
    description?: string;
    cover?: string;
};
