import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/components/login-form";

export const Route = createFileRoute("/account/_auth/login/")({
    component: LoginForm,
});
