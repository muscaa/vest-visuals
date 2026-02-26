"use client";

import {
    SiYoutube,
    SiFacebook,
    SiInstagram,
    SiTiktok,
    SiX,
    SiGithub,
} from "@icons-pack/react-simple-icons";
import {
    IconLink,
    ButtonLink
} from "@/components/snippets";
import { TextLink } from "@/components/ui/text-link";
import {
    ChevronsUp
} from "lucide-react";
import {
    CONTACT,
    COOKIE_POLICY,
    LOCATIONS_ARAD,
    LOCATIONS_CLUJ_NAPOCA,
    LOCATIONS_ORADEA,
    LOCATIONS_TIMISOARA,
    LOCATIONS_DROBETA_TURNU_SEVERIN,
    PRIVACY_POLICY,
    TERMS_OF_SERVICE,
    LOCATIONS_BUCURESTI,
} from "@shared/i18n";
import { Button } from "./ui/button";
import { useMain } from "@/hooks/useMain";

function FooterBase() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 justify-center items-center max-w-5xl w-full px-4 py-8 gap-6">
            <div className="flex items-center justify-center sm:justify-start gap-4">
                <IconLink href="https://youtube.com/@VestVisuals" icon={SiYoutube} />
                <IconLink href="https://facebook.com/VestVisuals" icon={SiFacebook} />
                <IconLink href="https://instagram.com/vest.visuals" icon={SiInstagram} />
                <IconLink href="https://tiktok.com/@vest_visuals" icon={SiTiktok} />
                <IconLink href="https://x.com/VestVisual" icon={SiX} />
            </div>
            <div className="flex flex-col items-center sm:items-end text-center">
                <p>© {new Date().getFullYear()} Vest Visuals | All rights reserved</p>
                <p>
                    Made by <TextLink href="https://github.com/muscaa" target="_blank" className="inline-flex items-baseline gap-1">
                        <SiGithub size={16} className="size-4 translate-y-1" />
                        muscaa
                    </TextLink> ❤️
                </p>
            </div>
        </div>
    );
}

export function Footer() {
    return (
        <footer className="flex justify-center items-center bg-background2">
            <FooterBase />
        </footer>
    );
}

export function FooterLarge() {
    const { ref } = useMain();

    const locations = [
        { name: "Timisoara", href: LOCATIONS_TIMISOARA() },
        { name: "Arad", href: LOCATIONS_ARAD() },
        { name: "Oradea", href: LOCATIONS_ORADEA() },
        { name: "Drobeta-Turnu Severin", href: LOCATIONS_DROBETA_TURNU_SEVERIN() },
        { name: "Cluj-Napoca", href: LOCATIONS_CLUJ_NAPOCA() },
        { name: "Bucuresti", href: LOCATIONS_BUCURESTI() },
    ];

    const pages = [
        { name: "Termeni si conditii", href: TERMS_OF_SERVICE() },
        { name: "Politica de confidentialitate", href: PRIVACY_POLICY() },
        { name: "Politica de cookie-uri", href: COOKIE_POLICY() },
    ];

    return (
        <footer className="flex flex-col relative mt-4.5">
            <div className="flex justify-center items-center bg-background2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center max-w-5xl w-full px-4 py-16 gap-12">
                    <div className="flex flex-col text-center lg:text-start gap-6">
                        <h4 className="font-medium">PAGINI UTILE</h4>
                        <div className="flex flex-col items-center lg:items-start gap-1">
                            {
                                pages.map((page, index) => (
                                    <TextLink key={index} href={page.href} variant="ghost">
                                        {page.name}
                                    </TextLink>
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex flex-col text-center gap-6">
                        <h4 className="font-medium">LOCATII</h4>
                        <div className="flex flex-col items-center gap-1">
                            {
                                locations.map((location, index) => (
                                    <TextLink key={index} href={location.href} variant="ghost">
                                        {location.name}
                                    </TextLink>
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex flex-col text-center lg:text-end gap-6 sm:col-span-2 sm:justify-self-center lg:col-span-1 lg:justify-self-auto">
                        <h4 className="font-medium">CONTACTEAZA-NE</h4>
                        <div className="flex flex-col items-center lg:items-end gap-4">
                            <p className="text-muted-foreground flex-wrap max-w-80">
                                Iti raspundem intrebarilor legate de serviciile oferite de noi.
                            </p>
                            <div className="flex gap-4">
                                <ButtonLink href={CONTACT()}>CONTACT</ButtonLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center bg-background3">
                <FooterBase />
            </div>
            <div className="absolute flex justify-center items-center w-full -translate-y-4.5">
                <Button variant="default" size="icon" onClick={() => ref?.current?.scrollTo(0, 0)}>
                    <ChevronsUp className="size-8" />
                </Button>
            </div>
        </footer>
    );
}
