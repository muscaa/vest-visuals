import {
    SelectRequired,
    ListProps,
} from "@type/utils";
import * as mediaVariants from "./mediaVariants";

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
