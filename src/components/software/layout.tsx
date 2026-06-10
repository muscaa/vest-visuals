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
                                    text: t("nav.services-web-development"),
                                    to: "/",
                                },
                                {
                                    text: t("nav.services-mobile-development"),
                                    to: "/",
                                },
                                {
                                    text: t("nav.services-cloud-and-devops"),
                                    to: "/",
                                },
                                {
                                    text: t("nav.services-business-intelligence"),
                                    to: "/",
                                },
                                {
                                    text: t("nav.services-workflow-automation"),
                                    to: "/",
                                },
                                {
                                    text: t("nav.services-data-engineering"),
                                    to: "/",
                                },
                                {
                                    text: t("nav.services-technical-consulting"),
                                    to: "/",
                                },
                                {
                                    text: t("nav.services-support-and-maintenance"),
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
                                    name: t("footer.services-web-development"),
                                    to: "/",
                                },
                                {
                                    name: t("footer.services-mobile-development"),
                                    to: "/",
                                },
                                {
                                    name: t("footer.services-cloud-and-devops"),
                                    to: "/",
                                },
                                {
                                    name: t("footer.services-business-intelligence"),
                                    to: "/",
                                },
                                {
                                    name: t("footer.services-workflow-automation"),
                                    to: "/",
                                },
                                {
                                    name: t("footer.services-data-engineering"),
                                    to: "/",
                                },
                                {
                                    name: t("footer.services-technical-consulting"),
                                    to: "/",
                                },
                                {
                                    name: t("footer.services-support-and-maintenance"),
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
