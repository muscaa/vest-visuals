"use client";

import { ServicePage } from "@/components/pages/service";

export default function Page() {
    return (
        <ServicePage
            preview={{
                title: "Fotograf de Evenimente și Povești Autentice",
                description: "Surprindem emoții, nu doar imagini. Servicii foto-video pentru nunți, portrete și business în Timișoara și în țară.",
                images: [
                    "http://192.168.0.155:9000/assets/p6axvqo8qotsols2e0s1f4zh/large",
                    "http://192.168.0.155:9000/assets/p6axvqo8qotsols2e0s1f4zh/large",
                ],
            }}
            faq={{
                title: "Intrebari Frecvente (FAQ)",
                qna: [
                    [
                        "Cat de devreme ar trebui sa rezervam data nuntii?",
                        <>
                            <p>
                                Recomandarea noastră este să rezervați serviciile foto
                                **cu cel puțin 12-18 luni înainte**, mai ales dacă nunta
                                are loc într-un sezon de vârf (mai-septembrie).
                                Datele populare se ocupă rapid!
                            </p>
                        </>
                    ],
                ],
            }}
        />
    );
}
