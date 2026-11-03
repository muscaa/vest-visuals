import { BeautifulQRCode } from "@beautiful-qr-code/react";
import { m } from "@shared/paraglide/messages";
import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Fragment, useRef } from "react";
import { IconArrowDown, IconCopy, IconDownload, IconShare2 } from "@tabler/icons-react";
import { toast } from "sonner";
import { gallerySrcSet } from "@shared/gallery";
import { cn } from "@shared/shadcn/utils";
import { Fan } from "../gallery/fan";
import { Gallery } from "../gallery/gallery";
import { LanguageToggle } from "../language-toggle";
import { NavbarContent, NavbarRoot } from "../navbar";
import { ThemeToggle } from "../theme";
import { TextH1, TextP } from "../typography";
import { Badge } from "../ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { Button, buttonVariants } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import type { PublicAlbum } from "@shared/albums";
import { formatDate } from "@/i18n";
import { albumMediaQuery, albumQuery } from "@/functions/albums";
import { useGalleryQuery } from "@/hooks/gallery";

/** The cover over the whole screen, with the album's title on it. */
export function AlbumHero(props: { album: PublicAlbum; onContinue: () => void }) {
    const { album } = props;

    return (
        <section className="relative isolate flex flex-col justify-center items-center gap-6 h-dvh shrink-0 px-6 py-24 text-center theme-dark text-foreground">
            {
                album.cover && (
                    <img
                        src={album.cover.images.at(-1)?.url}
                        srcSet={gallerySrcSet(album.cover)}
                        sizes="100vw"
                        alt=""
                        fetchPriority="high"
                        className="absolute inset-0 -z-10 size-full object-cover"
                    />
                )
            }
            <div className="absolute inset-0 -z-10 bg-linear-to-b from-black/30 via-black/45 to-black/75" />
            <TextP size="sm-1" className="uppercase tracking-[0.3em] text-white/80">
                {formatDate(album.date)}
            </TextP>
            <TextH1 size="lg-1" className="max-w-5xl text-balance">
                {album.title}
            </TextH1>
            {album.description && (
                <TextP size="md-3" className="max-w-[50ch] text-pretty text-white/85">
                    {album.description}
                </TextP>
            )}
            {/* only the arrow, near the bottom of the cover; its text for screen readers and on hover */}
            <Button
                variant="white"
                size="icon-lg"
                aria-label={m.album_view()}
                title={m.album_view()}
                className="absolute bottom-10 left-1/2 size-14 -translate-x-1/2"
                onClick={props.onContinue}
            >
                <IconArrowDown className="size-6" />
            </Button>
        </section>
    );
}

/** Rendered only while the dialog is open, in the browser, where the page's link is known. */
function ShareOptions(props: { album: PublicAlbum }) {
    const link = `${window.location.origin}${window.location.pathname}`;

    const copy = async () => {
        await navigator.clipboard.writeText(link);
        toast.success(m.album_link_copied());
    };

    return (
        <>
            <div className="mx-auto w-56 p-3 rounded-2xl bg-white" role="img" aria-label={m.album_share_qr()}>
                <BeautifulQRCode data={link} foregroundColor="#000000" backgroundColor="#ffffff" radius={0.5} padding={0} />
            </div>
            <div className="flex flex-col gap-2">
                <Button size="lg" onClick={copy}>
                    <IconCopy data-icon="inline-start" />
                    {m.album_copy_link()}
                </Button>
                {
                    // phones and some browsers can hand the link to other apps
                    "share" in navigator && (
                        <Button size="lg" variant="outline" onClick={() => void navigator.share({ title: props.album.title, url: link }).catch(() => {})}>
                            <IconShare2 data-icon="inline-start" />
                            {m.album_share_apps()}
                        </Button>
                    )
                }
            </div>
        </>
    );
}

function ShareDialog(props: { album: PublicAlbum }) {
    return (
        <Dialog>
            <DialogTrigger render={<Button variant="ghost" aria-label={m.album_share()} />}>
                <IconShare2 data-icon="inline-start" />
                <span className="hidden md:inline">{m.album_share()}</span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>{m.album_share()}</DialogTitle>
                    <DialogDescription>{m.album_share_description()}</DialogDescription>
                </DialogHeader>
                <ShareOptions album={props.album} />
            </DialogContent>
        </Dialog>
    );
}

/** The whole album as one zip, saved under the album's title; only while the zip is in sync with the album. */
function DownloadAllButton(props: { album: PublicAlbum }) {
    if (!props.album.archiveUrl) return null;

    return (
        <a href={props.album.archiveUrl} download aria-label={m.album_download()} className={buttonVariants({ variant: "ghost" })}>
            <IconDownload data-icon="inline-start" />
            <span className="hidden md:inline">{m.album_download()}</span>
        </a>
    );
}

