import { cn } from "@shared/shadcn/utils";
import {
    SiFacebook,
    SiInstagram,
    SiTiktok,
    SiX,
    SiYoutube,
} from "@icons-pack/react-simple-icons";
import { m } from "@shared/paraglide/messages";
import { TextH5, TextLink, TextP } from "./typography";
import { Separator } from "./ui/separator";
import { LogoLarge } from "./logo";
import { SALLink, SOLLink } from "./anpc";
import type { LinkOptions } from "@tanstack/react-router";

//
// config
//
export type FooterLink = LinkOptions & {
    name: string;
};

export interface FooterSection {
    title: string;
    links: FooterLink[];
}

export interface FooterSocial {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
}

export const footerSocials: FooterSocial[] = [
    { name: "Instagram", href: "https://instagram.com/vest.visuals", icon: SiInstagram },
    { name: "TikTok", href: "https://tiktok.com/@vest_visuals", icon: SiTiktok },
    { name: "YouTube", href: "https://youtube.com/@VestVisuals", icon: SiYoutube },
    { name: "Facebook", href: "https://facebook.com/VestVisuals", icon: SiFacebook },
    { name: "X", href: "https://x.com/VestVisual", icon: SiX },
];

const business = {
    name: "VEST VISUALS S.R.L.",
    cui: "54191210",
    address: "Str. Matei Millo 44, Timișoara, Timiș",
};

//
// parts
//
function FooterContainer(props: {
    children?: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cn("max-w-7xl w-full mx-auto px-6", props.className)}>
            {props.children}
        </div>
    );
}

function FooterBrand(props: {
    description: React.ReactNode;
    socials: FooterSocial[];
}) {
    return (
        <FooterContainer className="grid grid-cols-1 md:grid-cols-2 items-end gap-10 lg:gap-16 pt-14 pb-10">
            <div className="flex flex-col items-start gap-6">
                <LogoLarge />
                <TextP variant="muted" className="max-w-sm">
                    {props.description}
                </TextP>
            </div>
            {
                props.socials.length > 0 && (
                    <div className="flex flex-col items-start md:items-end gap-4 md:text-right">
                        <div className="flex flex-col gap-2">
                            <TextH5>{m.footer_follow_title()}</TextH5>
                            <TextP variant="muted" className="max-w-sm">
                                {m.footer_follow_description()}
                            </TextP>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            {
                                props.socials.map(({ name, href, icon: Icon }) => (
                                    <a
                                        key={name}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={m.footer_social_label({ network: name })}
                                        className="hover:text-primary transition-all"
                                    >
                                        <Icon className="size-6" />
                                    </a>
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </FooterContainer>
    );
}

function FooterLinks(props: { sections: FooterSection[] }) {
    return (
        <FooterContainer className="grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-8 py-10">
            {
                props.sections.map((section) => (
                    <div key={section.title} className="flex flex-col gap-4">
                        <TextH5>{section.title}</TextH5>
                        <ul className="flex flex-col items-start gap-2">
                            {
                                section.links.map(({ name, ...link }) => (
                                    <li key={name}>
                                        <TextLink variant="ghost" {...link}>
                                            {name}
                                        </TextLink>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                ))
            }
        </FooterContainer>
    );
}

function FooterLegal() {
    return (
        <FooterContainer className="flex flex-col md:flex-row justify-between items-center gap-8 py-8">
            <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
                <TextP size="md-4" className="font-medium">
                    {business.name}
                </TextP>
                <TextP variant="muted" size="sm-2">
                    {m.footer_company_details({ cui: business.cui, address: business.address })}
                </TextP>
                <TextP variant="muted" size="sm-2" className="mt-3">
                    {m.footer_copyright({ year: new Date().getFullYear() })}
                </TextP>
            </div>
            <div className="flex flex-wrap md:flex-col lg:flex-row justify-center items-center md:items-end gap-4">
                <SALLink />
                <SOLLink />
            </div>
        </FooterContainer>
    );
}

//
// footer
//
export interface FooterProps {
    /** Link columns. When empty or missing, the links part is not rendered. */
    sections?: FooterSection[];
    /** Text under the logo. */
    description?: React.ReactNode;
    /** Social icons next to the logo & description. Pass `[]` to hide them. */
    socials?: FooterSocial[];
    className?: string;
}

export function Footer({
    sections = [],
    description,
    socials = footerSocials,
    className,
}: FooterProps) {
    const hasLinks = sections.some((section) => section.links.length > 0);

    return (
        <footer className={cn("flex flex-col bg-muted", className)}>
            <FooterBrand description={description ?? m.footer_default_description()} socials={socials} />
            {
                hasLinks && (
                    <>
                        <Separator />
                        <FooterLinks
                            sections={sections.filter(
                                (section) => section.links.length > 0,
                            )}
                        />
                    </>
                )
            }
            <Separator />
            <FooterLegal />
        </footer>
    );
}
