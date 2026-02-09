"use client";

import { ServicePage } from "@/components/pages/service";
import { Camera, Clock, Cloud, Film, Hourglass, Image, Video } from "lucide-react";

export default function Page() {
    return (
        <ServicePage
            preview={{
                title: "Fotograf de Evenimente și Povești Autentice",
                description: "Surprindem emoții, nu doar imagini. Servicii foto-video pentru nunți, portrete și business în Timișoara și în țară.",
                images: [
                    "https://s3.vestvisuals.ro/portfolio/xrja8xss5xpgf6ytj14rvcr0/large",
                    "https://s3.vestvisuals.ro/portfolio/h0mbepdrz7ezs0eu7jy2mao1/large",
                    "https://s3.vestvisuals.ro/portfolio/ap4odtdq7pcy2o02g8l9mvmg/large",
                    "https://s3.vestvisuals.ro/portfolio/kci4tsjlnm3l5kywact8srbd/large",
                    "https://s3.vestvisuals.ro/portfolio/lccacqbntvcqc1laix9cpa8g/large",
                ],
            }}
            price={{
                title: "Preturi si Oferte 2026",
                offers: [
                    {
                        icon: Camera,
                        title: "Fotograf",
                        price: "150",
                        currency: "€",
                        button: "Rezerva Fotograf",
                        features: [
                            ["Durată: 2 ore", Clock],
                            ["Fotografii disponibile 1 lună într-un album digital", Cloud],
                            ["Între 20 și 50 de fotografii editate", Image],
                            ["Predare în 7 zile", Hourglass],
                        ],
                    },
                    {
                        icon: Video,
                        title: "Videograf",
                        price: "200",
                        currency: "€",
                        button: "Rezerva Videograf",
                        features: [
                            ["Durată: 2 ore", Clock],
                            ["Videoclipuri disponibile 1 lună într-un album digital", Cloud],
                            ["Videoclip lung stil trailer/teaser (2-4 minute) sau 3 videoclipuri scurte tip Reels/TikTok", Film],
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
                    // [
                    //     "Cat de devreme ar trebui sa rezervam data nuntii?",
                    //     <>
                    //         <p>
                    //             Recomandarea noastră este să rezervați serviciile foto
                    //             **cu cel puțin 12-18 luni înainte**, mai ales dacă nunta
                    //             are loc într-un sezon de vârf (mai-septembrie).
                    //             Datele populare se ocupă rapid!
                    //         </p>
                    //     </>
                    // ],
                ],
            }}
        />
    );
}
