import { IconArrowsShuffle, IconClockHour4, IconDatabase, IconFilter, IconShieldCheck, IconStack2 } from "@tabler/icons-react";
import type { SoftwareServiceContent } from "@/components/software/service";

const content: SoftwareServiceContent = {
    title: "Servicii de data engineering",
    description: "Colectăm datele din toate sursele tale, le curățăm și le aducem într-un singur loc, cu pipeline-uri automate și baze de date care rămân rapide oricât de mult cresc datele.",
    features: [
        {
            icon: IconDatabase,
            title: "Baze de date",
            description: "Proiectare, optimizare și migrare pentru baze de date rapide și fiabile.",
        },
        {
            icon: IconArrowsShuffle,
            title: "Pipeline-uri ETL",
            description: "Datele vin automat din toate sursele, curățate și gata de folosit.",
        },
        {
            icon: IconStack2,
            title: "Data warehouse",
            description: "Toate datele firmei într-un singur loc, pregătite pentru rapoarte.",
        },
        {
            icon: IconFilter,
            title: "Calitatea datelor",
            description: "Verificări automate, ca deciziile să se bazeze pe date corecte.",
        },
        {
            icon: IconClockHour4,
            title: "Actualizare automată",
            description: "Datele se actualizează singure, la intervalele de care ai nevoie.",
        },
        {
            icon: IconShieldCheck,
            title: "Securitate și GDPR",
            description: "Acces controlat și date tratate conform legislației.",
        },
    ],
    about: {
        title: "Data engineering în Timișoara",
        paragraphs: [
            "Construim și administrăm infrastructura de date pentru firme din Timișoara, din toată țara și din Europa: de la colectarea datelor din aplicații, magazine online și fișiere, până la depozite de date pregătite pentru analiză.",
            "Pipeline-urile pe care le construim rulează automat, verifică datele și te anunță când ceva nu e în regulă, ca să nu mai pierzi timp cu exporturi și copieri manuale.",
            "Lucrăm bine împreună cu serviciul nostru de business intelligence, ca datele să ajungă până în rapoarte și dashboard-uri.",
        ],
    },
    faq: [
        {
            question: "Cât costă un proiect de data engineering?",
            answer: "Fiecare proiect e diferit, așa că nu avem prețuri fixe. După o discuție gratuită despre ce ai nevoie, primești o ofertă clară, cu etape, termene și cost, fără obligații.",
        },
        {
            question: "Din ce surse puteți aduce date?",
            answer: "Din aproape orice: baze de date, aplicații cu API, magazine online, CRM-uri, ERP-uri, fișiere Excel sau CSV.",
        },
        {
            question: "Ce diferență e între data engineering și business intelligence?",
            answer: "Data engineering aduce și pregătește datele, iar business intelligence le transformă în rapoarte și dashboard-uri. De obicei le facem împreună.",
        },
        {
            question: "Datele noastre rămân în siguranță?",
            answer: "Da. Controlăm accesul, criptăm datele sensibile și respectăm GDPR.",
        },
        {
            question: "Când puteți începe?",
            answer: "De obicei putem începe în una-două săptămâni de la discuția inițială. Pentru ce e urgent, scrie-ne și găsim o soluție.",
        },
    ],
};

export default content;
