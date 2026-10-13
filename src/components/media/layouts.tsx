import { Outlet } from "@tanstack/react-router";
import { NavbarLayout } from "../layout/navbar";
import { Nav, NavActions, NavEntry, NavMenu, NavMenuEntry } from "../nav";
import { ThemeToggle } from "../theme";
import { LanguageToggle } from "../language-toggle";
import { AccountButton } from "../account-button";
import { Footer } from "../footer";
import { legalPages } from "../legal";
import { mediaLocations } from "./location";

export function MediaNavbarLayout() {
    return (
        <NavbarLayout
            home={{ to: "/media" }}
            navigation={(
                <Nav>
                    <NavMenu text="Events">
                        <NavMenuEntry text="18th Birthday" to="/media/services/18th-birthday" />
                        <NavMenuEntry text="Wedding" to="/media/services/wedding" />
                        <NavMenuEntry text="Christening" to="/media/services/christening" />
                    </NavMenu>
                    <NavMenu text="Portraits">
                        <NavMenuEntry text="Photo session" to="/media/services/photo-session" />
                    </NavMenu>
                    <NavMenu text="Commercial">
                        <NavMenuEntry text="Real Estate" to="/media/services/real-estate" />
                        <NavMenuEntry text="Automotive" to="/media/services/automotive" />
                        <NavMenuEntry text="Business Promotion" to="/media/services/business-promotion" />
                    </NavMenu>
                    <NavEntry text="Contact" to="/media/contact" />
                    <NavActions>
                        <LanguageToggle />
                        <ThemeToggle />
                        <AccountButton />
                    </NavActions>
                </Nav>
            )}
            footer={(
                <Footer
                    sections={[
                        {
                            title: "Evenimente",
                            links: [
                                { name: "Nunți", to: "/media/services/wedding" },
                                { name: "Botezuri", to: "/media/services/christening" },
                                { name: "Majorate", to: "/media/services/18th-birthday" },
                            ],
                        },
                        {
                            title: "Portrete",
                            links: [{ name: "Ședințe foto", to: "/media/services/photo-session" }],
                        },
                        {
                            title: "Comercial",
                            links: [
                                { name: "Imobiliare", to: "/media/services/real-estate" },
                                { name: "Automotive", to: "/media/services/automotive" },
                                { name: "Promovare afaceri", to: "/media/services/business-promotion" },
                            ],
                        },
                        {
                            title: "Locații",
                            links: mediaLocations.map(({ name, image, county, ...link }) => ({ name, ...link })),
                        },
                        {
                            title: "Studio",
                            links: [
                                { name: "Despre noi", to: "/media", hash: "about" },
                                { name: "Portofoliu", to: "/media", hash: "portfolio" },
                                { name: "Contact", to: "/media/contact" },
                            ],
                        },
                        {
                            title: "Legal",
                            links: legalPages("media"),
                        },
                    ]}
                />
            )}
        >
            <Outlet />
        </NavbarLayout>
    );
}
