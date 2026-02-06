"use client";

import { ServicePage } from "@/components/pages/service";
import { Camera, Clapperboard, Clock, Cloud, Film, Hourglass, Image, Images, Shapes, Smile, SwitchCamera, Video, Zap } from "lucide-react";

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
            price={{
                title: "Preturi si Oferte 2026",
                offers: [
                    {
                        icon: Camera,
                        title: "Fotograf",
                        price: "400",
                        currency: "€",
                        button: "Rezerva Fotograf",
                        features: [
                            ["Prezența unui fotograf pe toată durata evenimentului (max. 7 ore)", Clock],
                            ["Fotografii disponibile 3 luni într-un album digital", Cloud],
                            ["Ședință foto cu bebelușul și familia", Images],
                            ["Între 300 și 700 de fotografii editate", Image],
                            ["Same Day Edit: 10 fotografii", Zap],
                            ["Predare în 15-30 de zile", Hourglass],
                        ],
                    },
                    {
                        icon: Video,
                        title: "Videograf",
                        price: "400",
                        currency: "€",
                        button: "Rezerva Videograf",
                        features: [
                            ["Prezența unui videograf pe toată durata evenimentului (max. 7 ore)", Clock],
                            ["Videoclipuri disponibile 3 luni într-un album digital", Cloud],
                            ["Ședință video cu bebelușul și familia, cadre emoționale", Smile],
                            ["Videoclip lung (2 ore+) sau scurtmetraj cinematic (15 min+)", Film],
                            ["Videoclip scurt tip highlights/best-moments (1-4 min)", Clapperboard],
                            ["Predare în 15-30 de zile", Hourglass],
                        ],
                    },
                    {
                        icon: SwitchCamera,
                        title: "Fotograf + Videograf",
                        oldPrice: "800",
                        price: "700",
                        currency: "€",
                        button: "Alege Pachet",
                        features: [
                            ["Prezența unei echipe formată dintr-un fotograf și un videograf pe toată durata evenimentului (max. 7 ore)", Clock],
                            ["Fotografii și videoclipuri disponibile 3 luni într-un album digital", Cloud],
                            ["Ședință foto cu bebelușul și familia", Images],
                            ["Între 300 și 700 de fotografii editate", Image],
                            ["Same Day Edit: 10 fotografii", Zap],
                            ["Ședință video cu bebelușul și familia, cadre emoționale", Smile],
                            ["Videoclip lung (2 ore+) sau scurtmetraj cinematic (15 min+)", Film],
                            ["Videoclip scurt tip highlights/best-moments (1-4 min)", Clapperboard],
                            ["Accesorii invitați (bețe luminoase, pistol bani, ochelari LED etc.)", Shapes],
                            ["Predare în 15-30 de zile", Hourglass],
                        ],
                        highlight: "RECOMANDAT",
                        accent: true,
                    },
                ],
                extra: {
                    title: "Extra (Optional)",
                    offers: [
                        {
                            title: "Fotograf secundar",
                            price: "150",
                            currency: "€",
                        },
                        {
                            title: "+1 oră la petrecere",
                            price: "40",
                            currency: "€/oră",
                        },
                        {
                            title: "Livrare rapidă (48-72 ore)",
                            price: "50",
                            currency: "€",
                        },
                        {
                            title: "Platformă 360",
                            price: "100",
                            currency: "€",
                        },
                        {
                            title: "Dronă 4K",
                            price: "100",
                            currency: "€",
                        },
                        {
                            title: "Album foto",
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
                        "Când primim fotografiile/videoclipurile?",
                        <>
                            <p>
                                Pozele si videoclipurile sunt livrate în 2-4 săptămâni, în funcție de încărcarea din sezon. Dacă aveți nevoie de fotografii foarte rapid, există opțiunea de predare urgentă în 48-72 de ore la un cost adițional.
                            </p>
                        </>
                    ],
                    [
                        "Oferiți și filmare?",
                        <>
                            <p>
                                Desigur. Serviciile noastre recomandate sunt cele de fotograf + videograf pentru a capta momentele atât foto, cât și video. De asemenea, recomandăm clienților noștri să lucreze cu echipe deja stabilite de foto-video, deoarece acestea se coordonează și lucrează foarte bine împreună, având deja experiență de lucru în echipă.
                            </p>
                        </>
                    ],
                    [
                        "Cu ce echipamente veniți?",
                        <>
                            <p>
                                În funcție de pachetul ales, putem veni cu următoarele echipamente: Camere de fotografie, camere de videografie (în principal marca Sony), obiective, obiective de rezervă, flash-uri + lumini de videografie, microfon pentru a înregistra atmosfera, trepied pentru a înregistra video din unghiuri secundare, dronă, platformă 360, ochelari LED, pistol cu bani, bețe LED etc.
                            </p>
                        </>
                    ],
                    [
                        "Când și unde are loc ședința foto video inclusă?",
                        <>
                            <p>
                                Oferim o ședință foto de 1-2 ore care se poate face acasă. Realizăm atât portrete individuale, cât și fotografii cu prietenii și familia.
                            </p>
                        </>
                    ],
                ],
            }}
        />
    );
}
