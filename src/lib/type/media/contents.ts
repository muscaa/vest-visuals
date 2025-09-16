import {
    SelectRequired,
    ListProps,
} from "@type/utils";
import * as variants from "./variants";

export type PartialMediaContent = {
    id: string;
    mediaVariantIds: string[];
    mediaVariants?: variants.MediaVariant[];
    createdAt: Date;
    updatedAt: Date;
};
export type MediaContent = SelectRequired<PartialMediaContent, "mediaVariants">;
export type CreateProps = {
    mediaVariants: variants.CreateProps[];
};
export type UpdateProps = {
    mediaVariants?: ListProps<variants.CreateProps, variants.CreateProps, string>;
};
