import { createFileRoute } from "@tanstack/react-router";
import { IconBell, IconDeviceMobile, IconPalette, IconPlugConnected, IconRefresh, IconRocket } from "@tabler/icons-react";
import type { ServiceFeature, ServicePageProps, ServiceQuestion } from "@/components/software/service";
import { ServicePage } from "@/components/software/service";

const features: ServiceFeature[] = [
    {
        icon: IconDeviceMobile,
        title: "iOS și Android",
        description: "O singură aplicație, construită pentru ambele platforme, ca să ajungi la toți clienții.",
    },
    {
        icon: IconPalette,
        title: "Design intuitiv",
        description: "Interfețe simple și clare, testate cu utilizatori reali.",
    },
    {
        icon: IconBell,
        title: "Notificări push",
        description: "Ține-ți clienții la curent cu oferte, comenzi sau mesaje importante.",
    },
    {
        icon: IconRefresh,
        title: "Funcționează și offline",
        description: "Datele importante rămân disponibile chiar și fără internet.",
    },
    {
        icon: IconRocket,
        title: "Publicare în magazine",
        description: "Ne ocupăm de publicarea în App Store și Google Play și de actualizări.",
    },
    {
        icon: IconPlugConnected,
        title: "Conectată la sistemele tale",
        description: "Integrare cu site-ul, magazinul online sau aplicațiile interne pe care le ai deja.",
    },
];

const technologies = ["React Native", "TypeScript", "Expo", "Node.js", "PostgreSQL", "Firebase"];

const about: ServicePageProps["about"] = {
    title: "Dezvoltare aplicații mobile în Timișoara",
    paragraphs: [
        "Facem aplicații mobile pentru afaceri și startup-uri din Timișoara, din toată țara și din Europa: aplicații pentru clienți, programe de fidelitate, rezervări, comenzi sau unelte interne pentru echipă.",
        "Pornim de la ce trebuie să facă aplicația și pentru cine, construim un prototip pe care îl poți testa devreme, apoi o dezvoltăm pe etape până la publicare.",
        "După lansare rămânem alături: actualizări pentru versiunile noi de iOS și Android, funcții noi și suport.",
    ],
};

const faq: ServiceQuestion[] = [
    {
        question: "Cât costă o aplicație mobilă?",
        answer: "Fiecare proiect e diferit, așa că nu avem prețuri fixe. După o discuție gratuită despre ce ai nevoie, primești o ofertă clară, cu etape, termene și cost, fără obligații.",
    },
    {
        question: "Faceți aplicații și pentru iPhone, și pentru Android?",
        answer: "Da. Construim de obicei o singură aplicație care funcționează pe ambele platforme, ceea ce reduce costul și timpul de dezvoltare.",
    },
    {
        question: "Vă ocupați de publicarea în App Store și Google Play?",
        answer: "Da, de tot procesul, inclusiv de cerințele fiecărui magazin și de actualizările ulterioare.",
    },
    {
        question: "Cât durează dezvoltarea?",
        answer: "Un prim produs funcțional durează de obicei 2-4 luni, în funcție de complexitate. Îți dăm un termen clar în ofertă.",
    },
    {
        question: "Când puteți începe?",
        answer: "De obicei putem începe în una-două săptămâni de la discuția inițială. Pentru ce e urgent, scrie-ne și găsim o soluție.",
    },
];

export const Route = createFileRoute("/software/services/mobile-apps/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <ServicePage
            name="Aplicații mobile"
            title="Dezvoltare aplicații mobile pentru iOS și Android"
            description="Construim aplicații mobile intuitive și rapide, pentru iPhone și Android, pe care clienții tăi le folosesc cu plăcere, de la idee până la publicarea în App Store și Google Play."
            features={features}
            technologies={technologies}
            about={about}
            faq={faq}
        />
    );
}
