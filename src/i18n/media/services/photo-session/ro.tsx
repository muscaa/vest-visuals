import { IconBolt, IconCamera } from "@tabler/icons-react";
import type { MediaServiceContent } from "@/components/media/service";

const content: MediaServiceContent = {
    title: (
    <>
        Ședințe foto <br /> în <i className="text-success">aer liber</i> în Timișoara
    </>
    ),
    description: "Portrete individuale, de cuplu sau de familie, în locația pe care o alegi tu. Retușare naturală, ca să arăți tot ca tine.",
    imageAlt: "dintr-o ședință foto",
    packages: [
        {
            icon: IconBolt,
            title: "Flash",
            description: "O ședință scurtă, pentru câteva portrete reușite.",
            from: 50,
            unit: "€",
            features: [
                "Până la 30 de minute",
                "Locație la alegere",
                "Retușare naturală a pielii, luminii și culorilor",
                "Album digital disponibil o lună",
                "Fotografiile în 7 zile",
            ],
        },
        {
            icon: IconCamera,
            title: "Standard",
            description: "Mai mult timp, mai multe cadre și ținute.",
            from: 100,
            unit: "€/oră",
            recommended: true,
            features: [
                "O oră sau mai mult",
                "Locație la alegere",
                "Poți schimba ținuta",
                "Retușare naturală a pielii, luminii și culorilor",
                "Album digital disponibil o lună",
                "Fotografiile în 7 zile",
            ],
        },
    ],
    about: {
        title: "Ședințe foto în aer liber în Timișoara",
        paragraphs: [
            "Facem ședințe foto individuale, de cuplu, de familie sau cu prietenii, în parc, în oraș sau în orice loc care spune ceva despre tine. Te ajutăm cu pozițiile, ca să nu stai rigid în fața aparatului.",
            "Lucrăm cu lumina naturală și retușăm natural: corectăm pielea, lumina și culorile, fără să schimbăm cum arăți. Primești între 20 și 200 de fotografii editate, în 7 zile.",
            "Ședințele au loc în Timișoara și împrejurimi, iar pentru alte locații discutăm deplasarea.",
        ],
    },
    faq: [
        {
            question: "Cât costă o ședință foto?",
            answer: "O ședință scurtă, de până la 30 de minute, pornește de la 50 €, iar ședința standard de la 100 € pe oră. Prețul final depinde de durată și de locație.",
        },
        {
            question: "Câte fotografii primesc și în cât timp?",
            answer: "În medie între 20 și 200 de fotografii editate, în funcție de pachet și de durata ședinței. Le primești în 7 zile.",
        },
        {
            question: "Unde putem face ședința foto?",
            answer: "Oriunde vrei: în parc, în oraș, în natură sau într-un loc important pentru tine. Dacă nu știi unde, îți recomandăm câteva locații din Timișoara.",
        },
        {
            question: "Ce ar trebui să port?",
            answer: "Haine în care te simți bine, în culori care se potrivesc între ele. La pachetul Standard poți schimba ținuta, așa că poți încerca mai multe stiluri.",
        },
        {
            question: "Cum arată stilul vostru?",
            answer: "Ne adaptăm stilului pe care ți-l dorești: documentar, editorial, cinematic sau vintage. Noi preferăm fotografia documentară și stilul cinematic, cu momente naturale și culori calde, dar contează mai mult ce vrei tu.",
        },
    ],
};

export default content;
