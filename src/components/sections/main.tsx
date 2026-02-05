"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { FooterLarge } from "../footer";
import { SectionParallax } from "./parallax";
import { SectionAbout } from "./about";
import { SectionCarousel } from "./carousel";
import { SectionTeam } from "./team";
import { NavbarLayoutProvider } from "../layout/providers/navbar";

interface SectionsMainProps {

}

export function SectionsMain(props: SectionsMainProps) {
    const searchParams = useSearchParams();
    const [more, setMore] = useState(searchParams.has("more"));

    return (
        <div className={`fixed w-screen h-screen transition-all duration-500 ${more ? "-top-[100vh]" : "top-0"}`}>
            {/* <NavbarLayoutProvider
                footer={(
                    <FooterLarge />
                )}
                header={(
                    <SectionParallax
                        setMore={setMore}
                    />
                )}
                className="min-h-[calc(100%-4rem)] max-h-[calc(100%-4rem)] h-[calc(100%-4rem)]"
            >
                <div className="flex flex-col">
                    <section id="start"></section>
                    <SectionCarousel />
                    <SectionAbout />
                    <SectionTeam />
                </div>
            </NavbarLayoutProvider> */}
        </div>
    );
}
