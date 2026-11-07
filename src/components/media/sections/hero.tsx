import { m } from "@shared/paraglide/messages";
import { asset } from "@shared/assets";
import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import type { AssetKey } from "@shared/assets";
import { Img } from "@/components/img";
import { TextH1, TextP } from "@/components/typography";
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
import { Rich } from "@/components/rich";

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
            <div className="flex flex-col justify-between gap-8 max-w-7xl w-full grow">
                <div />
                <TextH1 size="lg-1">
                    <Rich message={m.media_hero_title} />
                </TextH1>
                <div className="flex flex-col gap-8">
                    <TextP size="md-3" className="max-w-[60ch] text-pretty">
                        {m.media_hero_description()}
                    </TextP>
                    {/* the carousel's controls on the buttons' row, so it all fits on the first screen */}
                    <div className="flex flex-wrap justify-between items-end gap-4">
                        <div className="flex not-xs:flex-col not-xs:w-full gap-4 pointer-events-auto">
                            <Button
                                variant="white"
                                size="xl"
                                nativeButton={false}
                                render={<Link to="/media" hash="portfolio" />}
                            >
                                {m.media_hero_work()}
                            </Button>
                            <Button
                                variant="outline"
                                size="xl"
                                nativeButton={false}
                                render={<Link to="/media/contact" />}
                            >
                                {m.common_write_us()}
                            </Button>
                        </div>
                        <div className="flex not-sm:w-full justify-center items-center gap-2 pointer-events-auto">
                            <CarouselPrevious className="relative inset-0 translate-y-0" />
                            <CarouselCounter />
                            <CarouselNext className="relative inset-0 translate-y-0" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface HeroSectionProps {}

export function HeroSection(props: HeroSectionProps) {
    const images: AssetKey[] = ["media-hero-1", "media-hero-2", "media-hero-3", "media-hero-4", "media-hero-5"];

    return (
        <section id="hero" className="relative flex w-full">
            <Carousel
                opts={{
                    loop: true,
                }}
                className="size-full"
            >
                <CarouselOverlay />
                <CarouselContent
                    extraClassName="absolute inset-0 -z-10"
                    className="m-0"
                >
                    {images.map((image, index) => (
                        <CarouselItem key={image} className="p-0">
                            <Img
                                className="size-full object-cover"
                                src={asset(image, "large")}
                                alt={m.media_hero_alt({ number: index + 1 })}
                                loading={index === 0 ? "eager" : "lazy"}
                                fetchPriority={index === 0 ? "high" : "low"}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </section>
    );
}
