import { createFileRoute } from "@tanstack/react-router";
import { SignupForm } from "@/components/forms/signup";
import { requireGuest } from "@/functions/auth";

export const Route = createFileRoute("/account/_auth/signup/")({
    beforeLoad: requireGuest,
    component: SignupForm,
});
