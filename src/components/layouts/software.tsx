import { NavbarLayout } from "./navbar";
import { Navbar } from "../navbar";
import { Footer } from "../footer";
import { LayoutProps } from ".";

export function SoftwareNavbarLayout(props: LayoutProps) {
    return (
        <NavbarLayout
            nav={
                <Navbar
                    entries={[
                        {
                            text: "HOME",
                            to: "/",
                        },
                        {
                            text: "SERVICES",
                            entries: [
                                {
                                    text: "Web Apps",
                                    to: "/",
                                },
                                {
                                    text: "Mobile Apps",
                                    to: "/",
                                },
                                {
                                    text: "Dashboards & Dataviz",
                                    to: "/",
                                },
                                {
                                    text: "Design Systems",
                                    to: "/",
                                },
                                {
                                    text: "AI integrations",
                                    to: "/",
                                },
                                {
                                    text: "Internal Tools",
                                    to: "/",
                                },
                                {
                                    text: "E-commerce",
                                    to: "/",
                                },
                                {
                                    text: "Platform engineering",
                                    to: "/",
                                },
                            ],
                        },
                        {
                            text: "CONTACT",
                            to: "/contact",
                        },
                    ]}
                />
            }
            footer={
                <Footer
                    sections={[
                        {
                            title: "Services",
                            links: [
                                {
                                    name: "Web Apps",
                                    to: "/",
                                },
                                {
                                    name: "Mobile Apps",
                                    to: "/",
                                },
                                {
                                    name: "Dashboards & Dataviz",
                                    to: "/",
                                },
                                {
                                    name: "Design Systems",
                                    to: "/",
                                },
                                {
                                    name: "AI integrations",
                                    to: "/",
                                },
                                {
                                    name: "Internal Tools",
                                    to: "/",
                                },
                                {
                                    name: "E-commerce",
                                    to: "/",
                                },
                                {
                                    name: "Platform engineering",
                                    to: "/",
                                },
                            ],
                        },
                        {
                            title: "Company",
                            links: [
                                {
                                    name: "Terms of service",
                                    to: "/terms-of-service",
                                },
                                {
                                    name: "Privacy policy",
                                    to: "/privacy-policy",
                                },
                                {
                                    name: "Cookie policy",
                                    to: "/cookie-policy",
                                },
                                {
                                    name: "Contact",
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
