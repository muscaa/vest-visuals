import { createFileRoute } from "@tanstack/react-router";
import { VerifyForm } from "@/components/forms/verify";
import { Main } from "@/components/main";

export const Route = createFileRoute("/account/login/verify/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <Main variant="screen" className="justify-center items-center">
            <VerifyForm />
        </Main>
    );
}
