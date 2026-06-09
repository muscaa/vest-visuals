"use client";

import { useMain } from "@/hooks/useMain";
import { Button } from "./ui/button";
import { ChevronsUp } from "lucide-react";
import { IconLink } from "./snippets";
import {
    SiFacebook,
    SiGithub,
    SiInstagram,
    SiTiktok,
    SiX,
    SiYoutube,
} from "@icons-pack/react-simple-icons";
import { TextH4, TextLink } from "./typography";
import { LogoLargeLink } from "./logo";
import { SALLink, SOLLink } from "./anpc";
import { Pathname } from "@shared/i18n";

// import {
//     SiYoutube,
//     SiFacebook,
//     SiInstagram,
//     SiTiktok,
//     SiX,
//     SiGithub,
// } from "@icons-pack/react-simple-icons";
// import {
//     IconLink,
//     ButtonLink
// } from "@/components/snippets";
// import {
//     ChevronsUp
// } from "lucide-react";
// import {
//     CONTACT,
//     COOKIE_POLICY,
//     LOCATIONS_ARAD,
//     LOCATIONS_CLUJ_NAPOCA,
//     LOCATIONS_ORADEA,
//     LOCATIONS_TIMISOARA,
//     LOCATIONS_DROBETA_TURNU_SEVERIN,
//     PRIVACY_POLICY,
//     TERMS_OF_SERVICE,
//     LOCATIONS_BUCURESTI,
// } from "@shared/i18n";
// import { Button } from "./ui/button";
// import { useMain } from "@/hooks/useMain";
// import { LogoLargeLink } from "./logo";
// import { cn } from "@shared/shadcn/lib/utils";
// import { SALLink, SOLLink } from "./anpc";
// import { TextLink } from "./typography";

// export function FooterBase() {
//     return (
//         <div className="grid grid-cols-1 sm:grid-cols-2 justify-center items-center max-w-5xl w-full px-4 py-8 gap-6">
//             <div className="flex items-center justify-center sm:justify-start gap-4">
//                 <IconLink href="https://youtube.com/@VestVisuals" icon={SiYoutube} />
//                 <IconLink href="https://facebook.com/VestVisuals" icon={SiFacebook} />
//                 <IconLink href="https://instagram.com/vest.visuals" icon={SiInstagram} />
//                 <IconLink href="https://tiktok.com/@vest_visuals" icon={SiTiktok} />
//                 <IconLink href="https://x.com/VestVisual" icon={SiX} />
//             </div>
//             <div className="flex flex-col items-center sm:items-end text-center sm:text-end">
//                 <p>Copyright © {new Date().getFullYear()} Vest Visuals | All rights reserved</p>
//                 <p>
//                     Made by <TextLink href="https://github.com/muscaa" target="_blank" className="inline-flex items-baseline gap-1">
//                         <SiGithub size={16} className="size-4 translate-y-1" />
//                         muscaa
//                     </TextLink> ❤️
//                 </p>
//             </div>
//         </div>
//     );
// }

// export function FooterSmall() {
//     const { ref } = useMain();

//     return (
//         <footer className="relative flex flex-col mt-4.5">
//             <div className="flex justify-center items-center bg-background2">
//                 <FooterBase />
//             </div>
//             <div className="absolute flex justify-center items-center w-full -translate-y-4.5">
//                 <Button variant="default" size="icon" onClick={() => ref?.current?.scrollTo(0, 0)}>
//                     <ChevronsUp className="size-8" />
//                 </Button>
//             </div>
//         </footer>
//     );
// }

// interface FooterSectionProps {
//     header?: React.ReactNode;
//     title?: string;
//     className?: string;
//     extraClassName?: string;
//     children?: React.ReactNode;
// }

// function FooterSection(props: FooterSectionProps) {
//     return (
//         <div className={cn("flex flex-col gap-6 max-w-48 w-full", props.className)}>
//             {
//                 props.header ?? (
//                     <h4 className="font-mono">{props.title}</h4>
//                 )
//             }
//             <div className={cn("flex flex-col items-start gap-1", props.extraClassName)}>
//                 {props.children}
//             </div>
//         </div>
//     );
// }

// export function FooterLarge() {
//     const { ref } = useMain();

//     const pj = [
//         "VEST VISUALS S.R.L.",
//         "CUI 54191210",
//         "TIMIS, TIMISOARA",
//         "Str. Matei Millo 44",
//     ];

//     const locations = [
//         { name: "Timisoara", href: LOCATIONS_TIMISOARA() },
//         { name: "Arad", href: LOCATIONS_ARAD() },
//         { name: "Oradea", href: LOCATIONS_ORADEA() },
//         { name: "Drobeta-Turnu Severin", href: LOCATIONS_DROBETA_TURNU_SEVERIN() },
//         { name: "Cluj-Napoca", href: LOCATIONS_CLUJ_NAPOCA() },
//         { name: "Bucuresti", href: LOCATIONS_BUCURESTI() },
//     ];

//     const pages = [
//         { name: "Termeni si conditii", href: TERMS_OF_SERVICE() },
//         { name: "Politica de confidentialitate", href: PRIVACY_POLICY() },
//         { name: "Politica de cookie-uri", href: COOKIE_POLICY() },
//     ];

