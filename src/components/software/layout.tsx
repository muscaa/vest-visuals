"use client";

import { Navbar } from "../navbar";
import { Footer } from "../footer";
import { NavbarLayout } from "../layouts/navbar";
import { LayoutProps } from "../layouts";
import { useTranslations } from "next-intl";

export function SoftwareNavbarLayout(props: LayoutProps) {
    const t = useTranslations("Software.Components.navbar-layout");

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
                            text: t("nav.services"),
                            entries: [
                                {
                                    text: t("nav.services-product-engineering"),
                                    to: "/",
                                },
                                {
                                    text: t("nav.services-internal-systems"),
                                    to: "/",
                                },
                                {
                                    text: t("nav.services-data-and-infrastructure"),
                                    to: "/",
                                },
                                {
                                    text: t("nav.services-technical-partnership"),
                                    to: "/",
                                },
                            ],
                        },
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
                            title: t("footer.services"),
                            links: [
                                {
                                    name: t("footer.services-product-engineering"),
                                    to: "/",
                                },
                                {
                                    name: t("footer.services-internal-systems"),
                                    to: "/",
                                },
                                {
                                    name: t("footer.services-data-and-infrastructure"),
                                    to: "/",
                                },
                                {
                                    name: t("footer.services-technical-partnership"),
                                    to: "/",
                                },
                            ],
                        },
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
