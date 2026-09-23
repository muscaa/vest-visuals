import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/account/private/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/account/private/"!</div>;
}
