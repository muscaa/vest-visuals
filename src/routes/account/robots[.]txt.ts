import { createFileRoute } from "@tanstack/react-router";
import { robotsResponse } from "@server/sitemap";

// account pages are private or forms, nothing to index
export const Route = createFileRoute("/account/robots.txt")({
    server: {
        handlers: {
            GET: ({ request }: { request: Request }) => robotsResponse(request),
        },
    },
});
