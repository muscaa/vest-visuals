import { IconFolder } from "@tabler/icons-react";
import { gallerySrcSet } from "@shared/gallery";
import { cn } from "@shared/shadcn/utils";
import type { GalleryItem } from "@shared/gallery";

/** How the photos behind the first one are turned, like prints fanned out on a table */
const behind = ["-rotate-6", "rotate-6"];

/**
 * A directory's look: a square with up to 3 of its photos fanned out, the first on top; a folder while it has none.
 * The photos sit a little inside the square, so the ones behind stay in it. `children` go on top of the first, e.g.
 * the directory's name; `sizes` is how wide it shows, for picking the photos' files.
 */
export function Fan(props: { previews: GalleryItem[]; sizes: string; className?: string; children?: React.ReactNode }) {
    const [first, ...rest] = props.previews;

    return (
        <div className={cn("relative isolate aspect-square", props.className)}>
            {
                rest.map((item, index) => (
                    // a box around it, as an image placed by its edges keeps its own shape instead of filling them
                    <div key={item.id} className={cn("absolute inset-[7%] -z-10 overflow-hidden rounded-2xl opacity-90 shadow-md", behind[index])}>
                        <FanPhoto item={item} sizes={props.sizes} className="size-full" />
                    </div>
                ))
            }
            <div className="absolute inset-[7%] overflow-hidden rounded-2xl shadow-md ring-2 ring-background">
                {
                    first
                        ? <FanPhoto item={first} sizes={props.sizes} className="size-full" />
                        : (
                            <div className="flex size-full items-center justify-center bg-muted text-muted-foreground">
                                <IconFolder className="size-1/3" stroke={1.25} />
                            </div>
                        )
                }
                {props.children}
            </div>
        </div>
    );
}

function FanPhoto(props: { item: GalleryItem; sizes: string; className?: string }) {
    return (
        <img
            src={props.item.images.at(-1)?.url}
            srcSet={gallerySrcSet(props.item)}
            sizes={props.sizes}
            alt=""
            loading="lazy"
            decoding="async"
            className={cn("rounded-2xl object-cover", props.className)}
        />
    );
}
