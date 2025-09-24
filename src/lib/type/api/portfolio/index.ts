import { Response } from "@type/http";

export type PortfolioVariant = {
    src: string;
    width: number;
    height: number;
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
