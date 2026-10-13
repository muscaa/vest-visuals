import { createFileRoute } from "@tanstack/react-router";
import { IconArrowsShuffle, IconFileInvoice, IconListCheck, IconMail, IconRobot, IconRoute } from "@tabler/icons-react";
import type { ServiceFeature, ServicePageProps, ServiceQuestion } from "@/components/software/service";
import { ServicePage } from "@/components/software/service";

const features: ServiceFeature[] = [
    {
        icon: IconRoute,
        title: "Analiza proceselor",
        description: "Găsim împreună unde se pierde cel mai mult timp.",
    },
    {
        icon: IconMail,
        title: "Emailuri și notificări",
        description: "Mesajele potrivite pleacă singure, la momentul potrivit.",
    },
    {
        icon: IconFileInvoice,
        title: "Documente și facturi",
        description: "Facturi, contracte și oferte generate automat.",
    },
    {
        icon: IconArrowsShuffle,
        title: "Sisteme conectate",
        description: "Aplicațiile tale își transmit datele singure, fără copieri manuale.",
    },
    {
        icon: IconRobot,
        title: "Fluxuri automate",
        description: "Procese întregi care rulează singure, cu aprobări unde e nevoie.",
    },
    {
        icon: IconListCheck,
        title: "Mai puține greșeli",
        description: "Mai puțină muncă manuală înseamnă mai puține erori.",
    },
];

const technologies = ["n8n", "Make", "Zapier", "Python", "Node.js", "REST APIs", "PostgreSQL"];

const about: ServicePageProps["about"] = {
    title: "Automatizarea proceselor în Timișoara",
    paragraphs: [
        "Automatizăm munca repetitivă pentru firme din Timișoara, din toată țara și din Europa: introducere de date, emailuri, facturare, rapoarte și transferul de date între aplicații.",
        "Începem cu o analiză a felului în care lucrează echipa, ca să automatizăm întâi ce aduce cele mai multe ore câștigate, apoi continuăm pas cu pas.",
        "Folosim atât platforme de automatizare gata făcute, cât și cod scris de la zero, în funcție de ce e mai potrivit și mai ieftin de întreținut.",
    ],
};

const faq: ServiceQuestion[] = [
    {
        question: "Cât costă automatizarea unui proces?",
        answer: "Fiecare proiect e diferit, așa că nu avem prețuri fixe. După o discuție gratuită despre ce ai nevoie, primești o ofertă clară, cu etape, termene și cost, fără obligații.",
    },
    {
        question: "Ce procese se pot automatiza?",
        answer: "Aproape orice e repetitiv: introducerea datelor, emailuri, facturi, rapoarte, aprobări sau mutarea datelor între aplicații.",
    },
    {
        question: "Trebuie să schimbăm aplicațiile pe care le folosim?",
        answer: "De obicei nu. Conectăm aplicațiile existente între ele și automatizăm ce e între ele.",
    },
    {
        question: "Cât timp economisim?",
        answer: "Depinde de proces, dar de multe ori vorbim de ore pe săptămână pentru fiecare om din echipă. Estimăm câștigul înainte să începem.",
    },
    {
        question: "Când puteți începe?",
        answer: "De obicei putem începe în una-două săptămâni de la discuția inițială. Pentru ce e urgent, scrie-ne și găsim o soluție.",
    },
];

export const Route = createFileRoute("/software/services/process-automation/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <ServicePage
            name="Automatizarea proceselor"
            title="Automatizarea proceselor de business"
            description="Analizăm fluxurile de lucru și automatizăm părțile repetitive: emailuri, facturi, rapoarte și procese întregi, ca echipa ta să se ocupe de ce contează."
            features={features}
            technologies={technologies}
            about={about}
            faq={faq}
        />
    );
}
