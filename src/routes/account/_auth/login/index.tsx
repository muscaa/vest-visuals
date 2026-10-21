import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "@/components/forms/login";

export const Route = createFileRoute("/account/_auth/login/")({
    component: LoginForm,
});
