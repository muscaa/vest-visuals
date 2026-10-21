import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { AccountScreenLayout } from "@/components/account/layouts";
import { requireGuest } from "@/functions/auth";

const searchSchema = z.object({
    /** where to go after signing in, a path of this site (never `//other.site`) */
    redirect: z.string().regex(/^\/(?![/\\])/).optional().catch(undefined),
    /** set by the links in emails */
    notice: z.enum(["verified", "reset", "deleted"]).optional().catch(undefined),
    /** Better Auth's error code, added when a link from an email didn't work */
    error: z.string().optional().catch(undefined),
});

export const Route = createFileRoute("/account/login")({
    validateSearch: searchSchema,
    beforeLoad: requireGuest,
    component: AccountScreenLayout,
});
