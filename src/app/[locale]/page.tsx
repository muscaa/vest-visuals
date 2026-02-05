"use client";

import { NavbarLayout } from "@/components/layout";
import { HomePage } from "@/components/pages/home";
import { Heart } from "lucide-react";

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
                portfolio={{
                    title: "Portofoliu",
                    categories: [
                        {
                            name: "majorate",
                            href: "/portfolio/majorate",
                            cover: "https://s3.vestvisuals.ro/public/media/bz4jjbrb93t152zefgi4fzqn/medium",
                        },
                        {
                            name: "portrete",
                            href: "/portfolio/portrete",
                            cover: "https://s3.vestvisuals.ro/public/media/cd8m1bfe6oufkiyid6fi5ds9/medium",
                        },
                        {
                            name: "automotive",
                            href: "/portfolio/automotive",
                            cover: "https://s3.vestvisuals.ro/public/media/ppudsek2ua9vitncc9tsbhc8/medium",
                        },
                        {
                            name: "real estate",
                            href: "/portfolio/real-estate",
                            cover: "https://s3.vestvisuals.ro/public/media/c90y98x999s1rp9zaru4i82i/medium",
                        },
                        {
                            name: "business",
                            href: "/portfolio/business",
                            cover: "https://s3.vestvisuals.ro/public/media/clip1232mungg5cc67o2ssap/medium",
                        },
                    ],
                }}
                benefits={{
                    title: "De ce sa ne alegi?",
                    perks: [
                        {
                            icon: Heart,
                            title: "Sunt nerăbdăror să aflu povestea voastră ",
                            description: "Emoția și momentul sunt rețeta perfectă. Pentru că îmi place să creez povestea prin fotografii care să ajungă direct la suflet, să transmită emoții pure care să te facă să zâmbești mereu.",
                        },
                        {
                            icon: Heart,
                            title: "Sunt nerăbdăror să aflu povestea voastră ",
                            description: "Emoția și momentul sunt rețeta perfectă. Pentru că îmi place să creez povestea prin fotografii care să ajungă direct la suflet, să transmită emoții pure care să te facă să zâmbești mereu.",
                        },
                        {
                            icon: Heart,
                            title: "Sunt nerăbdăror să aflu povestea voastră ",
                            description: "Emoția și momentul sunt rețeta perfectă. Pentru că îmi place să creez povestea prin fotografii care să ajungă direct la suflet, să transmită emoții pure care să te facă să zâmbești mereu.",
                        },
                    ],
                }}
                team={{
                    title: "Echipa",
                    members: [
                        {
                            name: "David",
                            image: "https://s3.vestvisuals.ro/public/media/uo7rqysv9ick53seuo9yelyx/medium",
                            roles: [
                                "videograf",
                                "fotograf",
                                "editor video",
                            ],
                            email: "david@vestvisuals.ro",
                            socials: {
                                instagram: "https://www.instagram.com/david.bostina/",
                                facebook: "https://www.facebook.com/david.bostina/",
                            },
                        },
                        {
                            name: "Mihail",
                            image: "https://s3.vestvisuals.ro/public/media/qbw9108bwpie9l7mxuu2nwea/medium",
                            roles: [
                                "fotograf",
                                "editor foto",
                                "editor video",
                            ],
                            email: "mihail@vestvisuals.ro",
                            socials: {
                                instagram: "https://www.instagram.com/musca.mihail/",
                                facebook: "https://www.facebook.com/mihailmusca/",
                                linkedin: "https://www.linkedin.com/in/muscaa/",
                            },
                        },
                    ],
                }}
            />
        </NavbarLayout>
    );
}
