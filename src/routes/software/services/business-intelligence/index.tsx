import { createFileRoute } from "@tanstack/react-router";
import { IconChartBar, IconDeviceMobile, IconLayoutDashboard, IconRefresh, IconReportAnalytics, IconUsers } from "@tabler/icons-react";
import type { ServiceFeature, ServicePageProps, ServiceQuestion } from "@/components/software/service";
import { ServicePage } from "@/components/software/service";

const features: ServiceFeature[] = [
    {
        icon: IconLayoutDashboard,
        title: "Dashboard-uri",
        description: "Cifrele importante ale afacerii, pe un singur ecran.",
    },
    {
        icon: IconReportAnalytics,
        title: "Rapoarte automate",
        description: "Rapoartele ajung singure pe email, zilnic, săptămânal sau lunar.",
    },
    {
        icon: IconChartBar,
        title: "Indicatori clari",
        description: "Definim împreună ce merită urmărit, ca să nu te pierzi în date.",
    },
    {
        icon: IconRefresh,
        title: "Date mereu la zi",
        description: "Totul se actualizează automat, fără exporturi manuale.",
    },
    {
        icon: IconUsers,
        title: "Acces pe roluri",
        description: "Fiecare vede doar datele relevante pentru el.",
    },
    {
        icon: IconDeviceMobile,
        title: "Și pe telefon",
        description: "Dashboard-urile se văd bine și pe mobil.",
    },
];

const technologies = ["Power BI", "Metabase", "Looker Studio", "PostgreSQL", "SQL", "Python"];

const about: ServicePageProps["about"] = {
    title: "Business intelligence în Timișoara",
    paragraphs: [
        "Ajutăm firme din Timișoara, din toată țara și din Europa să-și înțeleagă mai bine afacerea, cu dashboard-uri și rapoarte construite pe întrebările care contează.",
        "Pornim de la ce vrei să afli, nu de la ce date ai. Apoi conectăm sursele de date, definim indicatorii și construim rapoarte pe care echipa chiar le folosește.",
        "Dacă datele sunt împrăștiate în mai multe sisteme, ne ocupăm și de aducerea lor într-un singur loc, prin serviciul nostru de data engineering.",
    ],
};

const faq: ServiceQuestion[] = [
    {
        question: "Cât costă un dashboard?",
        answer: "Fiecare proiect e diferit, așa că nu avem prețuri fixe. După o discuție gratuită despre ce ai nevoie, primești o ofertă clară, cu etape, termene și cost, fără obligații.",
    },
    {
        question: "Cu ce unelte lucrați?",
        answer: "Cu Power BI, Metabase, Looker Studio sau dashboard-uri construite de la zero, în funcție de ce folosiți deja și de buget.",
    },
    {
        question: "Putem folosi datele din Excel?",
        answer: "Da. Pornim adesea de la fișiere Excel, iar apoi automatizăm colectarea datelor pas cu pas.",
    },
    {
        question: "Cât de des se actualizează datele?",
        answer: "Cât de des ai nevoie: o dată pe zi, din oră în oră sau aproape în timp real.",
    },
    {
        question: "Când puteți începe?",
        answer: "De obicei putem începe în una-două săptămâni de la discuția inițială. Pentru ce e urgent, scrie-ne și găsim o soluție.",
    },
];

export const Route = createFileRoute("/software/services/business-intelligence/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <ServicePage
            name="Business Intelligence"
            title="Servicii de business intelligence"
            description="Dashboard-uri și rapoarte care răspund la întrebări reale despre afacerea ta: vânzări, costuri, clienți și echipă, actualizate automat și ușor de citit."
            features={features}
            technologies={technologies}
            about={about}
            faq={faq}
        />
    );
}
