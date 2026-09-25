import { Outlet } from "@tanstack/react-router";
import { NavbarLayout } from "../layout/navbar";
import { Navigation } from "../navigation";

export function MediaNavbarLayout() {
    return (
        <NavbarLayout navigation={<Navigation>{/* TODO */}</Navigation>}>
            <Outlet />
        </NavbarLayout>
    );
}
