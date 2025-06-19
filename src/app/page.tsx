"use client";

import { Main } from "@/components/main";
import {
    useState,
    useEffect,
    useRef
} from "react";
import Image from "next/image";
import {
    SiFacebook,
    SiInstagram,
} from "@icons-pack/react-simple-icons";
import Linkedin from "@/components/svg/linkedin";
import {
    IconLink,
    ButtonLink,
    Icon
} from "@/components/snippets";
import { Separator } from "@/components/ui/separator";
import { FooterLarge } from "@/components/footer";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import * as config from "@/config";

function SectionMain() {
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            imageRef.current?.classList.add("scale-120");
        });

        return () => {
            clearTimeout(timeout);
        };
    }, [imageRef]);

    return (
        <section id="main" className="relative w-full h-[calc(100vh-4rem)] p-2">
            <div className="absolute size-[calc(100%-1rem)] overflow-hidden">
                <Image
                    ref={imageRef}
                    src="/image0.png"
                    alt="Image"
                    width={1024}
                    height={684}
                    className="size-full object-cover object-center transition-all duration-10000 ease-linear"
                />
            </div>
            <div
                className="
                    absolute flex flex-col size-[calc(100%-1rem)]
                    justify-evenly items-center p-2 theme-dark
                    bg-gradient-to-b from-transparent to-black/30
                "
            >
                <div></div>
                <div className="flex flex-col justify-center items-center gap-4">
                    <h1 className="font-medium text-center">FOTO & VIDEO</h1>
                    <h2 className="font-light text-center italic text-foreground3">TIMISOARA | ARAD | ORADEA</h2>
                </div>
                <ButtonLink href="#about" variant="neutral" size="lg" className="theme-light">AFLA MAI MULTE</ButtonLink>
            </div>
        </section>
    );
}

function SectionAbout() {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        if (!api) {
            return;
        }
        
        setCurrent(api.selectedScrollSnap() + 1);
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    useEffect(() => {
        const interval = hovered || !api ? undefined : setInterval(() => {
            api.scrollNext();
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [hovered, api]);

    return (
        <section id="about" className="flex flex-col justify-center items-center gap-4 p-2">
            <h1>Cine suntem noi?</h1>
            <div className="flex flex-col justify-center items-center gap-2">
                <h4>multe</h4>
            </div>
            <h1>Cu ce ne ocupam?</h1>
            <Carousel 
                setApi={setApi}
                opts={{
                    loop: true,
                }}
                className="w-full"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <CarouselContent>
                    {
                        config.categories.map((category, index) => (
                            <CarouselItem key={index} className="md:basis-3/5">
                                <div
                                    onClick={() => api?.scrollTo(index)}
                                    className="relative w-full h-112"
                                >
                                    <Image
                                        src={category.coverImage.src}
                                        alt="Cover Image"
                                        width={category.coverImage.w}
                                        height={category.coverImage.h}
                                        className={`
                                            absolute size-full object-cover object-center
                                            transition-all duration-500 ${index != current - 1 ? "md:saturate-0 md:opacity-75 md:scale-95" : ""}
                                        `}
                                    />
                                    <div
                                        className={`
                                            absolute flex not-md:flex-col size-full
                                            justify-end items-center md:justify-between md:items-end
                                            p-4 gap-2 theme-dark bg-gradient-to-b from-transparent to-black/30
                                            transition-all duration-500 ${index != current - 1 ? "md:opacity-0" : "md:opacity-100"}
                                        `}
                                    >
                                        <h2 className="text-center">{category.name.toUpperCase()}</h2>
                                        <ButtonLink href={category.portfolioUrl} variant="neutral" className="theme-light">
                                            PORTOFOLIU
                                        </ButtonLink>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious variant="transparent" className="left-2" />
                <CarouselNext variant="transparent" className="right-2" />
            </Carousel>
        </section>
    );
}

function Member(props: { name: string, roles: string[], socials: { [key: string]: Icon } }) {
    return (
        <div className="flex flex-col w-64 md:w-96 xl:w-128 p-8 justify-center items-center gap-4">
            <div className="size-64 md:size-96 xl:size-128 bg-blue-400">

            </div>
            <div className="flex flex-col justify-center items-center gap-1">
                <h2>{props.name}</h2>
                <div className="flex flex-wrap justify-center items-center gap-2">
                    {
                        props.roles.map((role, index) => (
                            <div key={index} className="flex h-6 items-center gap-2">
                                <h4 className="text-muted-foreground">{role}</h4>
                                {
                                    index < props.roles.length - 1 && (
                                        <Separator orientation="vertical" />
                                    )
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="flex items-center justify-center gap-4">
                {
                    Object.entries(props.socials).map(([key, icon], index) => (
                        <IconLink key={index} href={key} icon={icon} />
                    ))
                }
            </div>
        </div>
    );
}

function SectionTeam() {
    return (
        <section id="team" className="flex flex-col justify-center items-center px-2 py-8">
            <h1>Cunoaste echipa</h1>
            <div className="flex flex-wrap w-full max-w-8xl justify-evenly gap-x-8">
                <Member
                    name="David"
                    roles={[
                        "videograf",
                        "fotograf",
                        "editor video"
                    ]}
                    socials={{
                        "https://www.instagram.com/davidbostina/": SiInstagram,
                        "https://www.facebook.com/david.bostina": SiFacebook,
                    }}
                />
                <Member
                    name="Mihail"
                    roles={[
                        "fotograf",
                        "editor foto",
                        "editor video"
                    ]}
                    socials={{
                        "https://www.instagram.com/musca.mihail/": SiInstagram,
                        "https://www.facebook.com/mihailmusca": SiFacebook,
                        "https://www.linkedin.com/in/muscaa/": Linkedin,
                    }}
                />
            </div>
        </section>
    );
}

export default function Page() {
    return (
        <Main
            footer={(
                <FooterLarge />
            )}
        >
            <div className="flex flex-col size-full">
                <SectionMain />
                <SectionAbout />
                <SectionTeam />
            </div>
        </Main>
    );
}
