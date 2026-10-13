import { createFileRoute } from "@tanstack/react-router";
import { ForgotPasswordForm } from "@/components/forms/forgot-password";
import { Main } from "@/components/main";

export const Route = createFileRoute("/account/forgot-password/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <Main variant="screen" className="justify-center items-center">
            <ForgotPasswordForm />
        </Main>
    );
}
