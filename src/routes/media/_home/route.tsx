import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/media/_home")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            Hello "/media/_home"!
            <Outlet />
        </div>
    );
}
