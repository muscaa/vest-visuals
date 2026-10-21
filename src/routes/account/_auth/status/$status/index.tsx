import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { redirectParam } from "@shared/auth";
import { AccountStatus, statusNames } from "@/components/account/status";
import { redirectTarget, sessionQuery } from "@/functions/auth";

const searchSchema = z.object({
    email: z.string().optional().catch(undefined),
    redirect: redirectParam,
    /** Better Auth's error code, added when a link from an email didn't work */
    error: z.string().optional().catch(undefined),
});

export const Route = createFileRoute("/account/_auth/status/$status/")({
    params: {
        parse: ({ status }) => {
            const parsed = z.enum(statusNames).safeParse(status);
            if (!parsed.success) throw notFound();
            return { status: parsed.data };
        },
    },
    validateSearch: searchSchema,
    beforeLoad: async ({ params, search, context }) => {
        const session = await context.queryClient.query(sessionQuery);

        // the login form's callbackURL: Better Auth also opens it right after signing in, so continue from there
        if (params.status === "email-verified" && session) {
            throw redirect(redirectTarget(search.redirect));
        }
        // both email change links lead here, but the address only changes with the second one
        if (params.status === "email-changed" && !search.error && session?.user.email !== search.email) {
            throw redirect({ to: "/account/status/$status", params: { status: "email-change-confirmed" }, search: { email: search.email } });
        }
    },
    component: RouteComponent,
});

function RouteComponent() {
    const { status } = Route.useParams();
    const { error, ...info } = Route.useSearch();

    return <AccountStatus name={status} info={info} expired={Boolean(error)} />;
}
