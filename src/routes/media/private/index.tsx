import { getSession } from "@/functions/auth";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/media/private/")({
    beforeLoad: async () => {
        const session = await getSession();

        if (!session) {
            throw redirect({ to: "/account/login" });
        }

        return { user: session.user };
    },
    component: RouteComponent,
});

function RouteComponent() {
    const { user } = Route.useRouteContext();

    return (
        <div>
            <div>Hello "/media/private/"!</div>
            <div className="flex flex-col whitespace-pre-wrap">
                {JSON.stringify(user, null, 2)}
            </div>
        </div>
    );
}
