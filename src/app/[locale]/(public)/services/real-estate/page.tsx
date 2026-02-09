"use client";

import { ServicePage } from "@/components/pages/service";
import { CalendarCheck, Camera, Clock, Hourglass, Images, Video, Zap } from "lucide-react";

export default function Page() {
    return (
        <ServicePage
            preview={{
                title: "Fotograf de Evenimente și Povești Autentice",
                description: "Surprindem emoții, nu doar imagini. Servicii foto-video pentru nunți, portrete și business în Timișoara și în țară.",
                images: [
                    "https://s3.vestvisuals.ro/portfolio/f64uxutmybs9iuc08j1cp73y/large",
                    "https://s3.vestvisuals.ro/portfolio/hwktjt5gmgoefmt69q3fckiv/large",
                    "https://s3.vestvisuals.ro/portfolio/dl07n8adsot5whobspse96kv/large",
                ],
            }}
            price={{
                title: "Preturi si Oferte 2026",
                offers: [
                    // {
                    //     icon: Camera,
                    //     title: "Fotografie",
                    //     price: "800",
                    //     currency: "€",
                    //     button: "Rezerva Fotograf",
                    //     highlight: "RECOMANDAT",
                    //     accent: true,
                    //     features: [
                    //         ["Prezența unui fotograf pe toată durata nunții, max 15 ore", Clock],
                    //         ["Galerie online customizabilă", Images],
                    //         ["Fotografii disponibile cel putin 12 luni", CalendarCheck],
                    //         ["Same Day Edit 25 fotografii", Zap],
                    //         ["Predare in 30 zile", Hourglass],
                    //     ],
                    // },
                    // {
                    //     icon: Video,
                    //     title: "Videografie",
                    //     price: "800",
                    //     currency: "€",
                    //     button: "Rezerva Videograf",
                    //     features: [
                    //         ["Prezența unui fotograf pe toată durata nunții, max 15 ore"],
                    //         ["Galerie online customizabilă", Images],
                    //         ["Fotografii disponibile cel putin 12 luni", CalendarCheck],
                    //         ["Same Day Edit 25 fotografii"],
                    //         ["Predare in 30 zile", Hourglass],
                    //     ],
                    // },
                ],
                // extra: {
                //     title: "Extra (Optional)",
                //     offers: [
                //         {
                //             title: "FOTOGRAF SECUNDAR",
                //             price: "400",
                //             currency: "€",
                //         },
                //     ],
                // },
            }}
            faq={{
                title: "Intrebari Frecvente (FAQ)",
                qna: [
                    [
                        "Câte fotografii vom primi și în cât timp?",
                        <>
                            <p>
                                Numărul de fotografii variază în funcție de pachetul ales și durata ședinței, dar în medie livrăm între 10-40 de fotografii editate în termen de 7 zile, in functie de dimensiunile proprietatii.
                            </p>
                        </>
                    ],
                    [
                        "Oferiți și filmare?",
                        <>
                            <p>
                                In functie de pachetul selectat, oferim 1-3 videoclipuri (verticale - excelente pentru promovarea pe social media sau orizontale).
                            </p>
                        </>
                    ],
                    [
                        "Cum ar trebui sa imi pregatesc imobilul pentru sedinta foto?",
                        <>
                            <p>
                                Pentru poze excelente recomandam ca imobilul sa fie curat, aranjat, lenejrie alba de pat (preferabil), iar obiectele personale sa nu fie vizibile.
                            </p>
                        </>
                    ],
                    [
                        "Oferiti discount pentru mai multe proprietati?",
                        <>
                            <p>
                                Desigur, pentru mai multe proprietati oferim discount incepand cu 10%. Pentru oferte personalizate, va rugam sa ne contactati.
                            </p>
                        </>
                    ],
                ],
            }}
        />
    );
}
