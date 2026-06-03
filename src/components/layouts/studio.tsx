import { NavbarLayout } from "./navbar";
import { Navbar } from "../navbar";
import { LayoutProps } from ".";

export function StudioNavbarLayout(props: LayoutProps) {
    return (
        <NavbarLayout
            nav={
                <Navbar
                    entries={[
                        {
                            text: "ACASA",
                            to: "/",
                        },
                        {
                            text: "EVENIMENTE",
                            entries: [
                                {
                                    text: "MAJORAT",
                                    to: "/services/18th-birthday",
                                },
                                {
                                    text: "NUNTA",
                                    to: "/services/wedding",
                                },
                                {
                                    text: "BOTEZ",
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
                            text: "PORTRETE",
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
                                    text: "SEDINTA FOTO", // LUMINA NATURALA (OUTDOOR)
                                    to: "/services/outdoor",
                                },
                            ],
                        },
                        {
                            text: "COMERCIAL",
                            entries: [
                                {
                                    text: "IMOBILIARE (REAL ESTATE)",
                                    to: "/services/real-estate",
                                },
                                {
                                    text: "AUTOMOTIVE",
                                    to: "/services/automotive",
                                },
                                // {
                                //     text: "PRODUSE E-COMMERCE",
                                //     to: CONTACT(),
                                // },
                                {
                                    text: "PROMOVARE FIRME (MARKETING)",
                                    to: "/services/marketing",
                                },
                            ],
                        },
                        // {
                        //     text: "PORTOFOLIU",
                        //     to: PORTFOLIO(),
                        // },
                        {
                            text: "CONTACT",
                            to: "/contact",
                        },
                    ]}
                />
            }
        >
            {props.children}
        </NavbarLayout>
    );
}
