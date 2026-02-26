import {
    SelectRequired,
    ListProps,
} from "@type/utils";
import * as mediaVariants from "./mediaVariants";

export type PartialAlbumsMedia = {
    contentId: string;
    albumsMediaVariants?: mediaVariants.AlbumsMediaVariant[];
};
export type AlbumsMedia = SelectRequired<PartialAlbumsMedia, "albumsMediaVariants">;
type CreateAlbumsMediaVariantProps = Omit<mediaVariants.CreateProps, "mediaId">;
export type CreateProps = {
    contentId: string;
    albumsMediaVariants: CreateAlbumsMediaVariantProps[];
};
export type UpdateProps = {
    albumsMediaVariants?: ListProps<CreateAlbumsMediaVariantProps, CreateAlbumsMediaVariantProps, string>;
};
