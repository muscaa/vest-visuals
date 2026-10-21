import { cn } from "@shared/shadcn/utils";
import { m } from "@shared/paraglide/messages";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { IconLoader2, IconPlayerPlayFilled } from "@tabler/icons-react";
import { gallerySrcSet } from "@shared/gallery";
import { TextP } from "../typography";
import { Lightbox } from "./lightbox";
import { Masonry } from "./masonry";
import type { GalleryItem } from "@shared/gallery";

const getKey = (item: GalleryItem) => item.id;
const getAspectRatio = (item: GalleryItem) => item.width / item.height;

/** About a column's width, by the masonry's default columns, so the browser picks a fitting file. */
const tileSizes = "(min-width: 1536px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw";

/** Fades in once loaded, also when it loaded before the page was interactive. */
function TileImage(props: { item: GalleryItem }) {
    const [loaded, setLoaded] = useState(false);

    return (
        <img
            ref={(image) => {
                if (image?.complete && image.naturalWidth) setLoaded(true);
            }}
            src={props.item.images[0]?.url}
            srcSet={gallerySrcSet(props.item)}
            sizes={tileSizes}
            alt={props.item.alt ?? ""}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            data-loaded={loaded}
            className="size-full object-cover opacity-0 transition-[opacity,scale,filter] duration-500 data-[loaded=true]:opacity-100 group-hover/tile:scale-103 group-hover/tile:brightness-90"
        />
    );
}

function GalleryTile(props: { item: GalleryItem; index: number; onOpen: () => void }) {
    const label = props.item.video ? m.gallery_video({ number: props.index + 1 }) : m.gallery_photo({ number: props.index + 1 });

    return (
        <button
            type="button"
            onClick={props.onOpen}
            aria-label={label}
            className="group/tile relative block size-full overflow-hidden rounded-sm bg-muted outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
            <TileImage item={props.item} />
            {
                // a video is its YouTube thumbnail with a play button, and plays once opened
                props.item.video && (
                    <span className="absolute inset-0 m-auto flex justify-center items-center size-14 rounded-full bg-black/55 text-white backdrop-blur-sm transition-transform duration-300 pointer-events-none group-hover/tile:scale-110">
                        <IconPlayerPlayFilled className="size-6 translate-x-0.5" />
                    </span>
                )
            }
        </button>
    );
}

/**
 * Asks for more a screen and a half before the end, so scrolling rarely waits. A tall invisible strip at the end of the
 * list is watched instead of a margin, since the page scrolls inside a container that would clip one.
 */
function LoadMore(props: { hasMore: boolean; loading: boolean; onLoadMore: () => void }) {
    const [ref, entry] = useIntersectionObserver<HTMLDivElement>({ threshold: 0 });
    const visible = Boolean(entry?.isIntersecting);
    const { hasMore, loading, onLoadMore } = props;

    useEffect(() => {
        // also after a page loaded while the strip stayed in view
        if (visible && hasMore && !loading) onLoadMore();
    }, [visible, hasMore, loading, onLoadMore]);

    return (
        <div className="relative flex justify-center">
            <div ref={ref} aria-hidden className="absolute bottom-0 w-px h-[150vh] pointer-events-none" />
            {
                loading && (
                    <IconLoader2 aria-label={m.gallery_loading()} className="my-8 size-6 animate-spin text-muted-foreground" />
                )
            }
        </div>
    );
}

export interface GalleryProps {
    items: GalleryItem[];
    hasMore: boolean;
    loadingMore: boolean;
    onLoadMore: () => void;
    /** lets visitors download each photo and video from the viewer */
    downloadable?: boolean;
    className?: string;
}

/** An endless wall of photos and videos; clicking one opens it full screen. */
export function Gallery(props: GalleryProps) {
    const [viewer, setViewer] = useState({ open: false, index: 0 });
    const { hasMore, loadingMore, onLoadMore } = props;

    return (
        <div className={cn("flex flex-col", props.className)}>
            {
                !props.items.length && !hasMore && (
                    <TextP variant="muted" className="m-auto py-24">{m.gallery_empty()}</TextP>
                )
            }
            <Masonry
                items={props.items}
                getKey={getKey}
                getAspectRatio={getAspectRatio}
                renderItem={(item, index) => (
                    <GalleryTile item={item} index={index} onOpen={() => setViewer({ open: true, index })} />
                )}
            />
            <LoadMore hasMore={hasMore} loading={loadingMore} onLoadMore={onLoadMore} />
            <Lightbox
                items={props.items}
                open={viewer.open}
                onOpenChange={(open) => setViewer((value) => ({ ...value, open }))}
                startIndex={viewer.index}
                onNearEnd={hasMore && !loadingMore ? onLoadMore : undefined}
                downloadable={props.downloadable}
            />
        </div>
    );
}
