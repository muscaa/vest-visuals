import { cn } from "@shared/shadcn/lib/utils";
import { Img } from "../snippets";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    useCarousel,
    CarouselApi,
} from "@/components/ui/carousel";
import {
    useState,
    useEffect,
} from "react";

function CarouselControls() {
    const { api } = useCarousel();
    const [at, setAt] = useState(0);
    const [max, setMax] = useState(0);

    useEffect(() => {
        if (!api) return;

        const onSelect = (api: CarouselApi) => {
            if (!api) return;

            setAt(api.selectedScrollSnap() + 1);
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
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            <CarouselPrevious
                variant="transparent"
                size="icon-lg"
                className="relative inset-0 translate-y-0"
            />
            <span className="font-mono theme-dark text-shadow-lg">{String(at).padStart(String(max).length, "0")}/{max}</span>
            <CarouselNext
                variant="transparent"
                size="icon-lg"
                className="relative inset-0 translate-y-0"
            />
        </div>
    );
}

interface Props {
    className?: string;
}

export function SectionPreview(props: Props) {
    return (
        <section id="preview" className={cn("relative flex w-full h-[calc(100dvh-4rem)]", props.className)}>
            <Carousel
                opts={{
                    loop: true,
                }}
            >
                <CarouselContent className="m-0">
                    {
                        Array.from({ length: 5 }).map((_, index) => ( // TODO
                            <CarouselItem key={index} className="p-0">
                                <Img
                                    src="http://192.168.0.155:9000/assets/p6axvqo8qotsols2e0s1f4zh/large"
                                    className="size-full object-cover"
                                />
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselControls />
            </Carousel>
            <div className="absolute size-full flex flex-col justify-center items-center gap-8 text-center text-shadow-lg pointer-events-none theme-dark">
                <h1 className="font-mono">Fotograf de Evenimente și Povești Autentice</h1>
                <p>Surprindem emoții, nu doar imagini. Servicii foto-video pentru nunți, portrete și business în Timișoara și în țară.</p>
            </div>
        </section>
    );
}
