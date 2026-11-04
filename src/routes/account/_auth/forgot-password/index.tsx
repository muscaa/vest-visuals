import { createFileRoute } from "@tanstack/react-router";
import { m } from "@shared/paraglide/messages";
import { accountHead } from "@/components/account/layouts";
import { ForgotPasswordForm } from "@/components/forms/forgot-password";
import { requireGuest } from "@/functions/auth";

export const Route = createFileRoute("/account/_auth/forgot-password/")({
    beforeLoad: requireGuest,
    head: (context) => accountHead(context, m.forgot_title()),
    component: ForgotPasswordForm,
});
