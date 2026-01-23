import {
    SelectRequired,
    ListProps,
} from "@type/utils";
import * as mediaVariants from "./mediaVariants";
import { MediaProcessor } from "@type/media/processor";

export type PartialAssetsMedia = {
    id: string;
    assetsMediaVariants?: mediaVariants.AssetsMediaVariant[];
    createdAt: Date;
    updatedAt: Date;
};
export type AssetsMedia = SelectRequired<PartialAssetsMedia, "assetsMediaVariants">;
type CreateAssetsMediaVariantProps = Omit<mediaVariants.CreateProps, "mediaId">;
export type CreateProps = {
    assetsMediaVariants: CreateAssetsMediaVariantProps[];
};
export type UpdateProps = {
    assetsMediaVariants?: ListProps<CreateAssetsMediaVariantProps, CreateAssetsMediaVariantProps, string>;
};

export namespace UploadFormData {
    export type file = File;
    export const file = "file";
    export type config = {
        processor: MediaProcessor;
    };
    export const config = "config";
}
