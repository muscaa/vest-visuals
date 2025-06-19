export interface Category {
    name: string;
    coverImage: {
        src: string;
        w: number;
        h: number;
    };
    portfolioUrl: string;
}

export const categories: Category[] = [
    {
        name: "Nunti",
        coverImage: {
            src: "/categories/wedding/0.png",
            w: 6016,
            h: 4016,
        },
        portfolioUrl: "/portfolio/wedding",
    },
    {
        name: "Automotive",
        coverImage: {
            src: "/categories/automotive/0/00.jpg",
            w: 1920,
            h: 1280,
        },
        portfolioUrl: "/portfolio/automotive",
    },
    {
        name: "Fotografie de produs",
        coverImage: {
            src: "/categories/product/0/0.jpg",
            w: 1920,
            h: 1280,
        },
        portfolioUrl: "/portfolio/product",
    },
] as const;
