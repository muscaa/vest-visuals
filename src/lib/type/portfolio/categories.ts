import {
    ListProps,
    Replace,
} from "@type/utils";
import * as groups from "./groups";

export type PartialPortfolioCategory = {
    id: string;
    tag: string;
    portfolioGroupIds: string[];
    portfolioGroups?: groups.PartialPortfolioGroup[];
    createdAt: Date;
    updatedAt: Date;
};
export type PortfolioCategory = Replace<PartialPortfolioCategory, { portfolioGroups: groups.PortfolioGroup[]; }>;
export type CreateProps = {
    tag: string;
    portfolioGroups?: string[];
};
export type UpdateProps = {
    tag?: string;
    portfolioGroups?: ListProps<string>;
};
