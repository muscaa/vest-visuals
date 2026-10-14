import { createFileRoute } from "@tanstack/react-router";
import { robotsResponse } from "@server/sitemap";

export const Route = createFileRoute("/software/robots.txt")({
    server: {
        handlers: {
            GET: ({ request }: { request: Request }) => robotsResponse(request, "software"),
        },
    },
});
