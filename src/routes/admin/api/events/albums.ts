import { auth } from "@server/auth";
import { eventStream } from "@server/events";
import { isAdmin } from "@shared/auth";
import { createFileRoute } from "@tanstack/react-router";

/** Live changes of the albums, for their admin pages; only admins may follow them. */
export const Route = createFileRoute("/admin/api/events/albums")({
    server: {
        handlers: {
            GET: async ({ request }) => {
                const session = await auth.api.getSession({ headers: request.headers });
                if (!isAdmin(session?.user)) {
                    return new Response(null, { status: 403 });
                }
                return eventStream(request, "albums");
            },
        },
    },
});
