import { LoginForm } from "@/components/forms/login";
import { Main } from "@/components/main";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/account/login/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <Main variant="screen" className="justify-center items-center">
            <LoginForm />
        </Main>
    );
}
