import { IconCamera, IconVideo } from "@tabler/icons-react";
import type { MediaServiceContent } from "@/components/media/service";

const content: MediaServiceContent = {
    title: (
    <>
        Foto și video <br /> pentru <i className="text-chart-1">afaceri</i> în Timișoara
    </>
    ),
    description: "Conținut foto și video pentru site, social media și reclame: produse, spații, echipă și tot ce face afacerea ta să iasă în evidență.",
    imageAlt: "pentru promovarea unei afaceri",
    packages: [
        {
            icon: IconCamera,
            title: "Fotograf",
            description: "Pentru site, cataloage și social media.",
            from: 150,
            unit: "€",
            features: [
                "Ședință de aproximativ 2 ore",
                "Între 20 și 50 de fotografii editate",
                "Produse, spații sau echipă",
                "Album digital disponibil o lună",
                "Fotografiile în 7 zile",
            ],
        },
        {
            icon: IconVideo,
            title: "Videograf",
            description: "Pentru reclame și social media.",
            from: 200,
            unit: "€",
            features: [
                "Filmare de aproximativ 2 ore",
                "Video de prezentare de 2-4 minute sau 3 clipuri scurte pentru Reels și TikTok",
                "Album digital disponibil o lună",
                "Video-ul în 7 zile",
            ],
        },
    ],
    about: {
        title: "Fotografie și video pentru afaceri în Timișoara",
        paragraphs: [
            "Facem fotografii și video pentru restaurante, magazine, clinici, birouri și orice afacere care are nevoie de conținut bun: produse, spații, echipă sau evenimente.",
            "Livrăm fotografii gata de pus pe site și în cataloage, prezentări video și clipuri scurte verticale pentru Reels și TikTok, iar la cerere adăugăm cadre aeriene din dronă.",
            "Lucrăm în Timișoara și împrejurimi. Dacă ai nevoie de conținut în mod regulat, îți facem o ofertă pe măsură.",
        ],
    },
    faq: [
        {
            question: "Cât costă o ședință foto pentru afaceri?",
            answer: "Fotografiile pornesc de la 150 €, iar filmarea de la 200 €. Prețul final depinde de durată, de locație și de cât conținut ai nevoie.",
        },
        {
            question: "Ce tipuri de afaceri fotografiați?",
            answer: "Orice afacere care are nevoie de conținut: restaurante și cafenele, magazine, clinici, saloane, birouri, producători și branduri cu produse proprii.",
        },
        {
            question: "Unde are loc ședința?",
            answer: "De obicei la sediul afacerii tale, ca fotografiile să arate spațiul real, sau într-o locație potrivită pentru produse.",
        },
        {
            question: "Faceți și clipuri pentru social media?",
            answer: "Da. Putem livra clipuri scurte verticale pentru Reels și TikTok, pe lângă un video de prezentare.",
        },
        {
            question: "Putem colabora în mod regulat?",
            answer: "Da. Dacă ai nevoie de conținut nou în fiecare lună, îți facem o ofertă pe măsură.",
        },
    ],
};

export default content;
