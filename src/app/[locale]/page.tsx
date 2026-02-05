"use client";

import { NavbarLayout } from "@/components/layout";
import { SectionAbout } from "@/components/sections/about";
import { SectionCarousel } from "@/components/sections/carousel";
import { SectionTeam } from "@/components/sections/team";

export default function Page() {
    return (
        <NavbarLayout>
            <div className="flex flex-col justify-center items-center min-h-screen-no-nav">
                {/* <SectionPreview {...props.preview} />
                <SectionPrice {...props.price} />
                <Separator />
                <SectionFAQ {...props.faq} /> */}
                <SectionCarousel />
                <SectionAbout /> 
                <SectionTeam />
            </div>
        </NavbarLayout>
    );
}
