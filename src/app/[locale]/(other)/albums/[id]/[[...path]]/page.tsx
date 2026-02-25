"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";
import { MediaWaterfall } from "@/components/media/media-waterfall";
import { getPaginated } from "@/actions/albums";
import { NavbarLayoutProvider } from "@/components/layout/providers/navbar";
import { Navbar } from "@/components/navbar";
import { Download, Share2 } from "lucide-react";
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

export default function Page() {
    const params = useParams<{ id: string; path?: string[]; }>();
    const path = useMemo(() => params.path?.map(decodeURIComponent), [params.path]);
    const { usePartialAlbum } = useAlbums();
    const { data: album } = usePartialAlbum(params.id);

    const handleNextData = async (offset: number, limit: number) => {
        const [status, result] = await getPaginated(offset, limit, params.id, path);
        if (status !== "OK") return [];

        return result;
    };

    return (
        <NavbarLayoutProvider
            header={
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
                                <Dialog>
                                    <DialogTrigger render={
                                        <Button variant="navbar">
                                            {props.children}
                                        </Button>
                                    } />
                                    <DialogContent className="sm:max-w-md">
                                        <DialogHeader>
                                            <DialogTitle>Share</DialogTitle>
                                        </DialogHeader>
                                        <div className="flex flex-col">
                                            <BeautifulQRCode
                                                data={album.shareUrl}
                                                foregroundColor="#000000"
                                                backgroundColor="#ffffff"
                                                radius={0}
                                            />
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            ),
                            icon: Share2,
                        },
                    ] : []}
                    className="max-w-none"
                />
            }
        >
            <MediaWaterfall
                nextData={handleNextData}
            />
        </NavbarLayoutProvider>
    );
}
