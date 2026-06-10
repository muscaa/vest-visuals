"use client";

import { Navbar } from "../navbar";
import { Footer } from "../footer";
import { NavbarLayout } from "../layouts/navbar";
import { LayoutProps } from "../layouts";
import { useTranslations } from "next-intl";

export function MediaNavbarLayout(props: LayoutProps) {
    const t = useTranslations("Media.Components.navbar-layout");

    return (
        <NavbarLayout
            nav={
                <Navbar
                    entries={[
                        {
                            text: t("nav.home"),
                            to: "/",
                        },
                        {
                            text: t("nav.events"),
                            entries: [
                                {
                                    text: t("nav.events-18th-birthday"),
                                    to: "/services/18th-birthday",
                                },
                                {
                                    text: t("nav.events-wedding"),
                                    to: "/services/wedding",
                                },
                                {
                                    text: t("nav.events-christening"),
                                    to: "/services/christening",
                                },
                                // {
                                //     text: "ANIVERSARE",
                                //     to: CONTACT(),
                                // },
                                // {
                                //     text: "BUSINESS / CORPORATE",
                                //     to: CONTACT(),
                                // },
                            ],
                        },
                        {
                            text: t("nav.portraits"),
                            entries: [
                                // {
                                //     text: "PORTRETE OFICIALE",
                                //     to: CONTACT(),
                                // },
                                // {
                                //     text: "ALBUME ABSOLVIRE",
                                //     to: CONTACT(),
                                // },
                                // {
                                //     text: "MATERNITATE",
                                //     to: CONTACT(),
                                // },
                                // {
                                //     text: "NOU-NASCUTI",
                                //     to: CONTACT(),
                                // },
                                // {
                                //     text: "STUDIO",
                                //     to: CONTACT(),
                                // },
                                {
                                    text: t("nav.portraits-outdoor"), // LUMINA NATURALA (OUTDOOR)
                                    to: "/services/outdoor",
                                },
                            ],
                        },
                        {
                            text: t("nav.commercial"),
                            entries: [
                                {
                                    text: t("nav.commercial-real-estate"),
                                    to: "/services/real-estate",
                                },
                                {
                                    text: t("nav.commercial-automotive"),
                                    to: "/services/automotive",
                                },
                                // {
                                //     text: "PRODUSE E-COMMERCE",
                                //     to: CONTACT(),
                                // },
                                {
                                    text: t("nav.commercial-marketing"),
                                    to: "/services/marketing",
                                },
                            ],
                        },
                        // {
                        //     text: "PORTOFOLIU",
                        //     to: PORTFOLIO(),
                        // },
                        {
                            text: t("nav.contact"),
                            to: "/contact",
                        },
                    ]}
                />
            }
            footer={
                <Footer
                    sections={[
                        {
                            title: t("footer.company"),
                            links: [
                                {
                                    name: t("footer.company-terms-of-service"),
                                    to: "/terms-of-service",
                                },
                                {
                                    name: t("footer.company-privacy-policy"),
                                    to: "/privacy-policy",
                                },
                                {
                                    name: t("footer.company-cookie-policy"),
                                    to: "/cookie-policy",
                                },
                                {
                                    name: t("footer.company-contact"),
                                    to: "/contact",
                                },
                            ],
                        },
                    ]}
                />
            }
        >
            {props.children}
        </NavbarLayout>
    );
}
