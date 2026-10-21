/**
 * Demo data for the admin, shared by the lists and their detail pages so they agree with each other.
 * TODO: replace with data from the backend; the types say what each page needs.
 */
import type { MediaVariant } from "./media";

export interface PortfolioCategory {
    id: string;
    /** used in urls and to match a service, e.g. "nunta" for /portofoliu/nunta */
    tag: string;
    /** ISO date */
    updatedAt: string;
}

export interface PortfolioGroup {
    id: string;
    categoryId: string;
    cover: string;
    location?: string;
    description?: string;
    /** ISO date */
    updatedAt: string;
}

export interface PortfolioMedia {
    id: string;
    groupId: string;
    /** the first one is the preview */
    variants: MediaVariant[];
    /** ISO date */
    createdAt: string;
}

export interface Album {
    id: string;
    title: string;
    /** the client's email, the album shows up in their account */
    email: string;
    /** ISO date, after which the client can't download anymore */
    lockAt: string;
    /** ISO date, after which the album is deleted */
    deleteAt: string;
}

export interface AlbumMedia {
    id: string;
    albumId: string;
    /** the first one is the preview */
    variants: MediaVariant[];
    /** ISO date */
    createdAt: string;
}

const portfolio = (id: string, host = "s3.vestvisuals.ro"): MediaVariant[] => [
    { tag: "medium", url: `https://${host}/portfolio/${id}/medium` },
    { tag: "large", url: `https://${host}/portfolio/${id}/large` },
];

export const portfolioCategories: PortfolioCategory[] = [
    { id: "c1", tag: "majorat", updatedAt: "2026-09-28" },
    { id: "c2", tag: "auto", updatedAt: "2026-08-14" },
    { id: "c3", tag: "imobiliare", updatedAt: "2026-10-03" },
];

export const portfolioGroups: PortfolioGroup[] = [
    {
        id: "g1",
        categoryId: "c1",
        cover: "https://s3.vestvisuals.ro/portfolio/b4dwo04rs8ta7na0zzbflpuv/medium",
        location: "Timișoara",
        description: "Majorat cu tematică aurie",
        updatedAt: "2026-09-28",
    },
    {
        id: "g2",
        categoryId: "c1",
        cover: "https://cdn0.vestvisuals.ro/portfolio/qyko3rjjfg14yjhvs2l45wck/medium",
        location: "Arad",
        description: "Majorat la restaurant",
        updatedAt: "2026-09-02",
    },
    {
        id: "g3",
        categoryId: "c2",
        cover: "https://s3.vestvisuals.ro/portfolio/z34362mh88we0urk97td85ax/medium",
        location: "Arad",
        description: "Ședință auto la apus",
        updatedAt: "2026-08-14",
    },
    {
        id: "g4",
        categoryId: "c3",
        cover: "https://s3.vestvisuals.ro/portfolio/f64uxutmybs9iuc08j1cp73y/medium",
        description: "Apartament cu 3 camere, Iosefin",
        updatedAt: "2026-10-03",
    },
];

export const portfolioMedia: PortfolioMedia[] = [
    { id: "b4dwo04rs8ta7na0zzbflpuv", groupId: "g1", variants: portfolio("b4dwo04rs8ta7na0zzbflpuv"), createdAt: "2026-09-28" },
    { id: "yu9eomg0ef4f66u2gpbqws4t", groupId: "g1", variants: portfolio("yu9eomg0ef4f66u2gpbqws4t", "cdn0.vestvisuals.ro"), createdAt: "2026-09-28" },
    { id: "yio20oo5vxfs18cxm925k3fy", groupId: "g1", variants: portfolio("yio20oo5vxfs18cxm925k3fy", "cdn0.vestvisuals.ro"), createdAt: "2026-09-28" },
    { id: "z34362mh88we0urk97td85ax", groupId: "g3", variants: portfolio("z34362mh88we0urk97td85ax"), createdAt: "2026-08-14" },
    { id: "f64uxutmybs9iuc08j1cp73y", groupId: "g4", variants: portfolio("f64uxutmybs9iuc08j1cp73y"), createdAt: "2026-10-03" },
];

export const albums: Album[] = [
    { id: "a1", title: "Nunta Ana & Radu", email: "ana.ionescu@exemplu.ro", lockAt: "2027-09-28", deleteAt: "2027-10-28" },
    { id: "a2", title: "Botez Maria", email: "elena.popa@exemplu.ro", lockAt: "2027-01-15", deleteAt: "2027-02-15" },
    { id: "a3", title: "Majorat Andrei", email: "andrei.matei@exemplu.ro", lockAt: "2026-12-04", deleteAt: "2027-01-04" },
];

export const albumMedia: AlbumMedia[] = [
    { id: "am1", albumId: "a3", variants: portfolio("b4dwo04rs8ta7na0zzbflpuv"), createdAt: "2026-10-20" },
    { id: "am2", albumId: "a3", variants: portfolio("yu9eomg0ef4f66u2gpbqws4t", "cdn0.vestvisuals.ro"), createdAt: "2026-10-20" },
    { id: "am3", albumId: "a3", variants: portfolio("yio20oo5vxfs18cxm925k3fy", "cdn0.vestvisuals.ro"), createdAt: "2026-10-20" },
    { id: "am4", albumId: "a1", variants: portfolio("l1xhekvxbakado1gh18v7ged"), createdAt: "2026-09-30" },
];
