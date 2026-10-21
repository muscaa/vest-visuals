import { createFileRoute } from "@tanstack/react-router";
import { ForgotPasswordForm } from "@/components/forms/forgot-password";
import { requireGuest } from "@/functions/auth";

export const Route = createFileRoute("/account/_auth/forgot-password/")({
    beforeLoad: requireGuest,
    component: ForgotPasswordForm,
});
