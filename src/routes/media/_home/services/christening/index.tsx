import { createFileRoute } from "@tanstack/react-router";
import { IconCamera, IconCameraRotate, IconVideo } from "@tabler/icons-react";
import type { ServicePackage, ServicePageProps, ServiceQuestion } from "@/components/media/service";
import { ServicePage } from "@/components/media/service";

const images = [
    // TODO: add photos from this category, the old page had none
    "https://cdn0.vestvisuals.ro/portfolio/yu9eomg0ef4f66u2gpbqws4t/large",
];

const packages: ServicePackage[] = [
    {
        icon: IconCamera,
        title: "Fotograf",
        description: "Pentru familiile care vor doar fotografii.",
        from: "400",
        unit: "€",
        features: [
            "Fotograf pe toată durata evenimentului, până la 7 ore",
            "Ședință foto cu bebelușul și familia",
            "Între 300 și 700 de fotografii editate",
            "10 fotografii livrate chiar în ziua botezului",
            "Album digital disponibil 3 luni",
        ],
    },
    {
        icon: IconVideo,
        title: "Videograf",
        description: "Pentru momente pe care să le retrăiți.",
        from: "400",
        unit: "€",
        features: [
            "Videograf pe toată durata evenimentului, până la 7 ore",
            "Cadre video cu bebelușul și familia",
            "Film lung (2 ore+) sau scurtmetraj cinematic (15 min+)",
            "Clip highlights de 1-4 minute",
            "Album digital disponibil 3 luni",
        ],
    },
    {
        icon: IconCameraRotate,
        title: "Fotograf + videograf",
        description: "Toată ziua, foto și video, de la aceeași echipă.",
        from: "700",
        unit: "€",
        recommended: true,
        features: [
            "O echipă foto-video pe toată durata evenimentului, până la 7 ore",
            "Ședință foto și video cu bebelușul și familia",
            "Între 300 și 700 de fotografii editate",
            "Film lung sau scurtmetraj cinematic",
            "Clip highlights de 1-4 minute",
            "Accesorii pentru invitați",
            "Album digital disponibil 3 luni",
        ],
    },
];

const about: ServicePageProps["about"] = {
    title: "Fotograf și videograf de botez în Timișoara",
    paragraphs: [
        "Surprindem botezul de la pregătirile de acasă și ceremonia din biserică până la petrecere, cu răbdare și discreție, ca cel mic și familia să fie în largul lor.",
        "Fiecare pachet include o ședință foto cu bebelușul și familia, care se poate face acasă. Primești între 300 și 700 de fotografii editate, un film al zilei și un clip scurt, toate într-un album digital.",
        "Lucrăm în Timișoara, Arad și în tot vestul țării, iar pentru alte orașe discutăm deplasarea de la început.",
    ],
};

const faq: ServiceQuestion[] = [
    {
        question: "Cât costă un fotograf de botez?",
        answer: "Pachetul cu fotograf sau cu videograf pornește de la 400 €, iar cel cu fotograf și videograf de la 700 €. Prețul final depinde de durata evenimentului, de locație și de ce vreți să includă, așa că fiecare familie primește o ofertă personalizată.",
    },
    {
        question: "Când primim fotografiile și videoclipurile?",
        answer: "În 2-4 săptămâni, în funcție de cât de aglomerat e sezonul. Dacă aveți nevoie de ele mai repede, le putem livra în 48-72 de ore, contra cost.",
    },
    {
        question: "Unde are loc ședința foto cu bebelușul?",
        answer: "De obicei acasă, unde cel mic se simte cel mai bine. Ședința durează 1-2 ore și include portrete ale bebelușului, cu părinții, nașii și restul familiei.",
    },
    {
        question: "Ce facem dacă cel mic e agitat sau obosit?",
        answer: "Ne adaptăm programului lui. Facem pauze când e nevoie și fotografiem momentele când apar, fără să forțăm nimic.",
    },
    {
        question: "Vă deplasați și în alte orașe?",
        answer: "Da. Suntem din Timișoara, iar în orașele din vest, precum Arad, Lugoj sau Caransebeș, nu cerem costuri de deplasare. Pentru alte orașe sau pentru străinătate discutăm deplasarea și cazarea transparent, de la început.",
    },
    {
        question: "Cu ce echipament lucrați?",
        answer: "Lucrăm cu camere și obiective profesionale (în principal Sony), plus echipament de rezervă, lumini, microfoane și trepiede. În funcție de pachet aducem și dronă, platformă 360 și accesorii pentru invitați.",
    },
];

export const Route = createFileRoute("/media/_home/services/christening/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <ServicePage
            name="Botezuri"
            title={
                <>
                    Fotograf și videograf <br /> de <i className="text-chart-1">botez</i> în Timișoara
                </>
            }
            description="Ceremonia, petrecerea și primele momente importante ale celui mic, surprinse cu grijă. Fiecare pachet include o ședință foto cu bebelușul și familia."
            images={images}
            imageAlt="de botez"
            packages={packages}
            about={about}
            faq={faq}
        />
    );
}
