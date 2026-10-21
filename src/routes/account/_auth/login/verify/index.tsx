import { createFileRoute } from "@tanstack/react-router";
import { VerifyForm } from "@/components/forms/verify";

export const Route = createFileRoute("/account/_auth/login/verify/")({
    component: VerifyForm,
});
