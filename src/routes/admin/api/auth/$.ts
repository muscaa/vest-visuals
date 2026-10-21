import { authHandlers } from "@server/auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/api/auth/$")({
    server: { handlers: authHandlers },
});
