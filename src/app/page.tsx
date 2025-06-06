"use client";

import { Main } from "@/components/main";
import {
    useState,
    useEffect
} from "react";
import Image from "next/image";
import {
    SiYoutube,
    SiFacebook,
    SiInstagram,
    SiTiktok,
    SiX,
} from "@icons-pack/react-simple-icons";
import { IconLink } from "@/components/snippets";
import { Separator } from "@/components/ui/separator";
import { FooterLarge } from "@/components/footer";

function SectionAbout() {
    return (
        <section id="about" className="flex w-full h-[calc(100vh-5rem)]">

        </section>
    );
}

function Category(props: { name: string, selected: boolean, hovered: boolean, onEnter?: () => void, onLeave?: () => void }) {
    return (
        <div
            onMouseEnter={props.onEnter}
            onMouseLeave={props.onLeave}
            className={`${props.selected ? "sm:w-[400%] not-sm:h-[400%]" : "sm:w-full not-sm:h-full"}
                sm:h-full not-sm:w-full transition-all ${props.hovered ? "ease-out" : "ease-in-out"} duration-700 overflow-hidden`}
        >
            <div
                className={`${props.selected ? "" : "blur-xs saturate-0"}
                    relative size-full transition-all ease-in-out duration-700`}
            >
                <Image src="/image0.png" alt="Image" width={1024} height={684} className="absolute size-full object-cover object-center" />
            </div>
        </div>
    );
}

function SectionCategories() {
    const [category, setCategory] = useState(0);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const interval = hovered ? undefined : setInterval(() => {
            setCategory((prev) => {
                return (prev + 1) % 4;
            });
        }, 3000);

        return () => {
            clearInterval(interval);
        };
    }, [hovered]);

    return (
        <section id="categories" className="flex not-sm:flex-col w-full h-[calc(100vh-5rem)] gap-1">
            <Category
                name="Evenimente"
                selected={category == 0}
                hovered={hovered}
                onEnter={() => {
                    setHovered(true);
                    setCategory(0);
                }}
                onLeave={() => {
                    setHovered(false);
                }}
            />
            <Category
                name="Studio"
                selected={category == 1}
                hovered={hovered}
                onEnter={() => {
                    setHovered(true);
                    setCategory(1);
                }}
                onLeave={() => {
                    setHovered(false);
                }}
            />
            <Category
                name="Automotive"
                selected={category == 2}
                hovered={hovered}
                onEnter={() => {
                    setHovered(true);
                    setCategory(2);
                }}
                onLeave={() => {
                    setHovered(false);
                }}
            />
            <Category
                name="Corporate & Commercial"
                selected={category == 3}
                hovered={hovered}
                onEnter={() => {
                    setHovered(true);
                    setCategory(3);
                }}
                onLeave={() => {
                    setHovered(false);
                }}
            />
        </section>
    );
}

function Member(props: { name: string }) {
    const roles = [
        "fotograf",
        "videograf",
        "editor foto",
        "editor video",
        "portocale",
        "mere",
        "pere"
    ];

    return (
        <div className="flex flex-col w-64 md:w-96 xl:w-128 p-8 justify-center items-center gap-4">
            <div className="size-64 md:size-96 xl:size-128 bg-blue-400">

            </div>
            <div className="flex flex-col justify-center items-center gap-1">
                <h2>{props.name}</h2>
                <div className="flex flex-wrap justify-center items-center gap-2">
                    {
                        roles.map((role, index) => (
                            <div key={index} className="flex h-6 items-center gap-2">
                                <h4 className="text-muted-foreground">{role}</h4>
                                {
                                    index < roles.length - 1 && (
                                        <Separator orientation="vertical" />
                                    )
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="flex items-center justify-center gap-4">
                <IconLink href="https://youtube.com/@VestVisuals" icon={SiYoutube} />
                <IconLink href="https://facebook.com/VestVisuals" icon={SiFacebook} />
                <IconLink href="https://instagram.com/vest.visuals" icon={SiInstagram} />
                <IconLink href="https://tiktok.com/@vest_visuals" icon={SiTiktok} />
                <IconLink href="https://x.com/VestVisual" icon={SiX} />
            </div>
        </div>
    );
}

function SectionTeam() {
    return (
        <section id="team" className="flex flex-wrap w-full max-w-8xl justify-evenly gap-x-8">
            <Member name="David" />
            <Member name="Mihail" />
        </section>
    );
}

export default function Home() {
    return (
        <Main
            footer={(
                <FooterLarge />
            )}
        >
            <div className="flex flex-col items-center justify-center size-full gap-2 p-2">
                <SectionAbout />
                <SectionCategories />
                <div className="w-full h-128 bg-green-400">

                </div>
                <SectionTeam />
            </div>
        </Main>
    );
}
