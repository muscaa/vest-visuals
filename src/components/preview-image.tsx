"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { Img } from "@/components/snippets";

export interface PreviewItem {
    alt?: string;
    preview: {
        src: string;
        width?: number;
        height?: number;
    };
    full: {
        src: string;
        width?: number;
        height?: number;
    };
}

interface PreviewImageProps {
    item: PreviewItem;
    index: number;
    onClick?: () => void;
    className?: string;
}

export function PreviewImage(props: PreviewImageProps) {
    // const [open, setOpen] = useState(false);

    return (
        <>
            <Reveal delay={props.index * 100} className="overflow-hidden">
                <Img
                    src={props.item.preview.src}
                    alt={props.item.alt}
                    // onClick={() => setOpen(true)}
                    onClick={props.onClick}
                    className={`transition-all ease-out hover:opacity-75 hover:scale-105 size-full ${props.className}`}
                />
            </Reveal>
            {/* {
                open && (
                    <Reveal direction="none" duration={200} className="fixed inset-0 z-50">
                        <div
                            onClick={() => setOpen(false)}
                            className="
                                fixed inset-0 z-50 flex justify-center items-center bg-raisin-black/95
                                transition-all opacity-100
                            "
                        >
                            <div className="flex justify-center items-center w-full h-[75%] md:w-[75%] md:h-full">
                                <Img
                                    src={props.item.full.src}
                                    alt={props.item.alt}
                                    width={props.item.full.width}
                                    height={props.item.full.height}
                                    onClick={(e) => e.stopPropagation()}
                                    className="object-contain w-auto h-auto max-w-full max-h-full"
                                />
                            </div>
                            <div className="absolute top-3.5 right-3.5 theme-dark">
                                <Button variant="navbar" size="icon" onClick={() => setOpen(false)}>
                                    <X strokeWidth={1.5} className="size-6" />
                                </Button>
                            </div>
                        </div>
                    </Reveal>
                )
            } */}
        </>
    );
}
