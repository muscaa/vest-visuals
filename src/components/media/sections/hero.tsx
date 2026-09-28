import { Image, Img } from "@/components/img";
import { TextH1, TextP } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselCounter, CarouselItem, CarouselNext, CarouselPrevious, useCarousel } from "@/components/ui/carousel";
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
                <TextH1 size="lg-1">
                    Momentele care <i className="text-chart-1">contează,</i>
                    <br />
                    surprinse cum <i className="text-success">trebuie.</i>
                </TextH1>
                <div />
                <TextP size="md-3" className="max-w-[60ch] text-pretty">
                    Nunți, evenimente, portrete, automotive, imobiliare și brand content, filmate și editate de un studio căruia chiar îi pasă de rezultat. Oriunde se petrece povestea ta, suntem acolo pentru ea.
                </TextP>
                <div className="flex not-xs:flex-col gap-4 pointer-events-auto">
                    <Button variant="default" size="lg">
                        Vezi lucrările
                    </Button>
                    <Button variant="outline" size="lg">
                        Scrie-ne
                    </Button>
                </div>
                <div className="flex justify-center sm:justify-end items-center gap-2 pointer-events-auto">
                    <CarouselPrevious
                        // variant="transparent"
                        className="relative inset-0 translate-y-0"
                    />
                    <CarouselCounter />
                    <CarouselNext
                        // variant="transparent"
                        className="relative inset-0 translate-y-0"
                    />
                </div>
            </div>
        </div>
    );
}

interface Props {

}

export function HeroSection(props: Props) {
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
