import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { redirectParam } from "@shared/auth";
import { requireGuest } from "@/functions/auth";

/** The login and its second step, the email code; both keep `redirect`. */
export const Route = createFileRoute("/account/_auth/login")({
    validateSearch: z.object({ redirect: redirectParam }),
    beforeLoad: requireGuest,
});
