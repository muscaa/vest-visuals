import { createFileRoute } from "@tanstack/react-router";
import { sitemapResponse } from "@server/sitemap";

export const Route = createFileRoute("/software/sitemap.xml")({
    server: {
        handlers: {
            GET: ({ request }: { request: Request }) => sitemapResponse(request, "software"),
        },
    },
});
