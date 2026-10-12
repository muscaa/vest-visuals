import { AccountScreenLayout } from "@/components/account/layouts";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/account/login")({
    component: AccountScreenLayout,
});
