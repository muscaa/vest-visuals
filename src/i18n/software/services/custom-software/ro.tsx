import { IconArrowsShuffle, IconDeviceDesktop, IconLifebuoy, IconPuzzle, IconReportAnalytics, IconUsers } from "@tabler/icons-react";
import type { SoftwareServiceContent } from "@/components/software/service";

const content: SoftwareServiceContent = {
    title: "Software personalizat pentru afacerea ta",
    description: "Aplicații desktop, unelte interne și integrări între sistemele pe care le folosești deja, construite exact pe procesele tale, ca echipa să lucreze mai repede și cu mai puține greșeli.",
    features: [
        {
            icon: IconPuzzle,
            title: "Construit pe procesele tale",
            description: "Nu îți schimbi felul de lucru ca să se potrivească unui program, ci programul se potrivește ție.",
        },
        {
            icon: IconArrowsShuffle,
            title: "Integrări între sisteme",
            description: "Conectăm ERP-ul, contabilitatea, CRM-ul și alte aplicații, ca datele să circule singure.",
        },
        {
            icon: IconDeviceDesktop,
            title: "Aplicații desktop",
            description: "Pentru Windows, macOS sau Linux, când o aplicație web nu e suficientă.",
        },
        {
            icon: IconUsers,
            title: "Roluri și permisiuni",
            description: "Fiecare om din echipă vede și face doar ce trebuie.",
        },
        {
            icon: IconReportAnalytics,
            title: "Rapoarte",
            description: "Datele de care ai nevoie, la un click, nu în zece fișiere Excel.",
        },
        {
            icon: IconLifebuoy,
            title: "Suport pe termen lung",
            description: "Rămânem alături după lansare, cu actualizări și funcții noi.",
        },
    ],
    about: {
        title: "Software personalizat în Timișoara",
        paragraphs: [
            "Facem software la comandă pentru firme din Timișoara, din toată țara și din Europa, când programele de pe raft nu se potrivesc felului în care lucrează echipa.",
            "Construim unelte interne, panouri de administrare, aplicații desktop și integrări între sistemele pe care le folosești deja, ca să scapi de munca dublă și de datele copiate de mână.",
            "Pornim de la o analiză a proceselor tale și livrăm pe etape, ca echipa să poată folosi și testa aplicația cât mai devreme.",
        ],
    },
    faq: [
        {
            question: "Cât costă un software personalizat?",
            answer: "Fiecare proiect e diferit, așa că nu avem prețuri fixe. După o discuție gratuită despre ce ai nevoie, primești o ofertă clară, cu etape, termene și cost, fără obligații.",
        },
        {
            question: "De ce aș alege software la comandă în loc de unul gata făcut?",
            answer: "Când programele existente te obligă să-ți schimbi felul de lucru sau să plătești pentru zeci de funcții pe care nu le folosești, o aplicație construită pe procesele tale e de obicei mai eficientă pe termen lung.",
        },
        {
            question: "Puteți conecta aplicațiile pe care le folosim deja?",
            answer: "Da. Integrăm ERP-uri, programe de contabilitate, CRM-uri, magazine online și aproape orice sistem care are un API sau o bază de date accesibilă.",
        },
        {
            question: "Al cui este codul?",
            answer: "Al tău. La final primești tot codul sursă și documentația.",
        },
        {
            question: "Când puteți începe?",
            answer: "De obicei putem începe în una-două săptămâni de la discuția inițială. Pentru ce e urgent, scrie-ne și găsim o soluție.",
        },
    ],
};

export default content;
