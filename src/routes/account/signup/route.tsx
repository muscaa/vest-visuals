import { createFileRoute } from "@tanstack/react-router";
import { AccountScreenLayout } from "@/components/account/layouts";

export const Route = createFileRoute("/account/signup")({
    component: AccountScreenLayout,
});
