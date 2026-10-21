import { createFileRoute } from "@tanstack/react-router";
import { AccountScreenLayout } from "@/components/account/layouts";
import { requireGuest } from "@/functions/auth";

export const Route = createFileRoute("/account/signup")({
    beforeLoad: requireGuest,
    component: AccountScreenLayout,
});
