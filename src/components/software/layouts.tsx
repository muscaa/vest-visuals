import { m } from "@shared/paraglide/messages";
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
                            <NavMenu key={group.id} text={group.navTitle()}>
                                {
                                    group.services.map((service) => (
                                        <NavMenuEntry key={service.id} text={service.title()} {...service.link} />
                                    ))
                                }
                            </NavMenu>
                        ))
                    }
                    <NavEntry text={m.common_portfolio()} to="/software" hash="portfolio" />
                    <NavEntry text={m.common_contact()} to="/software/contact" />
                    <NavActions>
                        <LanguageToggle />
                        <ThemeToggle />
                        <AccountButton />
                    </NavActions>
                </Nav>
            }
            footer={
                <Footer
                    description={m.software_footer_description()}
                    sections={[
                        ...serviceGroups.map((group) => ({
                            title: group.title(),
                            links: group.services.map((service) => ({
                                name: service.title(),
                                ...service.link,
                            })),
                        })),
                        {
                            title: m.software_company(),
                            links: [
                                { name: m.common_portfolio(), to: "/software", hash: "portfolio" },
                                { name: m.common_contact(), to: "/software/contact" },
                            ],
                        },
                        {
                            title: m.common_legal(),
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
