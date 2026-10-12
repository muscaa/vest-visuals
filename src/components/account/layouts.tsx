import { Outlet } from "@tanstack/react-router";
import { ScreenLayout } from "../layout/screen";

export function AccountScreenLayout() {
    return (
        <ScreenLayout>
            <Outlet />
        </ScreenLayout>
    );
}
