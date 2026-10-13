import { createFileRoute } from "@tanstack/react-router";
import { SignupForm } from "@/components/forms/signup";
import { Main } from "@/components/main";

export const Route = createFileRoute("/account/signup/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <Main variant="screen" className="justify-center items-center">
            <SignupForm />
        </Main>
    );
}
