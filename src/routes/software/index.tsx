import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/software/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/software/"!</div>;
}
