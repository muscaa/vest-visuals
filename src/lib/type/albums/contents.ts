import {
    SelectRequired,
    ListProps,
} from "@type/utils";
import * as variants from "./variants";

export type PartialAlbumContent = {
    id: string;
    albumVariants?: variants.AlbumVariant[];
    createdAt: Date;
    updatedAt: Date;
};
export type AlbumContent = SelectRequired<PartialAlbumContent, "albumVariants">;
type CreateVariantProps = Omit<variants.CreateProps, "contentId">;
export type CreateProps = {
    albumVariants: CreateVariantProps[];
};
export type UpdateProps = {
    albumVariants?: ListProps<CreateVariantProps, CreateVariantProps, string>;
};
