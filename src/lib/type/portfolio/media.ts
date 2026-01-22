import {
    SelectRequired,
    ListProps,
} from "@type/utils";
import * as mediaVariants from "./mediaVariants";
import { MediaProcessor } from "@type/media/processor";

export type PartialPortfolioMedia = {
    id: string;
    portfolioMediaVariants?: mediaVariants.PortfolioMediaVariant[];
    createdAt: Date;
    updatedAt: Date;
};
export type PortfolioMedia = SelectRequired<PartialPortfolioMedia, "portfolioMediaVariants">;
type CreatePortfolioMediaVariantProps = Omit<mediaVariants.CreateProps, "mediaId">;
export type CreateProps = {
    portfolioMediaVariants: CreatePortfolioMediaVariantProps[];
};
export type UpdateProps = {
    portfolioMediaVariants?: ListProps<CreatePortfolioMediaVariantProps, CreatePortfolioMediaVariantProps, string>;
};

export namespace UploadFormData {
    export type file = File;
    export const file = "file";
    export type config = {
        processor: MediaProcessor;
    };
    export const config = "config";
}
