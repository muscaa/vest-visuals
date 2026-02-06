"use client";

import { ServicePage } from "@/components/pages/service";
import { Camera, Clock, Cloud, Hourglass, MapPin, Pencil, Shirt, Zap } from "lucide-react";

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
                        icon: Zap,
                        title: "Flash",
                        price: "50",
                        currency: "€",
                        button: "Alege Pachet",
                        features: [
                            ["Durată: maxim 30 de minute", Clock],
                            ["Fotografii disponibile 1 lună într-un album digital", Cloud],
                            ["Locație la alegere", MapPin],
                            ["Retușare naturală (piele, lumină, culoare, detalii vestimentare)", Pencil],
                            ["Predare in 7 zile", Hourglass],
                        ],
                    },
                    {
                        icon: Camera,
                        title: "Standard",
                        price: "100",
                        currency: "€/oră",
                        button: "Alege Pachet",
                        features: [
                            ["Durată: 1 oră+", Clock],
                            ["Fotografii disponibile 1 lună într-un album digital", Cloud],
                            ["Locație la alegere", MapPin],
                            ["Retușare naturală (piele, lumină, culoare, detalii vestimentare)", Pencil],
                            ["Posibilitatea de schimbare a ținutei", Shirt],
                            ["Predare in 7 zile", Hourglass],
                        ],
                        highlight: "RECOMANDAT",
                        accent: true,
                    },
                ],
                extra: {
                    title: "Extra (Optional)",
                    offers: [
                        {
                            title: "Retușare complexă (schimbare fundal, vestimentatie, expresie etc)",
                            price: "5",
                            currency: "€/poza",
                        },
                        {
                            title: "Livrare rapidă (24-48 ore)",
                            price: "20",
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
                        "Cum descrieți stilul dumneavoastră fotografic?",
                        <>
                            <p>
                                Stilul nostru fotografic se pliază pe dorințele clienților, având o gamă foarte mare de stiluri pe care le folosim (ex: Fotografie Documentară (Jurnalistică), Fine Art Photography, Stilul Editorial (Vogue / Fashion), Stilul Cinematic (Moody & Dark), Stilul Vintage (Analog / Retro)). Personal, preferăm fotografia documentară și stilul cinematic, dar mai important pentru noi este să ne pliem pe dorințele clientului.
                            </p>
                        </>
                    ],
                    [
                        "Câte fotografii vom primi și în cât timp?",
                        <>
                            <p>
                                Numărul de fotografii variază în funcție de pachetul ales și durata ședinței, dar în medie livrăm între 20-200 de fotografii editate în termen de 7 zile.
                            </p>
                        </>
                    ],
                    [
                        "Călătoriți în alt oraș/țară?",
                        <>
                            <p>
                                Absolut! Suntem disponibili în toată țara și în străinătate. Pentru anumite orașe din vest nu se cer costuri de transport (ex: Timișoara, Arad, Caransebeș, Lugoj etc.). Pentru alte locații mai îndepărtate, costurile de deplasare și/sau cazare vor fi adăugate la pachetul ales și discutate transparent de la început.
                            </p>
                        </>
                    ],
                ],
            }}
        />
    );
}
