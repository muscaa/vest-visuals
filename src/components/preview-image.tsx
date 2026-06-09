"use client";

import { Reveal } from "@/components/animations/reveal";
import { Img } from "./img";

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
    return (
        <>
            <Reveal delay={props.index * 100} className="overflow-hidden">
                <Img
                    src={props.item.preview.src}
                    alt={props.item.alt!}
                    onClick={props.onClick}
                    className={`transition-all ease-out hover:opacity-75 hover:scale-105 size-full ${props.className}`}
                />
            </Reveal>
        </>
    );
}
