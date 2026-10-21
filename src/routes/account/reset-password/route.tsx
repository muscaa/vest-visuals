import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { AccountScreenLayout } from "@/components/account/layouts";

const searchSchema = z.object({
    /** from the link in the email; Better Auth checked it before redirecting here */
    token: z.string().optional().catch(undefined),
    /** Better Auth's error code, when the link is invalid or expired */
    error: z.string().optional().catch(undefined),
});

export const Route = createFileRoute("/account/reset-password")({
    validateSearch: searchSchema,
    component: AccountScreenLayout,
});
