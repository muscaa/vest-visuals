import { createFileRoute } from "@tanstack/react-router";
import { baseLocale, isLocale } from "@shared/paraglide/runtime";
import { albumCard, inLocale, pageCard, renderCard } from "@server/og";

/**
 * The cards shown when a page is shared, as PNGs: `?page=/media/contact&locale=ro&photo=media-hero-1`, or
 * `?album={token}&locale=ro`. Built by `pageHead` in @shared/seo, for every site, so they're all here.
 */
export const Route = createFileRoute("/home/api/og")({
    server: {
        handlers: {
            GET: async ({ request }) => {
                const url = new URL(request.url);
                const page = url.searchParams.get("page");
                const album = url.searchParams.get("album");
                const requested = url.searchParams.get("locale");
                const locale = requested && isLocale(requested) ? requested : baseLocale;

                const card = await inLocale(locale, url.origin, async () => {
                    if (album) return albumCard(album);
                    if (page?.startsWith("/")) return pageCard(page, url.searchParams.get("photo"));
                    return null;
                });
                if (!card) {
                    return new Response("No such page", { status: 404 });
                }

                return new Response(new Uint8Array(await renderCard(card)), {
                    headers: {
                        "Content-Type": "image/png",
                        // shared links are fetched again and again, while pages rarely change
                        "Cache-Control": "public, max-age=86400, s-maxage=604800",
                    },
                });
            },
        },
    },
});
