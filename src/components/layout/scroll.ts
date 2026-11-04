/**
 * The layouts scroll their content in a div, not the window, so the navbar or sidebar stays put with the scrollbar
 * beside the content only. The router only knows the window: this marks the div, so a new page starts at its top and
 * back/forward bring its position back (see `scrollToTopSelectors` in src/router.tsx).
 */
export const pageScroll = { "data-scroll-restoration-id": "page" } as const;

export const pageScrollSelector = "[data-scroll-restoration-id=page]";
