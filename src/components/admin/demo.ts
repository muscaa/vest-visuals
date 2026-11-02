/**
 * Demo data for the admin, shared by the lists and their detail pages so they agree with each other.
 * TODO: replace with data from the backend; the types say what each page needs.
 */
import type { MediaVariant } from "./media";

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

/** the demo albums borrow photos from the old portfolio */
const portfolio = (id: string, host = "s3.vestvisuals.ro"): MediaVariant[] => [
    { tag: "medium", url: `https://${host}/portfolio/${id}/medium` },
    { tag: "large", url: `https://${host}/portfolio/${id}/large` },
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
