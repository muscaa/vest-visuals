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
                        "https://cdn0.vestvisuals.ro/portfolio/yu9eomg0ef4f66u2gpbqws4t/large", // majorate
                        "https://cdn0.vestvisuals.ro/portfolio/yio20oo5vxfs18cxm925k3fy/large", // majorate
                        "https://cdn0.vestvisuals.ro/portfolio/x7nxyoz3hwdezu4tr33kb4gw/large", // majorate
                        "https://cdn0.vestvisuals.ro/portfolio/dozugwupvkafsmnpxtsc55f7/large", // majorate
                        "https://cdn0.vestvisuals.ro/portfolio/a8rm9fhczl4px321ladxwrft/large", // outdoor
                        // "https://s3.vestvisuals.ro/portfolio/zz9zwk8shj6zvb0esbwq3z0q/large", // automotive
                        // "https://s3.vestvisuals.ro/portfolio/y4g068yl6ce1o3bspivi5r5p/large", // real estate
                        // "https://s3.vestvisuals.ro/portfolio/z42sd0lf54pzm9abaomt9ybb/large", // marketing
                    ],
                }}
                about={{
                    title: "Cine suntem noi?",
                    description: "Suntem o echipă pasionată de fotografie și videografie, dedicată să transformăm momentele speciale în amintiri de neuitat. Cu o abordare creativă și atenție la detalii, spunem povești vizuale autentice, indiferent că este vorba de o nuntă, un eveniment corporate sau ceva personal. Credem în emoție, naturalețe și profesionalism.",
                }}
                portfolio={{
                    title: "Portofoliu",
                    categories: [
                        {
                            name: "majorate",
                            href: "/portfolio/18th-birthday",
                            cover: "https://s3.vestvisuals.ro/portfolio/b4dwo04rs8ta7na0zzbflpuv/medium",
                        },
                        {
                            name: "sedinte foto",
                            href: "/portfolio/outdoor",
                            cover: "https://s3.vestvisuals.ro/portfolio/l1xhekvxbakado1gh18v7ged/medium",
                        },
                        {
                            name: "automotive",
                            href: "/portfolio/automotive",
                            cover: "https://s3.vestvisuals.ro/portfolio/z34362mh88we0urk97td85ax/medium",
                        },
                        {
                            name: "imobiliare",
                            href: "/portfolio/real-estate",
                            cover: "https://s3.vestvisuals.ro/portfolio/f64uxutmybs9iuc08j1cp73y/medium",
                        },
                        {
                            name: "promovare firme",
                            href: "/portfolio/marketing",
                            cover: "https://s3.vestvisuals.ro/portfolio/vznmbjtg6w9lltk0uyr5ex2e/medium",
                        },
                    ],
                }}
                benefits={{
                    title: "De ce sa ne alegi?",
                    perks: [
                        {
                            icon: Heart,
                            title: "Suntem nerăbdărori să aflăm povestea voastră ",
                            description: "Pentru noi, totul pornește de la emoție. Transformăm momentele voastre în povești fotografice care transmit bucurie pură și te fac să retrăiești fiecare zâmbet, de fiecare dată.",
                        },
                    ],
                }}
                team={{
                    title: "Echipa",
                    members: [
                        {
                            name: "David",
                            image: "https://cdn0.vestvisuals.ro/assets/mw9i6zen7sd4tlxyl6d34c8o/medium",
                            roles: [
                                "videograf",
                                "fotograf",
                                "editor video",
                            ],
                            email: "david@vestvisuals.ro",
                            socials: {
                                instagram: "https://www.instagram.com/david.bostina/",
                            },
                        },
                        {
                            name: "Mihail",
                            image: "https://cdn0.vestvisuals.ro/assets/ikhrfkmpuq731hm81z4qfo5n/medium",
                            roles: [
                                "fotograf",
                                "editor foto",
                                "editor video",
                            ],
                            email: "mihail@vestvisuals.ro",
                            socials: {
                                instagram: "https://www.instagram.com/musca.mihail/",
                            },
                        },
                    ],
                }}
                testimonials={{
                    title: "Testimoniale",
                    reviews: [
                        {
                            name: "Bara Denis",
                            image: "https://cdn0.vestvisuals.ro/portfolio/dafy5npxf0li1130hhap5tvo/small",
                            score: 5,
                            date: "22 mar 2026",
                            description: "Pozele au iesit super, va multumim mult de tot!!!! Le-am pus pe instagram cu drag, atat eu cat si iubita mea!"
                        },
                        {
                            name: "Ionut Condescu",
                            image: "https://cdn0.vestvisuals.ro/portfolio/uabl3f0ndb4hby7tf428qj9e/small",
                            score: 5,
                            date: "21 mar 2026",
                            description: "Multumim pentru poze, au ieșit super frumoase! Recomandam serviciile!"
                        },
                        {
                            name: "Oana",
                            image: "https://cdn0.vestvisuals.ro/portfolio/m3u1fne49flwng97jamw3avp/small",
                            score: 5,
                            date: "14 feb 2026",
                            description: "Va multumim din suflet pentru tot! Ati fost minunați!"
                        },
                        {
                            name: "Vladescu Razvan",
                            image: "https://cdn0.vestvisuals.ro/portfolio/f64uxutmybs9iuc08j1cp73y/small",
                            score: 5,
                            date: "31 aug 2025",
                            description: "Pozele la apartamentul meu au iesit foarte bine! M-au ajutat sa gasesc clienti si sa-l vand foarte repede. Punctualitate si profesionalism. Recomand!"
                        },
                        {
                            name: "Patrick Sabau",
                            image: "https://cdn0.vestvisuals.ro/portfolio/ok1f6eurgum0dnwollokpqzv/small",
                            score: 5,
                            date: "16 iun 2025",
                            description: "Baietii de la Vest Visuals mi-au ajutat cu niste poze si videoclipuri excelente pentru masina mea. Sunt foarte Multumit"
                        },
                    ],
                }}
            />
        </NavbarLayout>
    );
}
