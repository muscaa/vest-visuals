import { m } from "@shared/paraglide/messages";
import { Link, createFileRoute } from "@tanstack/react-router";
import { IconClock } from "@tabler/icons-react";
import { Img } from "@/components/img";
import { DashboardPage } from "@/components/layout/sidebar";
import { formatDate } from "@/i18n";

interface Album {
    id: string;
    title: string;
    cover: string;
    /** ISO date, until when the client can view and download it */
    lockAt: string;
}

// TODO: replace with the signed in client's albums from the backend
const albums: Album[] = [
    {
        id: "a1",
        title: "Majorat Andrei",
        cover: "https://s3.vestvisuals.ro/portfolio/b4dwo04rs8ta7na0zzbflpuv/medium",
        lockAt: "2026-12-04",
    },
    {
        id: "a2",
        title: "Ședință foto în Parcul Rozelor",
        cover: "https://s3.vestvisuals.ro/portfolio/l1xhekvxbakado1gh18v7ged/medium",
        lockAt: "2026-11-30",
    },
];

function AlbumTile({ album }: { album: Album }) {
    return (
        <Link
            to="/account/albums/$id"
            params={{ id: album.id }}
            className="group/album relative isolate flex flex-col justify-end aspect-4/3 p-5 rounded-3xl overflow-hidden shadow-md theme-dark outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
            <Img
                src={album.cover}
                alt={album.title}
                loading="lazy"
                className="absolute -z-10 inset-0 size-full object-cover transition-transform duration-300 group-hover/album:scale-105"
            />
            <div className="absolute -z-10 inset-0 bg-linear-to-b from-transparent from-40% to-black/80" />
            <span className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/45 backdrop-blur-sm text-sm-3 text-foreground">
                <IconClock className="size-3.5" />
                {m.account_albums_expires({ date: formatDate(album.lockAt) })}
            </span>
            <h2 className="text-md-2 font-medium text-foreground text-balance">{album.title}</h2>
        </Link>
    );
}

export const Route = createFileRoute("/account/_dashboard/albums/")({
    staticData: {
        breadcrumbs: () => [{ label: m.account_albums() }],
    },
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <DashboardPage title={m.account_albums()} description={m.account_albums_description()}>
            <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {
                    albums.map((album) => (
                        <li key={album.id}>
                            <AlbumTile album={album} />
                        </li>
                    ))
                }
            </ul>
        </DashboardPage>
    );
}
