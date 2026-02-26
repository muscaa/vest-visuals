import { Media } from "@type/media";
import { Img } from "../snippets";
import { cn } from "@shared/shadcn/lib/utils";

interface Props {
    media: Media;
    index: number;
    onClick?: () => void;
    className?: string;
}

export function MediaPreview(props: Props) {
    return (
        // <Reveal /*delay={props.index * 100}*/ className="overflow-hidden">
        <div className="overflow-hidden">
            <Img
                src={props.media.preview.src}
                alt={props.media.alt}
                onClick={props.onClick}
                className={cn("transition-all ease-out hover:opacity-75 hover:scale-105 size-full", props.className)}
            />
        </div>
        // </Reveal>
    );
}
