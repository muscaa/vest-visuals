import {
    useState,
    useEffect,
} from "react";
import Image from "next/image";
import {
    ButtonLink,
} from "@/components/snippets";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { client_config } from "@/utils/client/config";
import { Reveal } from "@/components/animations/reveal";

export function SectionCarousel() {
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
        <section id="carousel" className="flex flex-col justify-center items-center px-2 py-8 bg-background2">
            <Reveal delay={200} duration={1000} direction="none" className="w-full">
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
                            client_config.categories.map((category, index) => (
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
