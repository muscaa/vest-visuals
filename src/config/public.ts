import {
    Category,
} from "@/shared/config";

export const env = {
    RECAPTCHA_KEY_SITE: process.env.NEXT_PUBLIC_RECAPTCHA_KEY_SITE!,
} as const;

export const categories: Category[] = [
    {
        name: "Nunti",
        coverImage: {
            src: "/categories/wedding/0.png",
            alt: "Wedding Cover Image",
            w: 6016,
            h: 4016,
        },
        portfolioUrl: "/portfolio/wedding",
    },
    {
        name: "Automotive",
        coverImage: {
            src: "/categories/automotive/0/00.jpg",
            alt: "Automotive Cover Image",
            w: 1920,
            h: 1280,
        },
        portfolioUrl: "/portfolio/automotive",
    },
    {
        name: "Fotografie de produs",
        coverImage: {
            src: "/categories/product/0/0.jpg",
            alt: "Product Photography Cover Image",
            w: 1920,
            h: 1280,
        },
        portfolioUrl: "/portfolio/product",
    },
] as const;
