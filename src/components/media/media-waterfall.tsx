"use client";

import {
    Masonry,
    useMediaValues,
} from "@/components/masonry";
import { useEffect, useMemo, useRef, useState } from "react";
import { Reveal } from "@/components/animations/reveal";
import { Img } from "@/components/snippets";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@shared/shadcn/lib/utils";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useIntersectionObserver } from "@uidotdev/usehooks";

interface PreviewItem {
    alt?: string;
    preview: {
        src: string;
        width: number;
        height: number;
    };
    full: {
        src: string;
        width: number;
        height: number;
    };
}

interface PreviewImageProps {
    item: PreviewItem;
    index: number;
    onClick?: () => void;
    className?: string;
}

function PreviewImage(props: PreviewImageProps) {
    return (
        <Reveal /*delay={props.index * 100}*/ className="overflow-hidden">
            <Img
                src={props.item.preview.src}
                alt={props.item.alt}
                onClick={props.onClick}
                className={`transition-all ease-out hover:opacity-75 hover:scale-105 size-full ${props.className}`}
            />
        </Reveal>
    );
}

interface Props {
    nextData: (offset: number, limit: number) => Promise<PreviewItem[]>;
}

export function MediaWaterfall(props: Props) {
    const columns = useMemo(() => [2, 3, 4, 5], []);
    const gaps = useMemo(() => [4, 4, 4, 4], []);
    const widths = useMemo(() => [640, 768, 1024, 1408], []);

    const ref = useRef<HTMLDivElement>(null);
    const [nextRef, nextEntry] = useIntersectionObserver({ threshold: 0 });
    const size = useWindowSize();
    const values = useMediaValues(widths, columns, gaps);
    const [api, setApi] = useState<CarouselApi>();
    const [open, setOpen] = useState<boolean>();
    const [limit, setLimit] = useState<number>();
    const [data, setData] = useState<PreviewItem[]>([]);

    useEffect(() => {
        const element = ref.current;
        if (!element || !size || !values.columns) return;

        const width = element.offsetWidth;
        const height = size.height; // TODO find visible height

        const mediaWidth = width / values.columns;
        const mediaHeight = mediaWidth;

        const rows = Math.round(height / mediaHeight);

        setLimit(values.columns * rows /** 2*/);
    }, [ref.current, size, values]);

    useEffect(() => {
        if (!nextEntry?.isIntersecting || !limit) return;

        const next = async () => {
            const result = await props.nextData(data.length, limit);
            if (result.length === 0) return;

            setData((prev) => [...prev, ...result]);
        };

        next();

    }, [nextEntry?.isIntersecting, data, limit]);

    return (
        <>
            <div ref={ref} className="flex flex-col size-full p-2 min-h-screen-no-nav">
                <Masonry
                    items={data}
                    config={{
                        columns,
                        gap: gaps,
                        media: widths,
                        useBalancedLayout: true,
                    }}
                    render={(item, index) => (
                        <PreviewImage
                            key={index}
                            item={item}
                            index={index}
                            // onClick={() => {
                            //     api?.scrollTo(data.findIndex((value) => value === item), true);
                            //     setOpen(true);
                            // }}
                        />
                    )}
                    getHeight={(item) => item.preview.height}
                />
                <div ref={nextRef}></div>
            </div>
            {/* <Reveal direction="none" duration={200} className={cn("fixed inset-0 z-50", open ? "block" : "hidden")}>
                <Carousel
                    setApi={setApi}
                    opts={{
                        loop: true,
                    }}
                    onClick={() => setOpen(false)}
                    className="
                        fixed inset-0 z-50 flex justify-center items-center bg-black/95
                        transition-all opacity-100
                    "
                >
                    <CarouselContent>
                        {
                            data.map((item, index) => (
                                <CarouselItem key={index} className="relative flex justify-center items-center">
                                    <div className="flex justify-center items-center w-full h-[75%] md:w-[75%] md:h-full">
                                        <Img
                                            src={item.full.src}
                                            width={item.full.width}
                                            height={item.full.height}
                                            onClick={(e) => e.stopPropagation()}
                                            className="object-contain w-auto h-auto max-w-full max-h-full"
                                        />
                                    </div>
                                </CarouselItem>
                            ))
                        }
                    </CarouselContent>
                    <CarouselPrevious
                        variant="transparent"
                        className="left-2"
                        onClick={(e) => {
                            e.stopPropagation();
                            api?.scrollPrev();
                        }}
                    />
                    <CarouselNext
                        variant="transparent"
                        className="right-2"
                        onClick={(e) => {
                            e.stopPropagation();
                            api?.scrollNext();
                        }}
                    />
                    <div className="absolute top-3.5 right-3.5 theme-dark">
                        <Button
                            variant="navbar"
                            size="icon"
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpen(false);
                            }}
                        >
                            <X />
                        </Button>
                    </div>
                </Carousel>
            </Reveal> */}
        </>
    );
}
