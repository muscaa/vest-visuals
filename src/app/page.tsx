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
import * as config from "@/config/public";
import { Reveal } from "@/components/animations/reveal";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ParallaxLayers } from "@/components/parallax";
import { IconProps } from "@/components/snippets";
import { TextLink } from "@/components/ui/text-link";
import { useSearchParams } from "next/navigation";

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
                <Reveal direction="none" className="size-full">
                    <Image
                        ref={imageRef}
                        src="/image0.png"
                        alt="Image"
                        width={1024}
                        height={684}
                        className="size-full object-cover object-center transition-all duration-10000 ease-linear"
                    />
                </Reveal>
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
                    <Reveal delay={500} duration={1000}>
                        <h1 className="font-medium text-center">FOTO & VIDEO</h1>
                    </Reveal>
                    <Reveal delay={800} duration={1000} direction="left">
                        <h2 className="font-light text-center italic text-foreground32">TIMISOARA | ARAD | ORADEA</h2>
                    </Reveal>
                </div>
                <Reveal delay={1800} duration={1000} direction="up">
                    <ButtonLink href="#about" variant="neutral" size="lg" className="theme-light">AFLA MAI MULTE</ButtonLink>
                </Reveal>
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
            <Reveal delay={200}>
                <h1>Cine suntem noi?</h1>
            </Reveal>
            <div className="flex flex-col justify-center items-center gap-2">
                <Reveal delay={400}>
                    <h4>oameni</h4>
                </Reveal>
            </div>
            <Reveal delay={600}>
                <h1>Cu ce ne ocupam?</h1>
            </Reveal>
            <Reveal delay={800} duration={1000} direction="none" className="w-full">
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
                                            alt={category.coverImage.alt}
                                            width={category.coverImage.w}
                                            height={category.coverImage.h}
                                            className={`
                                                absolute size-full object-cover object-center
                                                transition-all duration-500
                                                ${index != current - 1 ? "md:saturate-0 md:opacity-75 md:contrast-50 md:scale-95" : ""}
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
                                            <h2 className="not-md:text-center">{category.name.toUpperCase()}</h2>
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
            </Reveal>
        </section>
    );
}

function Member(props: { name: string, roles: string[], email: string, socials: { [key: string]: Icon } }) {
    return (
        <div className="flex flex-col w-64 md:w-96 xl:w-128 p-8 justify-center items-center gap-4">
            <Reveal duration={1000}>
                <div className="size-64 md:size-96 xl:size-128 bg-blue-400">

                </div>
            </Reveal>
            <div className="flex flex-col justify-center items-center gap-1">
                <Reveal delay={300}>
                    <h2>{props.name}</h2>
                </Reveal>
                <Reveal delay={500}>
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
                </Reveal>
                <Reveal delay={700}>
                    <TextLink href={`mailto:${props.email}`} className="h4">
                        {props.email}
                    </TextLink>
                </Reveal>
            </div>
            <Reveal delay={900}>
                <div className="flex items-center justify-center gap-4">
                    {
                        Object.entries(props.socials).map(([key, icon], index) => (
                            <IconLink key={index} href={key} icon={icon} />
                        ))
                    }
                </div>
            </Reveal>
        </div>
    );
}

function SectionTeam() {
    return (
        <section id="team" className="flex flex-col justify-center items-center px-2 py-8">
            <Reveal delay={200}>
                <h1>Cunoaste echipa</h1>
            </Reveal>
            <div className="flex flex-wrap w-full max-w-8xl justify-evenly gap-x-8">
                <Member
                    name="David"
                    roles={[
                        "videograf",
                        "fotograf",
                        "editor video"
                    ]}
                    email="david@vestvisuals.ro"
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
                    email="mihail@vestvisuals.ro"
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

function ImageBackground(props: IconProps) {
    return (
        <Image
            src="/background.png"
            alt="Background"
            width={6000}
            height={4000}
            className={props.className}
        />
    );
}

function ImageCar(props: IconProps) {
    return (
        <Image
            src="/car.png"
            alt="Car"
            width={6000}
            height={4000}
            className={props.className}
        />
    );
}

export default function Page() {
    const searchParams = useSearchParams();
    const [more, setMore] = useState(searchParams.has("more"));

    return (
        <div className={`fixed w-screen h-screen transition-all duration-500 ${more ? "-top-[100vh]" : "top-0"}`}>
            <Main
                footer={(
                    <FooterLarge />
                )}
                header={(
                    <>
                        <div className="relative min-h-screen w-screen h-screen">
                            <ParallaxLayers
                                interact={true}
                                options={{
                                    yFactor: 0,
                                }}
                                layers={[
                                    {
                                        icon: ImageBackground,
                                        offset: 15,
                                        width: 6000,
                                        height: 4000,
                                        scale: 105,
                                    },
                                    {
                                        icon: ImageCar,
                                        offset: 25,
                                        width: 6000,
                                        height: 4000,
                                        scale: 105,
                                    },
                                ]}
                            />
                            <div
                                className="
                                    absolute flex flex-col size-[calc(100%-1rem)]
                                    justify-evenly items-center p-2 theme-dark
                                    bg-gradient-to-b from-transparent to-black/30
                                "
                            >
                                <div className="flex flex-col justify-center items-center gap-4">
                                    <Reveal delay={500} duration={1000}>
                                        <h1 className="font-medium text-center">FOTO & VIDEO</h1>
                                    </Reveal>
                                    <Reveal delay={800} duration={1000} direction="left">
                                        <h2 className="font-light text-center italic text-foreground32">TIMISOARA | ARAD | ORADEA</h2>
                                    </Reveal>
                                </div>
                                <Reveal delay={1800} duration={1000} direction="up">
                                    <ButtonLink
                                    href="/?more"
                                        variant="neutral"
                                        size="lg"
                                        className="theme-light"
                                        onClick={() => setMore(true)}
                                    >
                                        AFLA MAI MULTE
                                    </ButtonLink>
                                </Reveal>
                            </div>
                        </div>
                        <Navbar />
                    </>
                )}
                className="min-h-[calc(100%-4rem)] max-h-[calc(100%-4rem)] h-[calc(100%-4rem)]"
            >
                <div className="flex flex-col">
                    {/*<SectionMain />*/}
                    <SectionAbout />
                    <SectionTeam />
                </div>
            </Main>
        </div>
    );
}
