import {
    ListProps,
    Replace,
} from "@type/utils";
import * as groups from "./groups";

export type PartialPortfolioCategory = {
    id: string;
    category: string;
    portfolioGroupIds: string[];
    portfolioGroups?: groups.PartialPortfolioGroup[];
    createdAt: Date;
    updatedAt: Date;
};
export type PortfolioCategory = Replace<PartialPortfolioCategory, { portfolioGroups: groups.PortfolioGroup[]; }>;
export type CreateProps = {
    category: string;
    portfolioGroups?: string[];
};
export type UpdateProps = {
    category?: string;
    portfolioGroups?: ListProps<string>;
};
