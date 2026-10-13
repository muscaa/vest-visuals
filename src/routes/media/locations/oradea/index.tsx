import { createFileRoute } from "@tanstack/react-router";
import type { LocationSpot } from "@/components/media/location";
import type { ServiceQuestion } from "@/components/media/service";
import { LocationPage } from "@/components/media/location";

const spots: LocationSpot[] = [
    {
        name: "Piața Unirii",
        description: "Inima orașului, cu Palatul Vulturul Negru, Primăria și Biserica cu Lună, plină de detalii Art Nouveau.",
    },
    {
        name: "Strada Republicii",
        description: "Strada pietonală cu fațade colorate și decorate, numai bună pentru cadre de oraș.",
    },
    {
        name: "Cetatea Oradea",
        description: "Cetatea în formă de stea, cu ziduri de cărămidă și curți interioare spațioase.",
    },
    {
        name: "Malurile Crișului Repede",
        description: "Poduri și alei pe malul râului, potrivite pentru plimbări și cadre la apus.",
    },
    {
        name: "Palatul Baroc",
        description: "Palatul și parcul din jur, un fundal elegant și liniștit pentru portrete.",
    },
];

const faq: ServiceQuestion[] = [
    {
        question: "Vă deplasați la nunți în Oradea?",
        answer: "Da. Venim din Timișoara, iar costul de deplasare și, dacă e nevoie, de cazare îl includem transparent în ofertă.",
    },
    {
        question: "Cât costă un fotograf în Oradea?",
        answer: "Pornim de la aceleași prețuri ca în Timișoara, la care adăugăm costul de deplasare. Fiecare client primește o ofertă personalizată.",
    },
    {
        question: "Ce locații recomandați pentru ședințe foto în Oradea?",
        answer: "Piața Unirii, Strada Republicii și Cetatea sunt preferatele noastre, mai ales pentru cine iubește arhitectura.",
    },
    {
        question: "Cât de devreme ar trebui să rezervăm?",
        answer: "Pentru evenimente în afara Timișoarei recomandăm cel puțin 3-6 luni, ca să putem organiza drumul.",
    },
];

export const Route = createFileRoute("/media/locations/oradea/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <LocationPage
            name="Oradea"
            inCity="în Oradea"
            description="Oradea e unul dintre cele mai fotogenice orașe din țară, cu clădirile ei Art Nouveau. Venim pentru nunți, evenimente, ședințe foto și proiecte pentru afaceri."
            spots={spots}
            faq={faq}
        />
    );
}
