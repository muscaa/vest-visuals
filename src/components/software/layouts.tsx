import { Outlet } from "@tanstack/react-router";
import { NavbarLayout } from "../layout/navbar";
import { Nav, NavActions, NavEntry, NavMenu, NavMenuEntry } from "../nav";
import { ThemeToggle } from "../theme";
import { LanguageToggle } from "../language-toggle";
import { Footer } from "../footer";
import { serviceGroups } from "./sections/services";

export function SoftwareNavbarLayout() {
    return (
        <NavbarLayout
            navigation={
                <Nav>
                    <NavEntry text="Acasă" to="/software" />
                    <NavMenu text="Servicii">
                        {
                            serviceGroups.map((group) => (
                                <NavMenuEntry
                                    key={group.id}
                                    text={group.title}
                                    to="/software"
                                    hash={group.id}
                                />
                            ))
                        }
                    </NavMenu>
                    <NavEntry text="Portofoliu" to="/software" hash="portofoliu" />
                    <NavEntry text="Contact" to="/software/contact" />
                    <NavActions>
                        <ThemeToggle />
                        <LanguageToggle />
                    </NavActions>
                </Nav>
            }
            footer={
                <Footer
                    description="Software la comandă, cloud, date și automatizări, construite pentru felul în care lucrează afacerea ta."
                    sections={[
                        {
                            title: "Servicii",
                            links: serviceGroups.map((group) => ({
                                name: group.title,
                                to: "/software",
                                hash: group.id,
                            })),
                        },
                        {
                            title: "Companie",
                            links: [
                                { name: "Portofoliu", to: "/software", hash: "portofoliu" },
                                { name: "Contact", to: "/software/contact" },
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
            }
        >
            <Outlet />
        </NavbarLayout>
    );
}
