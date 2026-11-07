import { createFileRoute } from "@tanstack/react-router";
import { AccountScreenLayout } from "@/components/account/layouts";

/** Signing in, up and everything around it: one card in the middle of the screen. */
export const Route = createFileRoute("/account/_auth")({
    component: AccountScreenLayout,
});
