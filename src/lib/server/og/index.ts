/**
 * What goes on a page's card (see `pageHead` in @shared/seo): a page's own title and description, read from its
 * route's `head` in the card's language, or an album's. Nothing on a card comes from the url but which page it is and
 * which of the site's photos, so nobody can make cards that say something else.
 */
import { m } from "@shared/paraglide/messages";
import { getServerAsyncLocalStorage } from "@shared/paraglide/runtime";
import { asset, assetKeys } from "@shared/assets";
import { business } from "@shared/business";
import { albumCover, findOpenAlbum } from "@server/albums";
import type { Locale } from "@shared/paraglide/runtime";
import type { AssetKey } from "@shared/assets";
import type { Card } from "./card";
import { formatDate } from "@/i18n";
import { getRouter } from "@/router";

export { renderCard } from "./card";

/** The eyebrow of each site's cards, by the first part of the path; the logo on the card already says whose it is. */
function siteName(path: string) {
    const division = path.split("/")[1];
    if (division === "media") return "Media";
    if (division === "software") return "Software";
    return business.name;
}

/** Runs `fn` as if the request were in `locale`, so messages and `localize` give that language. */
export function inLocale<T>(locale: Locale, origin: string, fn: () => Promise<T>) {
    const storage = getServerAsyncLocalStorage();
    return storage ? storage.run({ locale, origin, messageCalls: new Set() }, fn) : fn();
}

let router: ReturnType<typeof getRouter> | undefined;

/**
 * A page's card, from what its route's `head` says: the title and description, without the loader's data (pages that
 * need it, like albums, have their own card). Null for a path that isn't a page with a head.
 */
export async function pageCard(path: string, photo: string | null): Promise<Card | null> {
    router ??= getRouter();
    const [, params, route] = router.getMatchedRoutes(path);
    const head = route?.options.head;
    if (!head) return null;

    try {
        const { meta = [] } = await head({ match: { pathname: path, params }, matches: [], params } as never);
        const read = (property: string) => meta.find((tag) => tag && "property" in tag && tag.property === property)?.content;

        const title = read("og:title");
        if (!title) return null;
        return {
            eyebrow: siteName(path),
            title,
            description: read("og:description"),
            photo: photo && (assetKeys as readonly string[]).includes(photo) ? asset(photo as AssetKey, "large") : undefined,
        };
    } catch (error) {
        console.error(`No card for ${path}:`, error);
        return null;
    }
}

/** An album's card: its title, date and cover. Drafts, locked and missing albums get a plain one, saying nothing. */
export async function albumCard(token: string): Promise<Card> {
    const album = await findOpenAlbum(token, false);
    if (!album) {
        return { eyebrow: business.name, title: m.meta_album_title(), description: m.meta_album_description() };
    }

    const cover = await albumCover(album);
    // the smallest size that fills the card, or the biggest there is
    const image = cover?.images.find((size) => size.width >= 960) ?? cover?.images.at(-1);
    return {
        eyebrow: formatDate(album.date),
        title: album.title,
        description: album.description ?? m.meta_album_description(),
        photo: image?.url,
    };
}
