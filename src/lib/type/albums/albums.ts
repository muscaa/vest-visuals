import { SelectRequired } from "@type/utils";
import * as contents from "./contents";

export type PartialAlbum = {
    id: string;
    title: string;
    description?: string;
    cover?: string;
    email?: string;
    phoneNumber?: string;
    downloadUrl: string;
    shareUrl: string;
    lockAt: Date;
    deleteAt: Date;
    albumsContents?: contents.PartialAlbumsContent[];
    createdAt: Date;
    updatedAt: Date;
};
export type Album = SelectRequired<PartialAlbum, "albumsContents">;
export type CreateProps = {
    title: string;
    description?: string;
    cover?: string;
    email?: string;
    phoneNumber?: string;
    lockAt: Date;
    deleteAt: Date;
};
export type UpdateProps = {
    title?: string;
    description?: string;
    cover?: string;
    email?: string;
    phoneNumber?: string;
    lockAt?: Date;
    deleteAt?: Date;
};
