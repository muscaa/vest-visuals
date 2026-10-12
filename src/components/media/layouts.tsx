import { Outlet } from "@tanstack/react-router";
import { NavbarLayout } from "../layout/navbar";
import { Nav, NavActions, NavEntry, NavMenu, NavMenuEntry } from "../nav";
import { ThemeToggle } from "../theme";
import { LanguageToggle } from "../language-toggle";
import { Footer } from "../footer";

export function MediaNavbarLayout() {
    return (
        <NavbarLayout
            navigation={(
                <Nav>
                    <NavEntry text="Home" to="/media" />
                    <NavMenu text="Events">
                        <NavMenuEntry text="18th Birthday" />
                        <NavMenuEntry text="Wedding" />
                        <NavMenuEntry text="Christening" />
                    </NavMenu>
                    <NavMenu text="Portraits">
                        <NavMenuEntry text="Photo session" />
                    </NavMenu>
                    <NavMenu text="Commercial">
                        <NavMenuEntry text="Real Estate" />
                        <NavMenuEntry text="Automotive" />
                        <NavMenuEntry text="Business Promotion" />
                    </NavMenu>
                    <NavEntry text="Contact" to="/media/contact" />
                    <NavActions>
                        <ThemeToggle />
                        <LanguageToggle />
                    </NavActions>
                </Nav>
            )}
            footer={(
                <Footer
                    sections={[
                        {
                            title: "Evenimente",
                            links: [
                                { name: "Nunți" },
                                { name: "Botezuri" },
                                { name: "Majorate" },
                            ],
                        },
                        {
                            title: "Portrete",
                            links: [{ name: "Ședințe foto" }],
                        },
                        {
                            title: "Comercial",
                            links: [
                                { name: "Imobiliare" },
                                { name: "Automotive" },
                                { name: "Promovare afaceri" },
                            ],
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
                            links: [
                                { name: "Termeni și condiții" },
                                { name: "Confidențialitate" },
                                { name: "Cookies" },
                            ],
                        },
                    ]}
                />
            )}
        >
            <Outlet />
        </NavbarLayout>
    );
}
