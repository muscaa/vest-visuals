import {
    SelectRequired,
    ListProps,
} from "@type/utils";
import * as variants from "./variants";

export type PartialMediaContent = {
    id: string;
    mediaVariants?: variants.MediaVariant[];
    createdAt: Date;
    updatedAt: Date;
};
export type MediaContent = SelectRequired<PartialMediaContent, "mediaVariants">;
type CreateVariantProps = Omit<variants.CreateProps, "contentId">;
export type CreateProps = {
    mediaVariants: CreateVariantProps[];
};
export type UpdateProps = {
    mediaVariants?: ListProps<CreateVariantProps, CreateVariantProps, string>;
};
