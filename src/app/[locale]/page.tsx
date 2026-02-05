"use client";

import { NavbarLayout } from "@/components/layout";
import { HomePage } from "@/components/pages/home";

export default function Page() {
    return (
        <NavbarLayout>
            <HomePage
                preview={{
                    title: "Fotograf de Evenimente și Povești Autentice",
                    description: "Surprindem emoții, nu doar imagini. Servicii foto-video pentru nunți, portrete și business în Timișoara și în țară.",
                    images: [
                        "http://192.168.0.155:9000/assets/p6axvqo8qotsols2e0s1f4zh/large",
                        "http://192.168.0.155:9000/assets/p6axvqo8qotsols2e0s1f4zh/large",
                    ],
                }}
                team={{
                    members: [
                        {
                            name: "David",
                            image: "https://s3.vestvisuals.ro/public/media/uo7rqysv9ick53seuo9yelyx/medium",
                            roles: [
                                "videograf",
                                "fotograf",
                                "editor video"
                            ],
                            email: "david@vestvisuals.ro",
                            socials: {
                                instagram: "https://www.instagram.com/david.bostina/",
                                facebook: "https://www.facebook.com/david.bostina/"
                            }
                        },
                        {
                            name: "Mihail",
                            image: "https://s3.vestvisuals.ro/public/media/qbw9108bwpie9l7mxuu2nwea/medium",
                            roles: [
                                "fotograf",
                                "editor foto",
                                "editor video"
                            ],
                            email: "mihail@vestvisuals.ro",
                            socials: {
                                instagram: "https://www.instagram.com/musca.mihail/",
                                facebook: "https://www.facebook.com/mihailmusca/",
                                linkedin: "https://www.linkedin.com/in/muscaa/"
                            }
                        }
                    ],
                }}
            />
        </NavbarLayout>
    );
}
