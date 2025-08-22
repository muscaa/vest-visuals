import { Response } from "@shared/types/http";

export type PortfolioVariant = {
    src: string;
};

export type PortfolioEntry = {
    preview: PortfolioVariant;
    full: PortfolioVariant;
};

// POST

export type PostRequest = {
    category: string;
};

export type PostResponse = Response<{
    values: PortfolioEntry[];
}>;
