"use client";

import { ServicePage } from "@/components/pages/service";
import { Camera, Clapperboard, Clock, Cloud, Drone, Film, Hourglass, Image, SwitchCamera, Video, Zap } from "lucide-react";

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
                        price: "800",
                        currency: "€",
                        button: "Rezerva Fotograf",
                        features: [
                            ["Prezența unui fotograf pe toată durata nunții (max. 15 ore)", Clock],
                            ["Fotografii disponibile 12 luni într-un album digital", Cloud],
                            ["Între 500 și 1500 de fotografii editate", Image],
                            ["Same Day Edit: 25 fotografii", Zap],
                            ["Predare în 30 de zile", Hourglass],
                        ],
                    },
                    {
                        icon: Video,
                        title: "Videograf",
                        price: "800",
                        currency: "€",
                        button: "Rezerva Videograf",
                        features: [
                            ["Prezența unui videograf pe toată durata nunții (max. 15 ore)", Clock],
                            ["Videoclipuri disponibile 12 luni într-un album digital", Cloud],
                            ["Videoclip lung (3 ore+) sau scurtmetraj cinematic (30 min)", Film],
                            ["Videoclip scurt tip highlights/best-moments (2-4 min)", Clapperboard],
                            ["Cadre aeriene din dronă", Drone],
                            ["Predare în 30 de zile", Hourglass],
                        ],
                    },
                    {
                        icon: SwitchCamera,
                        title: "Fotograf + Videograf",
                        oldPrice: "1600",
                        price: "1450",
                        currency: "€",
                        button: "Alege Pachet",
                        features: [
                            ["Prezența unei echipe formată dintr-un fotograf și un videograf pe toată durata nunții (max. 15 ore)", Clock],
                            ["Fotografii și videoclipuri disponibile 12 luni într-un album digital", Cloud],
                            ["Între 500 și 1500 de fotografii editate", Image],
                            ["Same Day Edit: 25 fotografii", Zap],
                            ["Videoclip lung (3 ore+) sau scurtmetraj cinematic (30 min)", Film],
                            ["Videoclip scurt tip highlights/best-moments (2-4 min)", Clapperboard],
                            ["Cadre aeriene din dronă", Drone],
                            ["Predare în 30 de zile", Hourglass],
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
                            price: "300",
                            currency: "€",
                        },
                        {
                            title: "Ședință foto after wedding „Trash/Love the Dress”",
                            price: "200",
                            currency: "€",
                        },
                        {
                            title: "Ședință foto „Save the Date”",
                            price: "100",
                            currency: "€",
                        },
                        {
                            title: "Album foto-carte mare (30x30 cm cu 40 pagini)",
                            price: "180",
                            currency: "€",
                        },
                        {
                            title: "Album foto-carte 25x25 cm cu 30 pagini",
                            price: "140",
                            currency: "€",
                        },
                        {
                            title: "Album foto-carte 20x20 cm cu 30 pagini",
                            price: "80",
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
                                Numărul de fotografii variază în funcție de pachetul ales și durata evenimentului, dar în medie livrăm între 500-1500 de fotografii editate. Vă vom livra o selecție cu fotografii editate în primele 7 zile, iar galeria finală în termen de 30-90 de zile lucrătoare de la nuntă.
                            </p>
                        </>
                    ],
                    [
                        "Câte și ce videoclipuri vom primi?",
                        <>
                            <p>
                                Numărul și tipul videoclipurilor variază de la pachet la pachet. În general livrăm 2 videoclipuri principale: 1 videoclip de highlights (aprox. 2-5 minute) care cuprinde momentele principale ale nunții editate într-un mod cinematic (stil teaser/trailer de film) și 1 videoclip lung care cuprinde toată povestea nunții (30 min - 4 h) în funcție de pachetul ales.
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
                        "Cât de devreme ar trebui să rezervăm data nunții?",
                        <>
                            <p>
                                Recomandăm să rezervați serviciile foto cu cel puțin 6 luni înainte, mai ales dacă nunta are loc într-un sezon de vârf (mai-septembrie). Datele populare se ocupă rapid!
                            </p>
                        </>
                    ],
                    [
                        "Călătoriți în alt oraș/țară?",
                        <>
                            <p>
                                Absolut! Suntem disponibili pentru nunți în toată țara și în străinătate. Pentru anumite orașe din vest nu se cer costuri de transport (ex: Timișoara, Arad, Caransebeș, Lugoj etc.). Pentru alte locații mai îndepărtate, costurile de deplasare și/sau cazare vor fi adăugate la pachetul ales și discutate transparent de la început.
                            </p>
                        </>
                    ],
                    [
                        "Cum descrieți stilul dumneavoastră fotografic?",
                        <>
                            <p>
                                Stilul nostru fotografic se pliază pe dorințele clienților, având o gamă foarte mare de stiluri pe care le folosim (ex: Fotografie Documentară (Jurnalistică), Fine Art Photography, Stilul Editorial (Vogue / Fashion), Stilul Cinematic (Moody & Dark), Stilul Vintage (Analog / Retro)). Personal, preferăm fotografia documentară și stilul cinematic, dar mai important pentru noi este să ne pliem pe dorințele clientului.
                            </p>
                        </>
                    ],
                ],
            }}
        />
    );
}