/** Scrolls with the page under the cover, then stays at the top while the photos scroll. */
export function AlbumNavbar(props: { album: PublicAlbum }) {
    return (
        <NavbarRoot className="sticky top-0">
            <NavbarContent home={{ to: "/media" }} className="max-w-none">
                <div className="flex items-center gap-1">
                    <DownloadAllButton album={props.album} />
                    <ShareDialog album={props.album} />
                    <LanguageToggle />
                    <ThemeToggle />
                </div>
            </NavbarContent>
        </NavbarRoot>
    );
}

/** Where the album's directories lead: its root, or a directory by the slugs on the way. */
function directoryLink(token: string, path: string[]) {
    return path.length
        ? { to: "/account/albums/$token/$", params: { token, _splat: path.join("/") } } as const
        : { to: "/account/albums/$token", params: { token } } as const;
}

/** The way back up from a directory: the album, then each directory down to this one. */
function AlbumBreadcrumb(props: { album: PublicAlbum }) {
    const { album } = props;
    const slugs = album.path.map((step) => step.slug);

    return (
        <Breadcrumb className="px-4 pt-6 pb-4 sm:px-6">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink render={<Link {...directoryLink(album.token, [])} />}>{album.title}</BreadcrumbLink>
                </BreadcrumbItem>
                {
                    album.path.map((step, index) => (
                        <Fragment key={step.slug}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                {
                                    index === album.path.length - 1
                                        ? <BreadcrumbPage>{step.name}</BreadcrumbPage>
                                        : <BreadcrumbLink render={<Link {...directoryLink(album.token, slugs.slice(0, index + 1))} />}>{step.name}</BreadcrumbLink>
                                }
                            </BreadcrumbItem>
                        </Fragment>
                    ))
                }
            </BreadcrumbList>
        </Breadcrumb>
    );
}

/** The directories inside this one, each a fan of its photos with its name under it. */
function AlbumDirectories(props: { album: PublicAlbum }) {
    const { album } = props;
    if (!album.directories.length) return null;

    const here = album.path.map((step) => step.slug);
    return (
        <ul className="grid grid-cols-2 gap-3 px-4 py-6 sm:grid-cols-3 sm:gap-4 sm:px-6 lg:grid-cols-4 xl:grid-cols-5">
            {
                album.directories.map((directory) => {
                    const photos = directory.previews.length > 0;
                    return (
                        <li key={directory.id}>
                            <Link {...directoryLink(album.token, [...here, directory.slug])} className="group/directory block rounded-3xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
                                <Fan
                                    previews={directory.previews}
                                    sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                                    className="transition-transform duration-300 group-hover/directory:scale-[1.03]"
                                >
                                    {/* the name on the photo, bottom right, over a shade so it reads on any photo */}
                                    <div className={cn("absolute inset-0 flex items-end justify-end p-3 sm:p-4", photos && "bg-linear-to-t from-black/75 via-black/15 to-transparent")}>
                                        <span className={cn("max-w-full text-right text-md-2 font-semibold leading-tight text-balance wrap-break-word", photos ? "text-white" : "text-foreground")}>
                                            {directory.name}
                                        </span>
                                    </div>
                                </Fan>
                            </Link>
                        </li>
                    );
                })
            }
        </ul>
    );
}

/**
 * An album at one of its directories: the cover first at its root, then the way back up, its directories and its
 * photos. A draft, which only admins open, says so in a corner.
 */
export function AlbumPage(props: { token: string; path: string[] }) {
    const { data: album } = useSuspenseQuery(albumQuery(props.token, props.path));
    const gallery = useGalleryQuery(albumMediaQuery(props.token, props.path));
    const content = useRef<HTMLDivElement>(null);
    const root = album.path.length === 0;

    return (
        <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
            {root && <AlbumHero album={album} onContinue={() => content.current?.scrollIntoView({ behavior: "smooth" })} />}
            <div ref={content} className="flex flex-col grow">
                <AlbumNavbar album={album} />
                <main className="flex flex-col grow">
                    {!root && <AlbumBreadcrumb album={album} />}
                    <AlbumDirectories album={album} />
                    <Gallery {...gallery} downloadable className="grow p-1 sm:p-1.5" />
                </main>
            </div>
            {album.draft && <Badge variant="secondary" className="fixed bottom-4 left-4 z-50 shadow-md">{m.album_draft()}</Badge>}
        </div>
    );
}
