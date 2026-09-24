import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/components/login-form-4";
import { ThemeToggle } from "@/components/theme";

export const Route = createFileRoute("/account/login4/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-4xl">
                <LoginForm />
            </div>
            <div className="absolute left-0 top-0">
                <ThemeToggle />
            </div>
        </div>
    );
}
