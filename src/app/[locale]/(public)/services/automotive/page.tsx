"use client";

import { ServicePage } from "@/components/pages/service";
import { CalendarCheck, Camera, Clock, Cloud, Film, Hourglass, Image, Images, SwitchCamera, Video, Zap } from "lucide-react";

export default function Page() {
    return (
        <ServicePage
            preview={{
                title: "Fotograf de Evenimente și Povești Autentice",
                description: "Surprindem emoții, nu doar imagini. Servicii foto-video pentru nunți, portrete și business în Timișoara și în țară.",
                images: [
                    "https://s3.vestvisuals.ro/portfolio/ok1f6eurgum0dnwollokpqzv/large",
                    "https://s3.vestvisuals.ro/portfolio/eoeuwr98zlfq3qftcfjg50t8/large",
                    "https://s3.vestvisuals.ro/portfolio/seajnnjl9fh5a8sfwaxrprah/large",
                    "https://s3.vestvisuals.ro/portfolio/ctqwipkk1927k8sa55hyodbd/large",
                    "https://s3.vestvisuals.ro/portfolio/tuezrjoujv0hqvpbhydwt9k4/large",
                    "https://s3.vestvisuals.ro/portfolio/xku47dpl4g4vorazvjfhdjjc/large",
                ],
            }}
            price={{
                title: "Preturi si Oferte 2026",
                offers: [
                    {
                        icon: Camera,
                        title: "Fotograf",
                        price: "100",
                        currency: "€/mașină",
                        button: "Rezerva Fotograf",
                        features: [
                            ["Durată: 1 oră", Clock],
                            ["Fotografii disponibile 1 lună într-un album digital", Cloud],
                            ["Între 10 și 30 de fotografii editate", Image],
                            ["Predare în 7 zile", Hourglass],
                        ],
                    },
                    {
                        icon: Video,
                        title: "Videograf",
                        price: "100",
                        currency: "€/mașină",
                        button: "Rezerva Videograf",
                        features: [
                            ["Durată: 1 oră", Clock],
                            ["Videoclipuri disponibile 1 lună într-un album digital", Cloud],
                            ["Videoclip lung stil trailer/teaser (1-3 minute) sau 2 videoclipuri scurte tip Reels/TikTok", Film],
                            ["Predare în 7 zile", Hourglass],
                        ],
                    },
                    {
                        icon: SwitchCamera,
                        title: "Fotograf + Videograf",
                        price: "190",
                        currency: "€/mașină",
                        button: "Rezerva Pachet",
                        features: [
                            ["Durată: 1 oră", Clock],
                            ["Fotografii și videoclipuri disponibile 1 lună într-un album digital", Cloud],
                            ["Între 10 și 30 de fotografii editate", Image],
                            ["Videoclip lung stil trailer/teaser (1-3 minute) sau 2 videoclipuri scurte tip Reels/TikTok", Film],
                            ["Predare în 7 zile", Hourglass],
                        ],
                        highlight: "RECOMANDAT",
                        accent: true,
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
