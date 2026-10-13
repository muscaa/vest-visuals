import { Outlet } from "@tanstack/react-router";
import { NavbarLayout } from "../layout/navbar";
import { Nav, NavActions, NavEntry, NavMenu, NavMenuEntry } from "../nav";
import { ThemeToggle } from "../theme";
import { LanguageToggle } from "../language-toggle";
import { AccountButton } from "../account-button";
import { Footer } from "../footer";
import { legalPages } from "../legal";
import { serviceGroups } from "./sections/services";

export function SoftwareNavbarLayout() {
    return (
        <NavbarLayout
            home={{ to: "/software" }}
            navigation={
                <Nav breakpoint="lg">
                    {
                        serviceGroups.map((group) => (
                            <NavMenu key={group.id} text={group.navTitle}>
                                {
                                    group.services.map((service) => (
                                        <NavMenuEntry key={service.title} text={service.title} {...service.link} />
                                    ))
                                }
                            </NavMenu>
                        ))
                    }
                    <NavEntry text="Portofoliu" to="/software" hash="portofoliu" />
                    <NavEntry text="Contact" to="/software/contact" />
                    <NavActions>
                        <LanguageToggle />
                        <ThemeToggle />
                        <AccountButton />
                    </NavActions>
                </Nav>
            }
            footer={
                <Footer
                    description="Software la comandă, cloud, date și automatizări, construite pentru felul în care lucrează afacerea ta."
                    sections={[
                        ...serviceGroups.map((group) => ({
                            title: group.title,
                            links: group.services.map((service) => ({
                                name: service.title,
                                ...service.link,
                            })),
                        })),
                        {
                            title: "Companie",
                            links: [
                                { name: "Portofoliu", to: "/software", hash: "portofoliu" },
                                { name: "Contact", to: "/software/contact" },
                            ],
                        },
                        {
                            title: "Legal",
                            links: legalPages("software"),
                        },
                    ]}
                />
            }
        >
            <Outlet />
        </NavbarLayout>
    );
}
