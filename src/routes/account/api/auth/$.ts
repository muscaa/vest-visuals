import { authHandlers } from "@server/auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/account/api/auth/$")({
    server: { handlers: authHandlers },
});
