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
                    // "http://192.168.0.155:9000/assets/p6axvqo8qotsols2e0s1f4zh/large",
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
