import { ImgHTMLAttributes } from "react";

export interface Image {
    src: string;
    alt: string;
}

export type ImgProps = Image & Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt">;

export function Img(props: ImgProps) {
    return (
        <img
            fetchPriority="low"
            loading="lazy"
            decoding="async"
            {...props}
        />
    );
}