//     return (
//         <footer className="relative flex flex-col mt-4.5">
//             <div className="flex justify-center items-center bg-background2">
//                 <div className="flex flex-wrap-reverse justify-evenly max-w-6xl w-full px-4 py-16 gap-12">
//                     <div
//                         className="
//                             flex flex-wrap gap-6
//                             not-lg:w-full not-lg:justify-center not-lg:items-center
//                             lg:flex-col lg:mr-auto
//                         "
//                     >
//                         <LogoLargeLink />
//                         <div className="flex flex-col">
//                             {
//                                 pj.map((info, index) => (
//                                     <p key={index}>{info}</p>
//                                 ))
//                             }
//                         </div>
//                         <div className="flex flex-col gap-1">
//                             <SALLink />
//                             <SOLLink />
//                         </div>
//                     </div>
//                     <FooterSection
//                         title="PAGINI UTILE"
//                     >
//                         {
//                             pages.map((page, index) => (
//                                 <TextLink key={index} href={page.href} variant="ghost">
//                                     {page.name}
//                                 </TextLink>
//                             ))
//                         }
//                     </FooterSection>
//                     <FooterSection
//                         title="LOCATII"
//                     >
//                         {
//                             locations.map((location, index) => (
//                                 <TextLink key={index} href={location.href} variant="ghost">
//                                     {location.name}
//                                 </TextLink>
//                             ))
//                         }
//                     </FooterSection>
//                     <FooterSection
//                         title="CONTACTEAZA-NE"
//                         className="xs:max-md:max-w-full xs:max-md:w-auto"
//                     >
//                         <p>
//                             Iti raspundem intrebarilor legate de serviciile oferite de noi.
//                         </p>
//                         <ButtonLink href={CONTACT()} className="mt-4">CONTACT</ButtonLink>
//                     </FooterSection>
//                 </div>
//             </div>
//             <div className="flex justify-center items-center bg-background3">
//                 <FooterBase />
//             </div>
//             <div className="absolute flex justify-center items-center w-full -translate-y-4.5">
//                 <Button variant="default" size="icon" onClick={() => ref?.current?.scrollTo(0, 0)}>
//                     <ChevronsUp className="size-8" />
//                 </Button>
//             </div>
//         </footer>
//     );
// }

interface Props {
    sections: {
        title: string;
        links: {
            name: string;
            to: Pathname;
        }[];
    }[];
}

export function Footer(props: Props) {
    const { ref } = useMain();

    const pj = [
        "VEST VISUALS S.R.L.",
        "CUI 54191210",
        "TIMIS, TIMISOARA",
        "Str. Matei Millo 44",
    ];

    return (
        <footer className="relative flex flex-col mt-4.5">
            <div className="flex justify-center items-center bg-muted">
                <div className="flex flex-wrap-reverse justify-evenly max-w-7xl w-full px-4 py-16 gap-12">
                    <div
                        className="
                            flex flex-wrap gap-6
                            not-lg:w-full not-lg:justify-center not-lg:items-center
                            lg:flex-col lg:mr-auto
                        "
                    >
                        <LogoLargeLink />
                        <div className="flex flex-col">
                            {
                                pj.map((info, index) => (
                                    <p key={index}>{info}</p>
                                ))
                            }
                        </div>
                        <div className="flex flex-col gap-1">
                            <SALLink />
                            <SOLLink />
                        </div>
                    </div>
                    {
                        props.sections.map((section, index) => (
                            <div key={index} className="flex flex-col gap-6 max-w-48 w-full">
                                <TextH4 font="mono1">{section.title}</TextH4>
                                <div className="flex flex-col items-start gap-1">
                                    {
                                        section.links.map((link, index) => (
                                            <TextLink key={index} to={link.to} variant="ghost">
                                                {link.name}
                                            </TextLink>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="flex justify-center items-center bg-secondary">
                <div className="grid grid-cols-1 sm:grid-cols-2 justify-center items-center max-w-7xl w-full px-4 py-8 gap-6">
                    <div className="flex items-center justify-center sm:justify-start gap-4">
                        <IconLink href="https://youtube.com/@VestVisuals" icon={SiYoutube} />
                        <IconLink href="https://facebook.com/VestVisuals" icon={SiFacebook} />
                        <IconLink href="https://instagram.com/vest.visuals" icon={SiInstagram} />
                        <IconLink href="https://tiktok.com/@vest_visuals" icon={SiTiktok} />
                        <IconLink href="https://x.com/VestVisual" icon={SiX} />
                    </div>
                    <div className="flex flex-col items-center sm:items-end text-center sm:text-end">
                        <p>Copyright © {new Date().getFullYear()} Vest Visuals | All rights reserved</p>
                        <p>
                            Made by <TextLink href="https://github.com/muscaa" target="_blank" className="inline-flex items-baseline gap-1">
                                <SiGithub size={16} className="size-4 translate-y-1" />
                                muscaa
                            </TextLink> ❤️
                        </p>
                    </div>
                </div>
            </div>
            <div className="absolute flex justify-center items-center w-full -translate-y-4.5">
                <Button variant="default" size="icon" onClick={() => ref?.current?.scrollTo(0, 0)}>
                    <ChevronsUp className="size-8" />
                </Button>
            </div>
        </footer>
    );
}
