import { createFileRoute, redirect } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/theme";
import { Button } from "@/components/ui/button";
import { getSession, signout } from "@/functions/auth";

export const Route = createFileRoute("/account/private/")({
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
            <div>Hello "/account/private/"!</div>
            <ThemeToggle />
            <Button onClick={() => signout()}>Sign Out</Button>
            <div className="flex flex-col whitespace-pre-wrap">
                {JSON.stringify(user, null, 2)}
            </div>
        </div>
    );
}
