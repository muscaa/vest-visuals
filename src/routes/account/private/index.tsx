import { createFileRoute, redirect } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/theme";
import { Button } from "@/components/ui/button";
import { getSession, signout } from "@/functions/auth";
import { Text } from "@/components/typography";

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
            <div className="flex flex-col">
                {[
                    "lg-1",
                    "lg-2",
                    "lg-3",
                    "lg-4",
                    "md-1",
                    "md-2",
                    "md-3",
                    "md-4",
                    "sm-1",
                    "sm-2",
                    "sm-3",
                    "sm-4",
                ].map((value, index) => (
                    <Text key={index} size={value as any}>
                        The quick brown fox
                    </Text>
                ))}
            </div>
        </div>
    );
}
