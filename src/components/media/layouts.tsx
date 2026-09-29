import { Outlet } from "@tanstack/react-router";
import { NavbarLayout } from "../layout/navbar";
import { Nav, NavEntry, NavMenu, NavMenuEntry } from "../nav";

export function MediaNavbarLayout() {
    return (
        <NavbarLayout
            navigation={(
                <Nav>
                    <NavEntry
                        text="Home"
                        to="/media"
                    />
                    <NavMenu text="Events">
                        <NavMenuEntry
                            text="18th Birthday"
                        />
                        <NavMenuEntry
                            text="Wedding"
                        />
                        <NavMenuEntry
                            text="Christening"
                        />
                    </NavMenu>
                    <NavMenu text="Portraits">
                        <NavMenuEntry
                            text="Photo session"
                        />
                    </NavMenu>
                    <NavMenu text="Commercial">
                        <NavMenuEntry
                            text="Real Estate"
                        />
                        <NavMenuEntry
                            text="Automotive"
                        />
                        <NavMenuEntry
                            text="Business Promotion"
                        />
                    </NavMenu>
                    <NavEntry
                        text="Contact"
                    />
                </Nav>
            )}
        >
            <Outlet />
        </NavbarLayout>
    );
}
