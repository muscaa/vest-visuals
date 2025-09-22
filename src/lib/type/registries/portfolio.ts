export interface PortfolioCategory {
    name: string;
    href: string;
    cover: {
        src: string;
        width: number;
        height: number;
    };
}

export interface PortfolioRegistry {
    categories: PortfolioCategory[];
}
