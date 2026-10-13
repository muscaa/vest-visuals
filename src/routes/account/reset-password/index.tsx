import { createFileRoute } from "@tanstack/react-router";
import { ResetPasswordForm } from "@/components/forms/reset-password";
import { Main } from "@/components/main";

export const Route = createFileRoute("/account/reset-password/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <Main variant="screen" className="justify-center items-center">
            <ResetPasswordForm />
        </Main>
    );
}
