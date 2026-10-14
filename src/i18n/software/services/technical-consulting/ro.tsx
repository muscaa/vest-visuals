import { IconBulb, IconCode, IconRoute, IconScale, IconStack2, IconUsers } from "@tabler/icons-react";
import type { SoftwareServiceContent } from "@/components/software/service";

const content: SoftwareServiceContent = {
    title: "Consultanță tehnică și arhitectură software",
    description: "Când ai nevoie de un plan mai mult decât de mâini în plus. Te ajutăm cu arhitectura, cu codul existent și cu deciziile despre ce merită construit și cum.",
    features: [
        {
            icon: IconBulb,
            title: "Validarea ideii",
            description: "Îți spunem sincer dacă și cum merită construit ce ai în minte.",
        },
        {
            icon: IconStack2,
            title: "Arhitectură",
            description: "Alegem tehnologiile și structura potrivite pentru ce urmează, nu doar pentru acum.",
        },
        {
            icon: IconCode,
            title: "Code review",
            description: "Analizăm codul existent și îți spunem ce merge, ce nu și ce e de făcut.",
        },
        {
            icon: IconScale,
            title: "Estimări realiste",
            description: "Costuri și termene clare, ca să poți planifica bugetul.",
        },
        {
            icon: IconUsers,
            title: "Lucru cu echipa ta",
            description: "Ajutăm dezvoltatorii tăi cu decizii, bune practici și mentorat.",
        },
        {
            icon: IconRoute,
            title: "Plan pe etape",
            description: "Un drum clar, de la ce ai azi la ce vrei să ai.",
        },
    ],
    about: {
        title: "Consultanță tehnică în Timișoara",
        paragraphs: [
            "Oferim consultanță tehnică firmelor și startup-urilor din Timișoara, din toată țara și din Europa, de la validarea unei idei până la planul tehnic pentru un produs existent.",
            "Analizăm aplicațiile și codul pe care le ai, identificăm riscurile și te ajutăm să decizi ce merită păstrat, ce merită rescris și în ce ordine.",
            "E ideal dacă ai deja dezvoltatori și vrei o a doua părere, sau dacă vrei să construiești ceva nou și nu știi de unde să începi.",
        ],
    },
    faq: [
        {
            question: "Cât costă consultanța tehnică?",
            answer: "Prima discuție e gratuită. Apoi lucrăm fie la oră, fie pe un proiect cu preț stabilit de la început, în funcție de ce ai nevoie.",
        },
        {
            question: "Lucrați și cu echipa noastră de dezvoltatori?",
            answer: "Da, des. Ajutăm echipa cu decizii de arhitectură, code review și bune practici, fără să-i luăm locul.",
        },
        {
            question: "Puteți evalua o aplicație existentă?",
            answer: "Da. Facem un audit al codului și al infrastructurii și primești un raport cu probleme, riscuri și recomandări.",
        },
        {
            question: "Ne puteți ajuta să alegem un furnizor sau o tehnologie?",
            answer: "Da. Îți explicăm variantele pe înțelesul tău și te ajutăm să alegi obiectiv.",
        },
        {
            question: "Când puteți începe?",
            answer: "De obicei putem începe în una-două săptămâni de la discuția inițială. Pentru ce e urgent, scrie-ne și găsim o soluție.",
        },
    ],
};

export default content;
