import { IconChevronsUp } from "@tabler/icons-react";
import { Button } from "./ui/button";
import { TextH4, TextLink } from "./typography";
import { Link, LinkOptions } from "@tanstack/react-router";
import { SiFacebook, SiGithub, SiInstagram, SiTiktok, SiX, SiYoutube } from "@icons-pack/react-simple-icons";
import { LogoLarge } from "./logo";
import { SALLink, SOLLink } from "./anpc";

interface FooterBigProps {
    sections: {
        title: string;
        links: (LinkOptions & {
            name: string;
        })[];
    }[];
}

function FooterBig(props: FooterBigProps) {
    const pj = [
        "VEST VISUALS S.R.L.",
        "CUI 54191210",
        "TIMIS, TIMISOARA",
        "Str. Matei Millo 44",
    ];

    return (
        <div className="flex justify-center items-center bg-muted">
            <div className="flex flex-wrap-reverse justify-evenly max-w-7xl w-full px-4 py-16 gap-12">
                <div
                    className="
                            flex flex-wrap gap-6
                            not-lg:w-full not-lg:justify-center not-lg:items-center
                            lg:flex-col lg:mr-auto
                        "
                >
                    <LogoLarge />
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
                    props.sections.map((section) => (
                        <div key={section.title} className="flex flex-col gap-6 max-w-48 w-full">
                            <TextH4 font="mono-1">{section.title}</TextH4>
                            <div className="flex flex-col items-start gap-1">
                                {
                                    section.links.map(({ name, ...link }) => (
                                        <TextLink
                                            key={name}
                                            variant="ghost"
                                            {...link}
                                        >
                                            {name}
                                        </TextLink>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

interface FooterSmallProps {

}

function FooterSmall(props: FooterSmallProps) {
    return (
        <div className="flex justify-center items-center bg-secondary">
            <div className="grid grid-cols-1 sm:grid-cols-2 justify-center items-center max-w-7xl w-full px-4 py-8 gap-6">
                <div className="flex items-center justify-center sm:justify-start gap-4">
                    {
                        ([
                            ["https://youtube.com/@VestVisuals", SiYoutube],
                            ["https://facebook.com/VestVisuals", SiFacebook],
                            ["https://instagram.com/vest.visuals", SiInstagram],
                            ["https://tiktok.com/@vest_visuals", SiTiktok],
                            ["https://x.com/VestVisual", SiX],
                        ] as const).map(([link, Icon]) => (
                            // @ts-expect-error
                            <Link href={link} target="_blank" className="hover:text-primary transition-all">
                                <Icon className="size-6" />
                            </Link>
                        ))
                    }
                </div>
                <div className="flex flex-col items-center sm:items-end text-center sm:text-end">
                    <p>Copyright © {new Date().getFullYear()} Vest Visuals | All rights reserved</p>
                    <p>
                        Made by <TextLink href="https://github.com/muscaa" target="_blank" className="inline-flex items-baseline gap-1">
                            <SiGithub className="size-4 translate-y-1" />
                            muscaa
                        </TextLink> ❤️
                    </p>
                </div>
            </div>
        </div>
    );
}

type FooterProps = Partial<FooterBigProps> & FooterSmallProps;

export function Footer(props: FooterProps) {
    return (
        <footer className="relative flex flex-col mt-4.5">
            {
                props.sections && (
                    <FooterBig
                        sections={props.sections}
                    />
                )
            }
            <FooterSmall {...props} />
            <div className="absolute flex justify-center items-center w-full -translate-y-4.5">
                <Button
                    variant="default"
                    size="icon-lg"
                    onClick={() => undefined/*ref?.current?.scrollTo(0, 0)*/}
                >
                    <IconChevronsUp className="size-6" />
                </Button>
            </div>
        </footer>
    );
}
