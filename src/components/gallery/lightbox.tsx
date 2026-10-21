import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { m } from "@shared/paraglide/messages";
import { useEffect } from "react";
import { IconDownload, IconX } from "@tabler/icons-react";
import { galleryDownload, gallerySrcSet } from "@shared/gallery";
import { buttonVariants } from "../ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselCounter,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    useCarousel,
} from "../ui/carousel";
import type { GalleryItem } from "@shared/gallery";

export interface LightboxProps {
    items: GalleryItem[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** the item it opens on */
    startIndex: number;
    /** called when close to the last loaded item, to load more */
    onNearEnd?: () => void;
    /** shows a download button for the current item */
    downloadable?: boolean;
}

/** The current video plays from YouTube, sized to fit the screen; leaving its slide removes the player, stopping it. */
function YouTubePlayer(props: { item: GalleryItem }) {
    const ratio = props.item.width / props.item.height;

    return (
        <iframe
            src={`https://www.youtube-nocookie.com/embed/${props.item.video?.youtube}?autoplay=1&rel=0&playsinline=1`}
            title={props.item.alt ?? "YouTube"}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="max-w-full border-0 rounded-md"
            // as wide as fits, keeping the video's shape within the slide's height
            style={{ aspectRatio: ratio, width: `min(100%, calc((100dvh - 8rem) * ${ratio}))` }}
        />
    );
}

/** Only the current item and its neighbours load, so opening a long album doesn't load all of it. */
function Slide(props: { item: GalleryItem; index: number; current: number; onClose: () => void }) {
    const { item } = props;
    const distance = Math.abs(props.index - props.current);

    return (
        <div
            className="flex justify-center items-center size-full px-2 pt-16 pb-6 sm:px-20 sm:pb-16"
            // the empty space around the photo closes the viewer
            onClick={(event) => event.target === event.currentTarget && props.onClose()}
        >
            {
                distance > 2 ? null : item.video && distance === 0 ? <YouTubePlayer item={item} /> : (
                    <img
                        src={item.images.at(-1)?.url}
                        srcSet={gallerySrcSet(item)}
                        sizes="100vw"
                        alt={item.alt ?? ""}
                        width={item.width}
                        height={item.height}
                        decoding="async"
                        className="w-auto h-auto max-w-full max-h-full object-contain select-none"
                    />
                )
            }
        </div>
    );
}

function LightboxSlides(props: Omit<LightboxProps, "open" | "onOpenChange" | "startIndex"> & { onClose: () => void }) {
    const { at } = useCarousel();
    const current = at - 1;
    // -1 until the carousel is ready
    const item = current >= 0 ? props.items[current] : undefined;
    const download = item && galleryDownload(item);
    const { items, onNearEnd } = props;

    useEffect(() => {
        if (at && at > items.length - 4) {
            onNearEnd?.();
        }
    }, [at, items.length, onNearEnd]);

    return (
        <>
            <CarouselContent className="ml-0 h-dvh">
                {
                    props.items.map((slide, index) => (
                        <CarouselItem key={slide.id} className="pl-0 h-dvh">
                            <Slide item={slide} index={index} current={current} onClose={props.onClose} />
                        </CarouselItem>
                    ))
                }
            </CarouselContent>
            <div className="absolute top-0 inset-x-0 flex justify-between items-center gap-4 px-4 py-3 bg-linear-to-b from-black/60 to-transparent pointer-events-none">
                <CarouselCounter className="text-sm text-white/80" />
                <div className="flex items-center gap-1 pointer-events-auto">
                    {
                        props.downloadable && download && (
                            <a
                                href={download}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={m.gallery_download()}
                                title={m.gallery_download()}
                                className={buttonVariants({ variant: "ghost", size: "icon" })}
                            >
                                <IconDownload />
                            </a>
                        )
                    }
                    <DialogPrimitive.Close
                        aria-label={m.ui_close()}
                        title={m.ui_close()}
                        className={buttonVariants({ variant: "ghost", size: "icon" })}
                    >
                        <IconX />
                    </DialogPrimitive.Close>
                </div>
            </div>
            <CarouselPrevious variant="secondary" size="icon" className="hidden sm:inline-flex left-4" />
            <CarouselNext variant="secondary" size="icon" className="hidden sm:inline-flex right-4" />
        </>
    );
}

/** The photos and videos full screen, one at a time: swipe, arrow keys or the side buttons move between them. */
export function Lightbox(props: LightboxProps) {
    const close = () => props.onOpenChange(false);

    return (
        <DialogPrimitive.Root open={props.open} onOpenChange={props.onOpenChange}>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Popup className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md theme-dark text-foreground outline-none duration-200 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0">
                    <DialogPrimitive.Title className="sr-only">{m.gallery_viewer()}</DialogPrimitive.Title>
                    <Carousel opts={{ startIndex: props.startIndex, duration: 20 }} className="size-full">
                        <LightboxSlides
                            items={props.items}
                            onNearEnd={props.onNearEnd}
                            downloadable={props.downloadable}
                            onClose={close}
                        />
                    </Carousel>
                </DialogPrimitive.Popup>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
}
