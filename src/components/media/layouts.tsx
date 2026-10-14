import { m } from "@shared/paraglide/messages";
import { Outlet } from "@tanstack/react-router";
import { NavbarLayout } from "../layout/navbar";
import { Nav, NavActions, NavEntry, NavMenu, NavMenuEntry } from "../nav";
import { ThemeToggle } from "../theme";
import { LanguageToggle } from "../language-toggle";
import { AccountButton } from "../account-button";
import { Footer } from "../footer";
import { legalPages } from "../legal";
import { mediaLocations } from "./location";
import { findMediaService } from "./service";
import type { MediaServiceId } from "./service";

/** The services, grouped like the navbar and the footer show them. */
const serviceGroups: { title: () => string; services: MediaServiceId[] }[] = [
    { title: m.media_nav_events, services: ["wedding", "christening", "18th-birthday"] },
    { title: m.media_nav_portraits, services: ["photo-session"] },
    { title: m.media_nav_commercial, services: ["real-estate", "automotive", "business-promotion"] },
];

export function MediaNavbarLayout() {
    return (
        <NavbarLayout
            home={{ to: "/media" }}
            navigation={(
                <Nav>
                    {
                        serviceGroups.map((group) => (
                            <NavMenu key={group.services[0]} text={group.title()}>
                                {
                                    group.services.map((id) => {
                                        const { name, image, ...link } = findMediaService(id);
                                        return <NavMenuEntry key={id} text={name()} {...link} />;
                                    })
                                }
                            </NavMenu>
                        ))
                    }
                    <NavEntry text={m.common_contact()} to="/media/contact" />
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
                        ...serviceGroups.map((group) => ({
                            title: group.title(),
                            links: group.services.map((id) => {
                                const { name, image, ...link } = findMediaService(id);
                                return { name: name(), ...link };
                            }),
                        })),
                        {
                            title: m.common_locations(),
                            links: mediaLocations.map(({ id, name, county, image, ...link }) => ({ name: name(), ...link })),
                        },
                        {
                            title: m.media_footer_studio(),
                            links: [
                                { name: m.media_footer_about(), to: "/media", hash: "about" },
                                { name: m.common_portfolio(), to: "/media", hash: "portfolio" },
                                { name: m.common_contact(), to: "/media/contact" },
                            ],
                        },
                        {
                            title: m.common_legal(),
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
