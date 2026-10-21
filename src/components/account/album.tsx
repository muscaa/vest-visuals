import { BeautifulQRCode } from "@beautiful-qr-code/react";
import { m } from "@shared/paraglide/messages";
import { useRef, useState } from "react";
import { IconArrowDown, IconCopy, IconDownload, IconShare2 } from "@tabler/icons-react";
import { toast } from "sonner";
import { gallerySrcSet } from "@shared/gallery";
import { LanguageToggle } from "../language-toggle";
import { NavbarContent, NavbarRoot } from "../navbar";
import { ThemeToggle } from "../theme";
import { TextH1, TextP } from "../typography";
import { Button } from "../ui/button";
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
import { getAlbumDownload } from "@/functions/albums";

/** The cover over the whole screen, with the album's title on it. */
export function AlbumHero(props: { album: PublicAlbum; onContinue: () => void }) {
    const { album } = props;

    return (
        <section className="relative isolate flex flex-col justify-center items-center gap-6 h-dvh shrink-0 px-6 py-24 text-center theme-dark text-foreground">
            <img
                src={album.cover.images.at(-1)?.url}
                srcSet={gallerySrcSet(album.cover)}
                sizes="100vw"
                alt=""
                fetchPriority="high"
                className="absolute inset-0 -z-10 size-full object-cover"
            />
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
            <Button variant="white" size="xl" className="mt-4" onClick={props.onContinue}>
                {m.album_view()}
                <IconArrowDown data-icon="inline-end" />
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

function DownloadAllButton(props: { album: PublicAlbum }) {
    const [pending, setPending] = useState(false);

    const download = async () => {
        setPending(true);
        try {
            const { url } = await getAlbumDownload({ data: { id: props.album.id } });
            if (url) {
                window.location.assign(url);
            } else {
                toast.info(m.album_download_unavailable());
            }
        } finally {
            setPending(false);
        }
    };

    return (
        <Button variant="ghost" onClick={download} disabled={pending} aria-label={m.album_download()}>
            <IconDownload data-icon="inline-start" />
            <span className="hidden md:inline">{m.album_download()}</span>
        </Button>
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

/** The album's own layout: no footer, the page is the cover, the navbar and the photos. */
export function AlbumLayout(props: { album: PublicAlbum; children: React.ReactNode }) {
    const content = useRef<HTMLDivElement>(null);

    return (
        <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
            <AlbumHero album={props.album} onContinue={() => content.current?.scrollIntoView({ behavior: "smooth" })} />
            <div ref={content} className="flex flex-col grow">
                <AlbumNavbar album={props.album} />
                <main className="flex flex-col grow">{props.children}</main>
            </div>
        </div>
    );
}
