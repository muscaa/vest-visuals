import { createFileRoute, redirect } from "@tanstack/react-router";
import { m } from "@shared/paraglide/messages";
import { z } from "zod";
import { accountHead } from "@/components/account/layouts";
import { ResetPasswordForm } from "@/components/forms/reset-password";

const searchSchema = z.object({
    /** from the link in the email, which Better Auth checked before redirecting here */
    token: z.string().optional().catch(undefined),
    /** Better Auth's error code, when the link is invalid or expired */
    error: z.string().optional().catch(undefined),
});

/** Where the link from the "forgot password" email lands. */
export const Route = createFileRoute("/account/_auth/reset-password/")({
    validateSearch: searchSchema,
    beforeLoad: ({ search }) => {
        if (!search.token || search.error) {
            throw redirect({ to: "/account/status/$status", params: { status: "reset-expired" } });
        }
    },
    head: (context) => accountHead(context, m.reset_title()),
    component: ResetPasswordForm,
});
