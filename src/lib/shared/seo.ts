/**
 * What search engines and shared links see of a page, the same way on every page: its title and description, the card
 * shown when it's shared (Open Graph, https://ogp.me, which X, WhatsApp and the rest read too), its canonical url and
 * its versions in the other languages. Each route's `head` calls {@link pageHead}.
 */
import { getLocale, locales } from "@shared/paraglide/runtime";
import { business, socialLinks } from "./business";
import type { Locale } from "@shared/paraglide/runtime";
import type { AssetKey } from "./assets";
import { publicPageUrl } from "@/rewrites";

/** Open Graph's locales, language and territory: the english copy is british. */
const ogLocales: Record<Locale, string> = {
    ro: "ro_RO",
    en: "en_GB",
};

/** The cards' size, the one every platform shows in full. */
export const cardSize = { width: 1200, height: 630 };

export interface PageMeta {
    /** the page's own title; the site's name is added after it, "Fotograf de nuntă în Timișoara | Vest Visuals" */
    title: string;
    /** for search results and shared links: what the page offers, ideally 120 to 160 characters */
    description?: string;
    /** the photo on the page's card, one of the site's own images; without it, the card is the brand's colours */
    photo?: AssetKey;
    /** the card, when it isn't made from this page's title and description (albums) */
    card?: URL;
    /** kept out of search results: the account, the admin, albums */
    noindex?: boolean;
    /** the page this one is a copy of, for search engines to show instead: the legal pages, the same on every site */
    canonical?: string;
    /** structured data for search engines (https://schema.org), e.g. {@link organizationData} */
    data?: object[];
}

/** What `pageHead` needs of a route's `head` context: the page's path, as the router sees it (`/media/contact`). */
export interface PageHeadContext {
    match: { pathname: string };
}

/** Where a page's card is made, by the home site's `/api/og`, from the page's own title and description. */
export function cardUrl(params: Record<string, string>) {
    const url = publicPageUrl("/home/api/og");
    url.search = new URLSearchParams(params).toString();
    return url;
}

/** Everything a page puts in its head, from its {@link PageMeta}: `head: (context) => pageHead(context, { … })`. */
export function pageHead(context: PageHeadContext, page: PageMeta) {
    const locale = getLocale();
    const path = page.canonical ?? context.match.pathname;
    const url = publicPageUrl(path, locale).href;
    const card = page.card ?? cardUrl({ page: context.match.pathname, locale, ...(page.photo && { photo: page.photo }) });

    const meta: React.ComponentProps<"meta">[] = [
        { title: `${page.title} | ${business.name}` },
        ...(page.description ? [{ name: "description", content: page.description }] : []),
        ...(page.noindex ? [{ name: "robots", content: "noindex, nofollow" }] : []),

        { property: "og:site_name", content: business.name },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:title", content: page.title },
        ...(page.description ? [{ property: "og:description", content: page.description }] : []),
        { property: "og:locale", content: ogLocales[locale] },
        // one per other language; with more than two, they'd need to be told apart, the head keeps one per property
        ...locales.filter((other) => other !== locale).map((other) => ({ property: "og:locale:alternate", content: ogLocales[other] })),
        { property: "og:image", content: card.href },
        { property: "og:image:type", content: "image/png" },
        { property: "og:image:width", content: String(cardSize.width) },
        { property: "og:image:height", content: String(cardSize.height) },
        { property: "og:image:alt", content: page.title },
        // X reads the rest from Open Graph
        { name: "twitter:card", content: "summary_large_image" },
    ];

    // pages kept out of search results have no versions to point to
    const links = page.noindex ? [] : [
        { rel: "canonical", href: url },
        ...locales.map((other) => ({ rel: "alternate", hrefLang: other, href: publicPageUrl(path, other).href })),
        { rel: "alternate", hrefLang: "x-default", href: publicPageUrl(path).href },
    ];

    // `<` escaped, so the data can't close the script
    const scripts = (page.data ?? []).map((data) => ({
        type: "application/ld+json",
        children: JSON.stringify(data).replace(/</g, "\\u003c"),
    }));

    return { meta, links, scripts };
}

/** The company, for search engines' knowledge panel: name, logo, where it is, its profiles. On the home page. */
export function organizationData() {
    const home = publicPageUrl("/home");

    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: business.name,
        legalName: business.legalName,
        taxID: business.taxId,
        url: home.href,
        logo: new URL("/android-chrome-512x512.png", home).href,
        email: business.email,
        address: {
            "@type": "PostalAddress",
            addressLocality: business.city,
            addressRegion: business.county,
            addressCountry: business.country,
        },
        sameAs: Object.values(socialLinks),
    };
}

/**
 * The photo and video studio as a local business, so it can show for searches like "fotograf nuntă Timișoara". On the
 * media home page, with the cities it works in.
 */
export function localBusinessData(description: string, areas: string[]) {
    const home = publicPageUrl("/home");

    return {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: `${business.name} Media`,
        description,
        url: publicPageUrl("/media").href,
        image: new URL("/android-chrome-512x512.png", home).href,
        email: business.email,
        address: {
            "@type": "PostalAddress",
            addressLocality: business.city,
            addressRegion: business.county,
            addressCountry: business.country,
        },
        areaServed: areas.map((name) => ({ "@type": "City", name })),
        parentOrganization: { "@type": "Organization", name: business.name, url: home.href },
        sameAs: Object.values(socialLinks),
    };
}
