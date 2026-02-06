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

export interface SectionPreviewProps {
    title: string;
    description: string;
    images: string[];
    className?: string;
}

export function SectionPreview(props: SectionPreviewProps) {
    return (
        <section
            id="preview"
            className={cn("relative flex w-full h-screen-no-nav", props.className)}
        >
            <Carousel
                opts={{
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent className="m-0">
                    {
                        props.images.map((image, index) => (
                            <CarouselItem key={index} className="p-0">
                                <Img
                                    src={image}
                                    className="size-full object-cover"
                                />
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselControls />
            </Carousel>
            <div className="absolute size-full flex flex-col justify-center items-center gap-8 p-8 text-center text-shadow-lg pointer-events-none theme-dark">
                <h1 className="font-mono">{props.title}</h1>
                <p>{props.description}</p>
            </div>
        </section>
    );
}
