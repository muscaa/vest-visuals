/**
 * Demo albums until the backend is there, made of the portfolio's photos and films.
 * TODO: replace with the albums from the database; only `src/functions/albums.ts` reads this.
 */
import { demoCategoryMedia, demoVideos } from "./gallery";
import type { GalleryItem } from "@shared/gallery";

export interface DemoAlbum {
    id: string;
    title: string;
    description?: string;
    /** ISO date of the event */
    date: string;
    /** ISO date from which nobody can open it, as if deleted, while the client still has time to pay */
    lockAt: string;
    /** ISO date when it's deleted for good */
    deleteAt: string;
    coverId: string;
    media: GalleryItem[];
}

const majorat = demoCategoryMedia("majorat").filter((item) => !item.video);

export const demoAlbums: DemoAlbum[] = [
    {
        id: "a1",
        title: "Majorat Andrei",
        description: "Petrecerea de 18 ani, de la pregătiri până la ultimul dans.",
        date: "2026-10-18",
        lockAt: "2026-12-04",
        deleteAt: "2027-01-04",
        coverId: "yu9eomg0ef4f66u2gpbqws4t",
        media: [demoVideos.majorat[0], ...majorat.slice(0, 20), demoVideos.majorat[2], ...majorat.slice(20)],
    },
    {
        id: "a2",
        title: "Ședință foto în Parcul Rozelor",
        date: "2026-09-27",
        lockAt: "2026-11-30",
        deleteAt: "2026-12-30",
        coverId: "l1xhekvxbakado1gh18v7ged",
        media: demoCategoryMedia("sedinta-foto"),
    },
    {
        // locked: its link shows "not found" until it's deleted
        id: "a3",
        title: "Nunta Ana & Radu",
        date: "2026-09-12",
        lockAt: "2026-10-12",
        deleteAt: "2026-11-12",
        coverId: "a8rm9fhczl4px321ladxwrft",
        media: demoCategoryMedia("sedinta-foto").slice(0, 24),
    },
];
