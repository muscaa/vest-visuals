import { IconBug, IconDatabase, IconGauge, IconHeartRateMonitor, IconShieldCheck, IconTools } from "@tabler/icons-react";
import type { SoftwareServiceContent } from "@/components/software/service";

const content: SoftwareServiceContent = {
    title: "Suport și mentenanță pentru aplicații",
    description: "Ținem aplicațiile tale rapide, sigure și la zi, cu actualizări, monitorizare și intervenții rapide, ca ce am construit împreună să meargă bine ani buni după lansare.",
    features: [
        {
            icon: IconHeartRateMonitor,
            title: "Monitorizare permanentă",
            description: "Aflăm de probleme înainte să le observe clienții.",
        },
        {
            icon: IconBug,
            title: "Rezolvarea problemelor",
            description: "Intervenim rapid când ceva nu merge.",
        },
        {
            icon: IconShieldCheck,
            title: "Actualizări de securitate",
            description: "Biblioteci și servere mereu la zi.",
        },
        {
            icon: IconGauge,
            title: "Performanță",
            description: "Aplicația rămâne rapidă pe măsură ce crește.",
        },
        {
            icon: IconDatabase,
            title: "Backup",
            description: "Backup-uri regulate și testate, ca datele să fie mereu în siguranță.",
        },
        {
            icon: IconTools,
            title: "Îmbunătățiri",
            description: "Funcții noi și ajustări, când afacerea ta are nevoie.",
        },
    ],
    about: {
        title: "Suport și mentenanță în Timișoara",
        paragraphs: [
            "Oferim suport și mentenanță pentru aplicații web, mobile și infrastructură, pentru firme din Timișoara, din toată țara și din Europa, atât pentru aplicațiile construite de noi, cât și pentru cele preluate.",
            "Ne ocupăm de actualizări, de securitate, de backup și de monitorizare, și intervenim rapid când apare o problemă.",
            "Lucrăm pe bază de abonament lunar sau la cerere, în funcție de cât de critică e aplicația pentru afacerea ta.",
        ],
    },
    faq: [
        {
            question: "Cât costă mentenanța unei aplicații?",
            answer: "Depinde de mărimea aplicației și de cât de repede trebuie să intervenim. De obicei lucrăm cu un abonament lunar, stabilit după o analiză gratuită.",
        },
        {
            question: "Preluați și aplicații construite de alții?",
            answer: "Da. Facem întâi o analiză a codului și a infrastructurii, apoi preluăm mentenanța.",
        },
        {
            question: "Cât de repede interveniți la o problemă?",
            answer: "Depinde de abonament. Pentru aplicațiile critice putem interveni în câteva ore.",
        },
        {
            question: "Ce include mentenanța?",
            answer: "Actualizări de securitate, backup, monitorizare, rezolvarea problemelor și un număr de ore pentru îmbunătățiri, în funcție de abonament.",
        },
        {
            question: "Când puteți începe?",
            answer: "De obicei putem începe în una-două săptămâni de la discuția inițială. Pentru ce e urgent, scrie-ne și găsim o soluție.",
        },
    ],
};

export default content;
