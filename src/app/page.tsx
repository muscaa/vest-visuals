"use client";

import { Main } from "@/components/main";
import {
    useState,
    Suspense,
} from "react";
import { FooterLarge } from "@/components/footer";
import { useSearchParams } from "next/navigation";
import { SectionParallaxHeader } from "@/components/sections/parallax-header";
import { SectionAbout } from "@/components/sections/about";
import { SectionCarousel } from "@/components/sections/carousel";
import { SectionTeam } from "@/components/sections/team";

function SuspensePage() {
    const searchParams = useSearchParams();
    const [more, setMore] = useState(searchParams.has("more"));

    return (
        <div className={`fixed w-screen h-screen transition-all duration-500 ${more ? "-top-[100vh]" : "top-0"}`}>
            <Main
                footer={(
                    <FooterLarge />
                )}
                header={<SectionParallaxHeader setMore={setMore} />}
                className="min-h-[calc(100%-4rem)] max-h-[calc(100%-4rem)] h-[calc(100%-4rem)]"
            >
                <div className="flex flex-col">
                    <section id="start"></section>
                    <SectionCarousel />
                    <SectionAbout />
                    <SectionTeam />
                </div>
            </Main>
        </div>
    );
}

export default function Page() {
    return (
        <Suspense>
            <SuspensePage />
        </Suspense>
    );
}
