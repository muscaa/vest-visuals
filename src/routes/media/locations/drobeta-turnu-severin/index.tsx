import { createFileRoute } from "@tanstack/react-router";
import type { LocationSpot } from "@/components/media/location";
import type { ServiceQuestion } from "@/components/media/service";
import { LocationPage } from "@/components/media/location";

const spots: LocationSpot[] = [
    {
        name: "Castelul de Apă",
        description: "Turnul de apă din centrul orașului, simbolul Severinului, cu o vedere frumoasă de sus.",
    },
    {
        name: "Faleza Dunării",
        description: "Malul Dunării, cu apusuri spectaculoase și mult spațiu deschis.",
    },
    {
        name: "Cetatea Medievală a Severinului",
        description: "Ruinele cetății, cu ziduri vechi de piatră și mult caracter.",
    },
    {
        name: "Ruinele Podului lui Traian",
        description: "Pilonii podului roman de lângă Muzeul Porțile de Fier, un loc cu adevărat unic.",
    },
    {
        name: "Parcul Rozelor",
        description: "Parcul din centru, cu flori și alei umbrite, aproape de Castelul de Apă.",
    },
];

const faq: ServiceQuestion[] = [
    {
        question: "Vă deplasați în Drobeta-Turnu Severin?",
        answer: "Da. Venim din Timișoara, iar costul de deplasare și cazare îl includem transparent în ofertă.",
    },
    {
        question: "Cât costă un fotograf în Drobeta-Turnu Severin?",
        answer: "Pornim de la aceleași prețuri ca în Timișoara, la care adăugăm costul de deplasare. Fiecare client primește o ofertă personalizată.",
    },
    {
        question: "Faceți și ședințe foto la Cazanele Dunării?",
        answer: "Da, la cerere. Peisajele de la Cazane sunt spectaculoase, iar drumul îl includem în ofertă.",
    },
    {
        question: "Cât de devreme ar trebui să rezervăm?",
        answer: "Pentru evenimente în afara Timișoarei recomandăm cel puțin 3-6 luni, ca să putem organiza drumul.",
    },
];

export const Route = createFileRoute("/media/locations/drobeta-turnu-severin/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <LocationPage
            name="Drobeta-Turnu Severin"
            inCity="în Drobeta-Turnu Severin"
            description="Dunărea, istoria și peisajele din jur fac din Drobeta-Turnu Severin un loc special pentru fotografii. Venim pentru nunți, evenimente, ședințe foto și proiecte pentru afaceri."
            spots={spots}
            faq={faq}
        />
    );
}
