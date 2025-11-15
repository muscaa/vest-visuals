import {
    SelectRequired,
    ListProps,
} from "@type/utils";
import * as variants from "./variants";

export type PartialAlbumMediaContent = {
    id: string;
    albumId: string;
    order: number;
    albumMediaVariants?: variants.AlbumMediaVariant[];
    createdAt: Date;
    updatedAt: Date;
};
export type AlbumMediaContent = SelectRequired<PartialAlbumMediaContent, "albumMediaVariants">;
type CreateVariantProps = Omit<variants.CreateProps, "contentId">;
export type CreateProps = {
    albumMediaVariants: CreateVariantProps[];
};
export type UpdateProps = {
    albumMediaVariants?: ListProps<CreateVariantProps, CreateVariantProps, string>;
};
