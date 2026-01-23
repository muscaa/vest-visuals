export type PortfolioVariant = {
    src: string;
    width: number;
    height: number;
};

export type PortfolioEntry = {
    preview: PortfolioVariant;
    full: PortfolioVariant;
};
