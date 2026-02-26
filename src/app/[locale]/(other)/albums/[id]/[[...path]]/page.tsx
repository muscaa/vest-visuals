"use client";

import { useParams } from "next/navigation";
import {
    useMemo,
    useState,
} from "react";
import { MediaWaterfall } from "@/components/media/media-waterfall";
import { getPaginated } from "@/actions/albums";
import { Navbar } from "@/components/navbar";
import {
    Download,
    Share2,
} from "lucide-react";
import { useAlbums } from "@/hooks/albums/useAlbums";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BeautifulQRCode } from "@beautiful-qr-code/react";
import { useMain } from "@/hooks/useMain";
import { FooterLarge } from "@/components/footer";
import { Img } from "@/components/snippets";
import { useWindowSize } from "@/hooks/useWindowSize";
import { PartialAlbum } from "@type/albums/albums";

interface ShareDialogProps {
    album: PartialAlbum;
    children: React.ReactNode;
}

function ShareDialog(props: ShareDialogProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(props.album.shareUrl)

        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Dialog>
            <DialogTrigger render={
                <Button variant="navbar">
                    {props.children}
                </Button>
            } />
            <DialogContent className="sm:max-w-xs">
                <DialogHeader>
                    <DialogTitle>Share</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col text-center gap-4">
                    <BeautifulQRCode
                        data={props.album.shareUrl}
                        foregroundColor="#000000"
                        backgroundColor="#ffffff"
                        radius={0}
                    />
                    <p className="text-muted-foreground">OR</p>
                    <Button disabled={copied} onClick={handleCopy}>
                        {
                            copied ? "Copied!" : "Copy Link"
                        }
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default function Page() {
    const { ref } = useMain();
    const params = useParams<{ id: string; path?: string[]; }>();
    const path = useMemo(() => params.path?.map(decodeURIComponent), [params.path]);
    const { usePartialAlbum } = useAlbums();
    const { data: album } = usePartialAlbum(params.id);
    const size = useWindowSize();

    const handleNextData = async (offset: number, limit: number) => {
        const [status, result] = await getPaginated(offset, limit, params.id, path);
        if (status !== "OK") return [];

        return result;
    };

    return (
        <div ref={ref} className="flex flex-col max-h-full overflow-y-auto">
            <div className="relative flex w-full min-h-screen">
                {
                    album && (
                        <>
                            <Img
                                src={album.coverUrl}
                                alt="Album Cover"
                                className="w-full object-cover"
                            />
                            <div className="absolute size-full flex flex-col justify-center items-center gap-8 p-8 text-center text-shadow-lg theme-dark">
                                <h1 className="font-mono">{album.title}</h1>
                                <h4>{album.description}</h4>
                                <Button
                                    variant="transparent"
                                    className="theme-light"
                                    onClick={() => size && ref?.current?.scrollTo(0, size.height)}
                                >
                                    MAI DEPARTE
                                </Button>
                            </div>
                        </>
                    )
                }
            </div>
            <Navbar
                // logo={<div></div>}
                links={album ? [
                    {
                        type: "endpoint",
                        title: "DOWNLOAD",
                        link: {
                            href: album.downloadUrl,
                            download: `${album.title}.zip`,
                        },
                        icon: Download,
                    },
                    {
                        type: "endpoint",
                        title: "SHARE",
                        component: (props) => (
                            <ShareDialog
                                album={album}
                            >
                                {props.children}
                            </ShareDialog>
                        ),
                        icon: Share2,
                    },
                ] : []}
                className="max-w-none"
                extraClassName="sticky top-0"
            />
            <main className="grow">
                <MediaWaterfall
                    nextData={handleNextData}
                />
            </main>
            <FooterLarge />
        </div>
    );
}
