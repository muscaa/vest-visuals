import { ImgHTMLAttributes } from "react";

export interface Image {
    src: string;
    alt: string;
}

export function Img(props: Image & Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt">) {
    return (
        <img
            fetchPriority="low"
            loading="lazy"
            decoding="async"
            {...props}
        />
    );
}
