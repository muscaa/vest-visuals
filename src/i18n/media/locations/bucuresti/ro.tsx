import type { LocationContent } from "@/components/media/location";

const content: LocationContent = {
    inCity: "în București",
    description: "Pentru nunți, evenimente și proiecte mai mari venim și în București. Ne ocupăm de tot drumul, tu te ocupi doar de ziua ta.",
    spots: [
        {
            name: "Parcul Herăstrău",
            description: "Cel mai mare parc din oraș, cu lac, alei și grădina japoneză.",
        },
        {
            name: "Ateneul Român",
            description: "Una dintre cele mai frumoase clădiri din București, un fundal elegant pentru portrete.",
        },
        {
            name: "Centrul Vechi",
            description: "Străzi pietruite, clădiri istorice și Hanul lui Manuc, bune pentru cadre de oraș.",
        },
        {
            name: "Parcul Cișmigiu",
            description: "Cel mai vechi parc din oraș, cu lac, poduri și copaci bătrâni.",
        },
        {
            name: "Calea Victoriei",
            description: "Bulevardul cu palate, muzee și clădiri istorice, perfect pentru o plimbare foto.",
        },
    ],
    faq: [
        {
            question: "Vă deplasați la nunți în București?",
            answer: "Da. Venim din Timișoara, iar costul de deplasare și cazare îl includem transparent în ofertă.",
        },
        {
            question: "Cât costă un fotograf în București?",
            answer: "Pornim de la aceleași prețuri ca în Timișoara, la care adăugăm costul de deplasare și cazare. Fiecare client primește o ofertă personalizată.",
        },
        {
            question: "Ce locații recomandați pentru ședințe foto în București?",
            answer: "Parcul Herăstrău, Cișmigiu și Centrul Vechi sunt alegeri sigure. Pentru unele clădiri, precum Ateneul, pot fi necesare aprobări, de care ne putem ocupa noi.",
        },
        {
            question: "Cât de devreme ar trebui să rezervăm?",
            answer: "Pentru evenimente în afara Timișoarei recomandăm cel puțin 3-6 luni, ca să putem organiza drumul.",
        },
    ],
};

export default content;
