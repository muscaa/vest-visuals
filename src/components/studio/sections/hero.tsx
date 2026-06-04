"use client";

import {
    Image,
    Img,
} from "@/components/img";
import { TextH1, TextP } from "@/components/typography";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    useCarousel,
} from "@/components/ui/carousel";
import {
    useEffect,
    useState,
} from "react";

function CarouselControls() {
    const { api } = useCarousel();
    const [at, setAt] = useState(0);
    const [max, setMax] = useState(0);

    useEffect(() => {
        if (!api) return;

        const onSelect = (api: CarouselApi) => {
            if (!api) return;

            setAt(Math.min(api.selectedScrollSnap() + 1, api.slideNodes().length));
            setMax(api.slideNodes().length);
        };

        onSelect(api);
        api.on("reInit", onSelect);
        api.on("select", onSelect);

        const interval = setInterval(api.scrollNext, 5000);

        return () => {
            api.off("select", onSelect);
            clearInterval(interval);
        };
    }, [api]);

    return (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 theme-dark">
            <CarouselPrevious
                variant="transparent"
                className="relative inset-0 translate-y-0"
            />
            <span className="tabular-nums text-shadow-lg">{String(at).padStart(String(max).length, "0")}/{max}</span>
            <CarouselNext
                variant="transparent"
                className="relative inset-0 translate-y-0"
            />
        </div>
    );
}

interface Props {

}

export function StudioHeroSection(props: Props) {
    const images: Image[] = [
        {
            src: "https://cdn0.vestvisuals.ro/portfolio/yu9eomg0ef4f66u2gpbqws4t/large",
            alt: "",
        },
        {
            src: "https://cdn0.vestvisuals.ro/portfolio/yu9eomg0ef4f66u2gpbqws4t/large",
            alt: "",
        },
        {
            src: "https://cdn0.vestvisuals.ro/portfolio/yu9eomg0ef4f66u2gpbqws4t/large",
            alt: "",
        },
    ];

    return (
        <section id="hero" className="relative flex w-full h-screen-no-nav">
            <Carousel
                opts={{
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent className="m-0">
                    {
                        images.map((image, index) => (
                            <CarouselItem key={index} className="p-0">
                                <Img
                                    className="size-full object-cover"
                                    {...image}
                                />
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselControls />
            </Carousel>
            <div className="absolute size-full flex flex-col justify-center items-center px-6 py-16 pointer-events-none theme-dark">
                <div className="flex flex-col max-w-7xl w-full text-shadow-lg text-shadow-black/50">
                    <TextH1 size="display">
                        Surprindem emoții,
                        <br />
                        nu doar imagini.
                    </TextH1>
                    <TextP variant="muted" size="lead" className="max-w-[60ch] text-pretty">
                        Fotografie și videografie pentru nunți, majorate, portrete, automotive, imobiliare și brand content — în Timișoara și pe oriunde ne cheamă povestea.
                    </TextP>
                </div>
                {/* <div></div>
                <div className="flex flex-col justify-center items-center gap-8 text-center text-shadow-lg text-shadow-black/30">
                    <h1 className="font-mono h0">{props.title}</h1>
                    <p className="p4">{props.description}</p>
                </div>
                <div></div>
                {
                    props.portfolioHref && (
                        <ButtonLink
                            href={props.portfolioHref}
                            variant="secondary"
                            size="lg"
                            className="pointer-events-auto theme-light"
                        >
                            VEZI PORTOFOLIUL COMPLET
                        </ButtonLink>
                    )
                } */}
            </div>
        </section>
    );
}
