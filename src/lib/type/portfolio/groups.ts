import {
    ListProps,
    Replace,
} from "@type/utils";
import * as media from "./media";

export type PartialPortfolioGroup = {
    id: string;
    location?: string;
    description?: string;
    portfolioMediaIds: string[];
    portfolioMedia?: media.PartialPortfolioMedia[];
    createdAt: Date;
    updatedAt: Date;
};
export type PortfolioGroup = Replace<PartialPortfolioGroup, { portfolioMedia: media.PortfolioMedia[]; }>;
export type CreateProps = {
    description?: string;
    location?: string;
    portfolioMedia?: string[];
};
export type UpdateProps = {
    description?: string | null;
    location?: string | null;
    portfolioMedia?: ListProps<string>;
};
