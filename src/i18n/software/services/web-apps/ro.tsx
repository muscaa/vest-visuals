import { IconDeviceMobile, IconGauge, IconLayoutDashboard, IconPlugConnected, IconSearch, IconShieldCheck } from "@tabler/icons-react";
import type { SoftwareServiceContent } from "@/components/software/service";

const content: SoftwareServiceContent = {
    title: "Dezvoltare aplicații web la comandă",
    description: "Construim site-uri de prezentare, magazine online și platforme web complexe, rapide, sigure și optimizate pentru Google, adaptate exact felului în care lucrează afacerea ta.",
    features: [
        {
            icon: IconLayoutDashboard,
            title: "Design pe măsură",
            description: "Interfață gândită pentru clienții tăi, nu un șablon cumpărat, cu identitatea brandului tău.",
        },
        {
            icon: IconDeviceMobile,
            title: "Responsive pe orice ecran",
            description: "Arată și funcționează la fel de bine pe telefon, tabletă și desktop.",
        },
        {
            icon: IconSearch,
            title: "SEO din prima zi",
            description: "Structură, viteză și conținut gândite ca să fii găsit pe Google, nu adăugate la final.",
        },
        {
            icon: IconGauge,
            title: "Rapidă și ușoară",
            description: "Pagini care se încarcă repede, pentru că fiecare secundă pierdută înseamnă clienți pierduți.",
        },
        {
            icon: IconShieldCheck,
            title: "Sigură",
            description: "Autentificare, roluri, date protejate și actualizări de securitate.",
        },
        {
            icon: IconPlugConnected,
            title: "Integrări",
            description: "Plăți online, facturare, CRM, email marketing și alte sisteme pe care le folosești deja.",
        },
    ],
    about: {
        title: "Dezvoltare aplicații web în Timișoara",
        paragraphs: [
            "Facem aplicații web pentru afaceri din Timișoara, din toată țara și din Europa: site-uri de prezentare, magazine online, portaluri pentru clienți, panouri de administrare și platforme SaaS. Fiecare proiect pornește de la cum lucrezi tu, nu de la un șablon.",
            "Ne ocupăm de tot: analiză, design, dezvoltare, testare, publicare și mentenanță. Codul e al tău, documentat și ușor de continuat, fie de noi, fie de echipa ta.",
            "Lucrăm cu tehnologii moderne și verificate, alese ca aplicația să fie rapidă, sigură și ușor de extins pe măsură ce afacerea ta crește.",
        ],
    },
    faq: [
        {
            question: "Cât costă o aplicație web?",
            answer: "Fiecare proiect e diferit, așa că nu avem prețuri fixe. După o discuție gratuită despre ce ai nevoie, primești o ofertă clară, cu etape, termene și cost, fără obligații.",
        },
        {
            question: "Cât durează dezvoltarea unei aplicații web?",
            answer: "Un site de prezentare durează de obicei 2-4 săptămâni, iar o platformă mai complexă câteva luni. Îți dăm un termen clar în ofertă și lucrăm pe etape, ca să vezi progresul pe parcurs.",
        },
        {
            question: "Al cui este codul?",
            answer: "Al tău. La final primești tot codul sursă și accesul la toate conturile, fără să depinzi de noi.",
        },
        {
            question: "Puteți prelua o aplicație existentă?",
            answer: "Da. Analizăm codul existent, îți spunem sincer în ce stare e și propunem fie îmbunătățiri pe etape, fie o rescriere, dacă e cazul.",
        },
        {
            question: "Când puteți începe?",
            answer: "De obicei putem începe în una-două săptămâni de la discuția inițială. Pentru ce e urgent, scrie-ne și găsim o soluție.",
        },
    ],
};

export default content;
