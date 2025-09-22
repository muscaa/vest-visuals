export interface PortfolioCategory {
    name: string;
    href: string;
    cover: string;
}

export interface PortfolioRegistry {
    categories: PortfolioCategory[];
}
