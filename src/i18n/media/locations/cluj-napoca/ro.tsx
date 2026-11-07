import type { LocationContent } from "@/components/media/location";

const content: LocationContent = {
    inCity: "în Cluj-Napoca",
    description: "Cluj-Napoca are de toate: centru istoric, parcuri, dealuri cu vedere peste oraș. Venim pentru nunți, evenimente, ședințe foto și proiecte pentru afaceri.",
    spots: [
        {
            name: "Piața Unirii",
            description: "Biserica Sfântul Mihail și statuia lui Matei Corvin, în inima orașului vechi.",
        },
        {
            name: "Parcul Central și Cazinoul",
            description: "Lacul, aleile și clădirea Cazinoului, un loc clasic pentru ședințe de cuplu.",
        },
        {
            name: "Grădina Botanică",
            description: "Una dintre cele mai frumoase grădini botanice din țară, cu sere, grădina japoneză și multă verdeață.",
        },
        {
            name: "Cetățuia",
            description: "Dealul de deasupra orașului, cu cea mai frumoasă priveliște peste Cluj, mai ales la apus.",
        },
        {
            name: "Piața Muzeului",
            description: "O piață mică și liniștită, cu clădiri vechi și străzi pietruite.",
        },
    ],
    faq: [
        {
            question: "Vă deplasați la nunți în Cluj-Napoca?",
            answer: "Da. Venim din Timișoara, iar costul de deplasare și cazare îl includem transparent în ofertă.",
        },
        {
            question: "Cât costă un fotograf în Cluj-Napoca?",
            answer: "Pornim de la aceleași prețuri ca în Timișoara, la care adăugăm costul de deplasare. Fiecare client primește o ofertă personalizată.",
        },
        {
            question: "Ce locații recomandați pentru ședințe foto în Cluj?",
            answer: "Parcul Central, Cetățuia la apus și Grădina Botanică sunt preferatele noastre.",
        },
        {
            question: "Cât de devreme ar trebui să rezervăm?",
            answer: "Pentru evenimente în afara Timișoarei recomandăm cel puțin 3-6 luni, ca să putem organiza drumul.",
        },
    ],
};

export default content;
