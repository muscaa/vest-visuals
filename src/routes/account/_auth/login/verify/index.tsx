import { createFileRoute } from "@tanstack/react-router";
import { m } from "@shared/paraglide/messages";
import { accountHead } from "@/components/account/layouts";
import { VerifyForm } from "@/components/forms/verify";

export const Route = createFileRoute("/account/_auth/login/verify/")({
    head: (context) => accountHead(context, m.verify_title()),
    component: VerifyForm,
});
