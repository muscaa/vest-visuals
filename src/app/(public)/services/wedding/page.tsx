"use client";

import { ServicePage } from "@/components/pages/service";

export default function Page() {
    return (
        <ServicePage
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
