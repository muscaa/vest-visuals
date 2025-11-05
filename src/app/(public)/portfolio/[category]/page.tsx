"use client";

import { Main } from "@/components/main";
import { Masonry } from "@/components/masonry";
import { useParams } from "next/navigation";
import { PreviewImage } from "@/components/preview-image";
import { usePortfolio } from "@/hooks/usePortfolio";
import { useState } from "react";
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

export default function Page() {
    const { category } = useParams<{ category: string; }>();
    const { data } = usePortfolio(category);
    const [open, setOpen] = useState<boolean>();
    const [api, setApi] = useState<CarouselApi>();

    return (
        <Main>
            <div className="flex justify-center size-full p-2">
                {
                    data && (
                        <Masonry
                            items={data}
                            config={{
                                columns: [2, 3, 4, 5],
                                gap: [4, 4, 4, 4, 4],
                                media: [640, 768, 1024, 1408],
                                useBalancedLayout: true,
                            }}
                            render={(item, index) => (
                                <PreviewImage
                                    key={index}
                                    item={item}
                                    index={index}
                                    onClick={() => {
                                        api?.scrollTo(data.findIndex((value) => value === item), true);
                                        setOpen(true);
                                    }}
                                />
                            )}
                            getHeight={(item) => item.preview.height}
                        />
                    )
                }
            </div>
            <Reveal direction="none" duration={200} className={cn("fixed inset-0 z-50", open ? "block" : "hidden")}>
                <Carousel
                    setApi={setApi}
                    opts={{
                        loop: true,
                    }}
                    onClick={() => setOpen(false)}
                    className="
                        fixed inset-0 z-50 flex justify-center items-center bg-raisin-black/95
                        transition-all opacity-100
                    "
                >
                    <CarouselContent>
                        {
                            data && data.map((item, index) => (
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
                            <X strokeWidth={1.5} className="size-6" />
                        </Button>
                    </div>
                </Carousel>
            </Reveal>
        </Main>
    );
}
