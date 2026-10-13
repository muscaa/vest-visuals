import { Outlet } from "@tanstack/react-router";
import { NavbarLayout } from "../layout/navbar";
import { Nav, NavActions, NavEntry } from "../nav";
import { ThemeToggle } from "../theme";
import { LanguageToggle } from "../language-toggle";
import { AccountButton } from "../account-button";
import { Footer } from "../footer";
import { legalPages } from "../legal";
import { divisions } from "./sections/hero";

export function HomeNavbarLayout() {
    return (
        <NavbarLayout
            navigation={
                <Nav>
                    {divisions.map((division) => (
                        <NavEntry key={division.id} text={division.name} {...division.link} />
                    ))}
                    <NavEntry text="Contact" to="/home/contact" />
                    <NavActions>
                        <LanguageToggle />
                        <ThemeToggle />
                        <AccountButton />
                    </NavActions>
                </Nav>
            }
            footer={
                <Footer
                    description="Software, foto și video pentru clienți din toată Europa, cu echipe dedicate pentru fiecare domeniu."
                    sections={[
                        ...divisions.map((division) => ({
                            title: division.name,
                            links: division.services,
                        })),
                        {
                            title: "Legal",
                            links: legalPages("home"),
                        },
                    ]}
                />
            }
        >
            <Outlet />
        </NavbarLayout>
    );
}
