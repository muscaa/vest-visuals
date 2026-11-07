import { createFileRoute } from "@tanstack/react-router";
import { m } from "@shared/paraglide/messages";
import { accountHead } from "@/components/account/layouts";
import { SignupForm } from "@/components/forms/signup";
import { requireGuest } from "@/functions/auth";

export const Route = createFileRoute("/account/_auth/signup/")({
    beforeLoad: requireGuest,
    head: (context) => accountHead(context, m.signup_title()),
    component: SignupForm,
});
