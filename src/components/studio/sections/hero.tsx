"use client";

import {
    Image,
    Img,
} from "@/components/img";
import { TextH1, TextP, TextSpan } from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselCounter,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    useCarousel,
} from "@/components/ui/carousel";
import { useEffect } from "react";

function CarouselOverlay() {
    const { api, at, max } = useCarousel();

    useEffect(() => {
        if (!api) return;

        const interval = setInterval(api.scrollNext, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [api, at, max]);

    return (
        <div className="flex flex-col items-center px-6 py-16 min-h-screen-no-nav pointer-events-none theme-dark bg-linear-to-b from-transparent to-black/50">
            <div className="flex flex-col justify-between gap-8 max-w-8xl w-full grow">
                <div />
                <TextH1 size="hero">
                    Surprindem <i className="text-success">emoții,</i>
                    <br />
                    nu doar <i className="text-primary">imagini.</i>
                </TextH1>
                <div />
                <TextP size="lead" className="max-w-[60ch] text-pretty">
                    Fotografie și videografie pentru nunți, majorate, portrete, automotive, imobiliare și brand content — în Timișoara și pe oriunde ne cheamă povestea.
                </TextP>
                <div className="flex not-xs:flex-col gap-4 pointer-events-auto">
                    <Button variant="white" size="lg">
                        Vezi portofoliul
                    </Button>
                    <Button variant="outline" size="lg">
                        Incepe un proiect
                    </Button>
                </div>
                <div className="flex not-sm:flex-col sm:justify-between gap-4">
                    <div className="flex gap-4">
                        {
                            [
                                {
                                    stat: "3+",
                                    desc: "Ani experienta",
                                },
                                {
                                    stat: "160+",
                                    desc: "Proiecte livrate",
                                },
                                {
                                    stat: "5",
                                    desc: "Categorii foto-video",
                                },
                            ].map((value, index) => (
                                <div key={index} className="flex flex-col gap-1">
                                    <TextSpan size="h2" font="mono1">
                                        {value.stat}
                                    </TextSpan>
                                    <TextSpan size="label" font="mono1">
                                        {value.desc}
                                    </TextSpan>
                                </div>
                            ))
                        }
                    </div>
                    <div className="flex justify-center items-center gap-2 pointer-events-auto">
                        <CarouselPrevious
                            variant="transparent"
                            className="relative inset-0 translate-y-0"
                        />
                        <CarouselCounter />
                        <CarouselNext
                            variant="transparent"
                            className="relative inset-0 translate-y-0"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

interface Props {

}

export function StudioHeroSection(props: Props) {
    const images: Image[] = [
        {
            src: "https://cdn0.vestvisuals.ro/portfolio/yu9eomg0ef4f66u2gpbqws4t/large", // majorate
            alt: "",
        },
        {
            src: "https://cdn0.vestvisuals.ro/portfolio/yio20oo5vxfs18cxm925k3fy/large", // majorate
            alt: "",
        },
        {
            src: "https://cdn0.vestvisuals.ro/portfolio/x7nxyoz3hwdezu4tr33kb4gw/large", // majorate
            alt: "",
        },
        {
            src: "https://cdn0.vestvisuals.ro/portfolio/dozugwupvkafsmnpxtsc55f7/large", // majorate
            alt: "",
        },
        {
            src: "https://cdn0.vestvisuals.ro/portfolio/a8rm9fhczl4px321ladxwrft/large", // outdoor
            alt: "",
        },
        // {
        //     src: "https://s3.vestvisuals.ro/portfolio/zz9zwk8shj6zvb0esbwq3z0q/large", // automotive
        //     alt: "",
        // },
        // {
        //     src: "https://s3.vestvisuals.ro/portfolio/y4g068yl6ce1o3bspivi5r5p/large", // real estate
        //     alt: "",
        // },
        // {
        //     src: "https://s3.vestvisuals.ro/portfolio/z42sd0lf54pzm9abaomt9ybb/large", // marketing
        //     alt: "",
        // },
    ];

    return (
        <section id="hero" className="relative flex w-full">
            <Carousel
                opts={{
                    loop: true,
                }}
                className="size-full"
            >
                <CarouselOverlay />
                <CarouselContent extraClassName="absolute inset-0 -z-10" className="m-0">
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
            </Carousel>
        </section>
    );
}
