import { IconCamera, IconVideo } from "@tabler/icons-react";
import type { MediaServiceContent } from "@/components/media/service";

const content: MediaServiceContent = {
    title: (
    <>
        Fotografie <i className="text-success">imobiliară</i> <br /> în Timișoara
    </>
    ),
    description: "Fotografii și video pentru apartamente, case și spații comerciale, ca anunțul tău să iasă în evidență și proprietatea să se vândă sau să se închirieze mai repede.",
    imageAlt: "imobiliară",
    packages: [
        {
            icon: IconCamera,
            title: "Fotografie",
            description: "Pentru anunțuri care atrag atenția.",
            from: 100,
            unit: "€",
            features: [
                "Apartamente, case, vile și spații comerciale",
                "Între 10 și 40 de fotografii editate, în funcție de proprietate",
                "Ședință de 1-2 ore",
                "Album digital disponibil o lună",
                "Fotografiile în 7 zile",
            ],
        },
        {
            icon: IconVideo,
            title: "Video",
            description: "Pentru tururi video și social media.",
            from: 100,
            unit: "€",
            features: [
                "Apartamente, case, vile și spații comerciale",
                "Video de prezentare de 1-5 minute sau 2-3 clipuri scurte pentru Reels și TikTok",
                "Format orizontal sau vertical",
                "Album digital disponibil o lună",
                "Video-ul în 7 zile",
            ],
        },
    ],
    about: {
        title: "Fotografie și video imobiliar în Timișoara",
        paragraphs: [
            "Un anunț cu fotografii bune iese în evidență printre celelalte. Fotografiem apartamente, case, vile și spații comerciale cu lumină corectă, unghiuri largi și culori fidele, ca proprietatea să arate cum e în realitate, doar în cea mai bună zi a ei.",
            "Pentru o prezentare completă filmăm și tururi video sau clipuri scurte verticale pentru social media, iar la cerere adăugăm cadre aeriene din dronă.",
            "Lucrăm cu agenții imobiliare, dezvoltatori și proprietari din Timișoara și împrejurimi, iar pentru mai multe proprietăți oferim reduceri.",
        ],
    },
    faq: [
        {
            question: "Cât costă fotografia imobiliară?",
            answer: "Fotografiile pentru un apartament pornesc de la 100 €. Pentru case, vile și spații comerciale prețul crește în funcție de suprafață, iar pentru mai multe proprietăți oferim reduceri.",
        },
        {
            question: "Câte fotografii primim și în cât timp?",
            answer: "În medie între 10 și 40 de fotografii editate, în funcție de dimensiunea proprietății. Le primești în 7 zile.",
        },
        {
            question: "Cum pregătesc locuința pentru ședința foto?",
            answer: "Recomandăm ca locuința să fie curată și aranjată, cu lenjerie de pat albă, de preferat, iar obiectele personale să nu fie la vedere.",
        },
        {
            question: "Oferiți și video?",
            answer: "Da: un video de prezentare sau 2-3 clipuri scurte, verticale pentru social media sau orizontale, în funcție de unde vrei să le folosești.",
        },
        {
            question: "Aveți reduceri pentru mai multe proprietăți?",
            answer: "Da, pentru mai multe proprietăți oferim reduceri de la 10% în sus. Scrie-ne și îți facem o ofertă personalizată.",
        },
        {
            question: "Faceți și fotografii cu drona?",
            answer: "Da, la cerere, pentru proprietățile unde contează împrejurimile, curtea sau terenul.",
        },
    ],
};

export default content;
