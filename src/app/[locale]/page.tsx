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
                        "https://s3.vestvisuals.ro/portfolio/zz9zwk8shj6zvb0esbwq3z0q/large",
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
                            href: "/portfolio/majorate",
                            cover: "https://s3.vestvisuals.ro/public/media/bz4jjbrb93t152zefgi4fzqn/medium",
                        },
                        {
                            name: "portrete",
                            href: "/portfolio/outdoor",
                            cover: "https://s3.vestvisuals.ro/portfolio/l1xhekvxbakado1gh18v7ged/medium",
                        },
                        {
                            name: "automotive",
                            href: "/portfolio/automotive",
                            cover: "https://s3.vestvisuals.ro/portfolio/z34362mh88we0urk97td85ax/medium",
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
                            image: "https://s3.vestvisuals.ro/assets/b5aper1c72hhuu0do4wcr1gs/medium",
                            roles: [
                                "videograf",
                                "fotograf",
                                "editor video",
                            ],
                            email: "david@vestvisuals.ro",
                            socials: {
                                instagram: "https://www.instagram.com/david.bostina/",
                                facebook: "https://www.facebook.com/david.bostina/",
                                linkedin: "https://www.linkedin.com/in/david-bostinas-a52989390/",
                            },
                        },
                        {
                            name: "Mihail",
                            image: "https://s3.vestvisuals.ro/assets/sea7b5p5ozm5iupyd3qc57rm/medium",
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
