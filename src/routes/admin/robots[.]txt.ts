import { createFileRoute } from "@tanstack/react-router";
import { robotsResponse } from "@server/sitemap";

// private, nothing to index
export const Route = createFileRoute("/admin/robots.txt")({
    server: {
        handlers: {
            GET: ({ request }: { request: Request }) => robotsResponse(request),
        },
    },
});
