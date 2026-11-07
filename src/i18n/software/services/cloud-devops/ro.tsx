import { IconActivity, IconChartLine, IconCloudUpload, IconGitBranch, IconLock, IconServer } from "@tabler/icons-react";
import type { SoftwareServiceContent } from "@/components/software/service";

const content: SoftwareServiceContent = {
    title: "Servicii cloud și DevOps",
    description: "Migrăm, scalăm și optimizăm infrastructura ta în cloud, cu deployment-uri automate, monitorizare și backup, ca aplicațiile să rămână rapide și disponibile pe măsură ce crești.",
    features: [
        {
            icon: IconCloudUpload,
            title: "Migrare în cloud",
            description: "Mutăm aplicațiile și datele în cloud fără să oprim afacerea.",
        },
        {
            icon: IconGitBranch,
            title: "Deployment automat",
            description: "Fiecare actualizare ajunge în producție automat, testată și fără stres.",
        },
        {
            icon: IconActivity,
            title: "Monitorizare",
            description: "Aflăm de probleme înaintea clienților tăi.",
        },
        {
            icon: IconServer,
            title: "Scalare",
            description: "Infrastructura crește odată cu traficul, fără să plătești în plus când nu e nevoie.",
        },
        {
            icon: IconLock,
            title: "Securitate și backup",
            description: "Acces controlat, date criptate și backup-uri testate.",
        },
        {
            icon: IconChartLine,
            title: "Costuri optimizate",
            description: "Analizăm facturile de cloud și eliminăm resursele plătite degeaba.",
        },
    ],
    about: {
        title: "Cloud și DevOps în Timișoara",
        paragraphs: [
            "Ajutăm firme din Timișoara, din toată țara și din Europa să-și ruleze aplicațiile în cloud fiabil și fără costuri inutile.",
            "Ne ocupăm de migrare, de deployment-uri automate, de monitorizare, de backup și de securitate, ca echipa ta să se concentreze pe produs, nu pe servere.",
            "Lucrăm cu furnizorii mari de cloud, dar și cu soluții mai accesibile, alese în funcție de nevoile și bugetul tău.",
        ],
    },
    faq: [
        {
            question: "Cât costă serviciile de cloud și DevOps?",
            answer: "Fiecare proiect e diferit, așa că nu avem prețuri fixe. După o discuție gratuită despre ce ai nevoie, primești o ofertă clară, cu etape, termene și cost, fără obligații.",
        },
        {
            question: "Puteți reduce costurile noastre de cloud?",
            answer: "De multe ori, da. Analizăm ce resurse folosiți, eliminăm ce e în plus și alegem configurații mai potrivite.",
        },
        {
            question: "Cu ce furnizori de cloud lucrați?",
            answer: "Cu AWS, Google Cloud, Hetzner și alții. Îți recomandăm varianta potrivită pentru aplicația și bugetul tău.",
        },
        {
            question: "Oferiți și administrare continuă?",
            answer: "Da, putem prelua administrarea și monitorizarea infrastructurii pe termen lung.",
        },
        {
            question: "Când puteți începe?",
            answer: "De obicei putem începe în una-două săptămâni de la discuția inițială. Pentru ce e urgent, scrie-ne și găsim o soluție.",
        },
    ],
};

export default content;
