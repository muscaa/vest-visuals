import { m } from "@shared/paraglide/messages";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IconClock, IconLink, IconPhoto } from "@tabler/icons-react";
import { toast } from "sonner";
import { gallerySrcSet } from "@shared/gallery";
import type { MyAlbum } from "@/functions/albums";
import { FormDialog } from "@/components/form-dialog";
import { DashboardPage } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/i18n";
import { useFormSubmit } from "@/hooks/form";
import { myAlbumsQuery, renewAlbumLink } from "@/functions/albums";

/** Gives the album a new link, after asking: the old one stops working, for anyone it was shared with. */
function RenewLinkDialog(props: { album: MyAlbum }) {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    const form = useFormSubmit(async () => {
        await renewAlbumLink({ data: { id: props.album.id } });
        await queryClient.invalidateQueries({ queryKey: myAlbumsQuery.queryKey });
        setOpen(false);
        toast.success(m.album_link_renewed());
    });

    return (
        <>
            <Button
                variant="secondary"
                size="icon-sm"
                aria-label={m.album_renew_link()}
                title={m.album_renew_link()}
                className="absolute top-4 left-4 z-10 opacity-80 hover:opacity-100"
                onClick={() => setOpen(true)}
            >
                <IconLink />
            </Button>
            <FormDialog
                open={open}
                onOpenChange={setOpen}
                title={m.album_renew_link()}
                description={m.album_renew_link_description()}
                submit={m.album_renew_link_submit()}
                form={form}
            />
        </>
    );
}

function AlbumTile({ album }: { album: MyAlbum }) {
    return (
        <div className="relative">
            <Link
                to="/account/albums/$token"
                params={{ token: album.token }}
                className="group/album relative isolate flex flex-col justify-end aspect-4/3 p-5 rounded-3xl overflow-hidden shadow-md theme-dark outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
                {
                    album.cover
                        ? (
                            <img
                                src={album.cover.images.at(-1)?.url}
                                srcSet={gallerySrcSet(album.cover)}
                                sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                                alt={album.title}
                                loading="lazy"
                                className="absolute -z-10 inset-0 size-full object-cover transition-transform duration-300 group-hover/album:scale-105"
                            />
                        )
                        : <IconPhoto className="absolute -z-10 inset-0 m-auto size-12 text-muted-foreground" />
                }
                <div className="absolute -z-10 inset-0 bg-linear-to-b from-transparent from-40% to-black/80" />
                {
                    album.lockAt && (
                        <span className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/45 backdrop-blur-sm text-sm-3 text-foreground">
                            <IconClock className="size-3.5" />
                            {m.account_albums_expires({ date: formatDate(album.lockAt.toISOString()) })}
                        </span>
                    )
                }
                <h2 className="text-md-2 font-medium text-foreground text-balance">{album.title}</h2>
            </Link>
            <RenewLinkDialog album={album} />
        </div>
    );
}

export const Route = createFileRoute("/account/_dashboard/albums/")({
    staticData: {
        breadcrumbs: () => [{ label: m.account_albums() }],
    },
    loader: ({ context }) => context.queryClient.query(myAlbumsQuery),
    component: RouteComponent,
});

/** The signed in client's published albums, by their email, until they lock. */
function RouteComponent() {
    const { data: albums } = useSuspenseQuery(myAlbumsQuery);

    return (
        <DashboardPage title={m.account_albums()} description={m.account_albums_description()}>
            {
                albums.length
                    ? (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {
                                albums.map((album) => (
                                    <li key={album.id}>
                                        <AlbumTile album={album} />
                                    </li>
                                ))
                            }
                        </ul>
                    )
                    : <p className="text-muted-foreground">{m.account_albums_empty()}</p>
            }
        </DashboardPage>
    );
}
