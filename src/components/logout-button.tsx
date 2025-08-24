"use client";

import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";

export function LogoutButton() {
    const { logout } = useAuth();

    return (
        <Button onClick={async () => await logout.mutateAsync()}>
            Logout
        </Button>
    );
}
