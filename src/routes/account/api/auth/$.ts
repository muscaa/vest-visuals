import { auth } from "@server/auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/account/api/auth/$")({
    server: {
        handlers: {
            GET: async ({ request }: { request: Request }) => {
                return await auth.handler(request);
            },
            POST: async ({ request }: { request: Request }) => {
                return await auth.handler(request);
            },
        },
    },
});
