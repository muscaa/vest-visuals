import { createFileRoute } from "@tanstack/react-router";
import { m } from "@shared/paraglide/messages";
import { accountHead } from "@/components/account/layouts";
import { LoginForm } from "@/components/forms/login";

export const Route = createFileRoute("/account/_auth/login/")({
    head: (context) => accountHead(context, m.meta_account_login_title()),
    component: LoginForm,
});
