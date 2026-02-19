import {
    SelectRequired,
    ListProps,
} from "@type/utils";
import * as mediaVariants from "./mediaVariants";
import { MediaProcessor } from "@type/media/processor";

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

export namespace UploadFormData {
    export type file = File;
    export const file = "file";
    export type config = {
        processor: MediaProcessor;
    };
    export const config = "config";
}
