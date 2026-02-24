"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";
import { MediaWaterfall } from "@/components/media/media-waterfall";
import { getPaginated } from "@/actions/albums";
import { NavbarLayoutProvider } from "@/components/layout/providers/navbar";
import { Navbar } from "@/components/navbar";
import { Download, Share2 } from "lucide-react";

export default function Page() {
    const params = useParams<{ id: string; path?: string[]; }>();
    const path = useMemo(() => params.path?.map(decodeURIComponent), [params.path]);

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
                    links={[
                        {
                            type: "endpoint",
                            title: "DOWNLOAD",
                            onClick: () => { console.log("ceva 1"); },
                            icon: Download,
                        },
                        {
                            type: "endpoint",
                            title: "SHARE",
                            onClick: () => { console.log("ceva 2"); },
                            icon: Share2,
                        },
                    ]}
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
