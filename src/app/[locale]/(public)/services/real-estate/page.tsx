"use client";

import { ServicePage } from "@/components/pages/service";
import { CalendarCheck, Camera, Clock, Cloud, Film, Hourglass, Image, Images, Video, Zap } from "lucide-react";

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
                    {
                        icon: Camera,
                        title: "Fotografie Apartament",
                        price: "100",
                        currency: "€",
                        button: "Rezerva Fotograf",
                        features: [
                            ["Durată: 1 oră", Clock],
                            ["Fotografii disponibile 1 lună într-un album digital", Cloud],
                            ["Între 10 și 30 de fotografii editate", Image],
                            ["Predare în 7 zile", Hourglass],
                        ],
                    },
                    {
                        icon: Camera,
                        title: "Fotografie Casă / Vilă",
                        price: "150",
                        currency: "€",
                        button: "Rezerva Fotograf",
                        features: [
                            ["Durată: 1 oră 30 minute", Clock],
                            ["Fotografii disponibile 1 lună într-un album digital", Cloud],
                            ["Între 20 și 40 de fotografii editate", Image],
                            ["Predare în 7 zile", Hourglass],
                        ],
                    },
                    {
                        icon: Camera,
                        title: "Fotografie Spațiu Comercial",
                        price: "200",
                        currency: "€",
                        button: "Rezerva Fotograf",
                        features: [
                            ["Durată: 1 oră+", Clock],
                            ["Fotografii disponibile 1 lună într-un album digital", Cloud],
                            ["Minim 20 de fotografii editate", Image],
                            ["Predare în 7 zile", Hourglass],
                        ],
                    },
                    {
                        icon: Video,
                        title: "Videografie Apartament",
                        price: "100",
                        currency: "€",
                        button: "Rezerva Videograf",
                        features: [
                            ["Durată: 1 oră", Clock],
                            ["Videoclipuri disponibile 1 lună într-un album digital", Cloud],
                            ["Videoclip lung stil trailer/teaser (1-3 minute) sau 2 videoclipuri scurte tip Reels/TikTok", Film],
                            ["Predare în 7 zile", Hourglass],
                        ],
                    },
                    {
                        icon: Video,
                        title: "Videografie Casă / Vilă",
                        price: "150",
                        currency: "€",
                        button: "Rezerva Videograf",
                        features: [
                            ["Durată: 1 oră 30 minute", Clock],
                            ["Videoclipuri disponibile 1 lună într-un album digital", Cloud],
                            ["Videoclip lung stil trailer/teaser (2-4 minute) sau 3 videoclipuri scurte tip Reels/TikTok", Film],
                            ["Predare în 7 zile", Hourglass],
                        ],
                    },
                    {
                        icon: Video,
                        title: "Videografie Spațiu Comercial",
                        price: "250",
                        currency: "€",
                        button: "Rezerva Videograf",
                        features: [
                            ["Durată: 1 oră+", Clock],
                            ["Videoclipuri disponibile 1 lună într-un album digital", Cloud],
                            ["Videoclip lung stil trailer/teaser (2-5 minute) sau 3 videoclipuri scurte tip Reels/TikTok", Film],
                            ["Predare în 7 zile", Hourglass],
                        ],
                    },
                ],
                extra: {
                    title: "Extra (Optional)",
                    offers: [
                        {
                            title: "Livrare rapidă (24-48 de ore)",
                            price: "20",
                            currency: "% din pret",
                        },
                        {
                            title: "Dronă 4K",
                            price: "100",
                            currency: "€",
                        },
                        {
                            title: "Deplasare în afara Timișoarei",
                            price: "Negociabil în funcție de locație",
                            currency: "",
                        },
                    ],
                },
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
