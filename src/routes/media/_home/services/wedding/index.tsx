import { createFileRoute } from "@tanstack/react-router";
import { IconCamera, IconCameraRotate, IconVideo } from "@tabler/icons-react";
import type { ServicePackage, ServicePageProps, ServiceQuestion } from "@/components/media/service";
import { ServicePage } from "@/components/media/service";

const images = [
    // TODO: add photos from this category, the old page had none
    "https://s3.vestvisuals.ro/portfolio/b4dwo04rs8ta7na0zzbflpuv/large",
];

const packages: ServicePackage[] = [
    {
        icon: IconCamera,
        title: "Fotograf",
        description: "Pentru cuplurile care vor doar fotografii.",
        from: "800",
        unit: "€",
        features: [
            "Fotograf pe toată durata nunții, până la 15 ore",
            "Între 500 și 1500 de fotografii editate",
            "25 de fotografii livrate chiar în ziua nunții",
            "Album digital disponibil 12 luni",
        ],
    },
    {
        icon: IconVideo,
        title: "Videograf",
        description: "Pentru cuplurile care vor să-și retrăiască ziua.",
        from: "800",
        unit: "€",
        features: [
            "Videograf pe toată durata nunții, până la 15 ore",
            "Film lung (3 ore+) sau scurtmetraj cinematic (30 min)",
            "Clip highlights de 2-4 minute",
            "Cadre aeriene din dronă",
            "Album digital disponibil 12 luni",
        ],
    },
    {
        icon: IconCameraRotate,
        title: "Fotograf + videograf",
        description: "Toată ziua, foto și video, de la aceeași echipă.",
        from: "1450",
        unit: "€",
        recommended: true,
        features: [
            "O echipă foto-video pe toată durata nunții, până la 15 ore",
            "Între 500 și 1500 de fotografii editate",
            "25 de fotografii livrate chiar în ziua nunții",
            "Film lung sau scurtmetraj cinematic",
            "Clip highlights de 2-4 minute",
            "Cadre aeriene din dronă",
            "Album digital disponibil 12 luni",
        ],
    },
];

const about: ServicePageProps["about"] = {
    title: "Fotograf și videograf de nuntă în Timișoara",
    paragraphs: [
        "Ne ocupăm de fotografia și filmarea de nuntă de la pregătirile mirilor, cununia civilă și cea religioasă, ședința foto cu mirii, până la petrecere și ultimul dans. Lucrăm discret, ca invitații să se simtă liberi, iar momentele să rămână naturale.",
        "Poți alege doar fotograf, doar videograf sau o echipă completă foto-video. Primești între 500 și 1500 de fotografii editate, un film lung sau un scurtmetraj cinematic, un clip highlights și, dacă vrei, cadre aeriene din dronă. Totul ajunge într-un album digital, din care le poți descărca și împărți cu familia.",
        "Suntem din Timișoara și fotografiem nunți în tot vestul țării, în Arad, Lugoj sau Caransebeș, fără costuri de deplasare, dar și în restul țării și în străinătate.",
    ],
};

const faq: ServiceQuestion[] = [
    {
        question: "Cât costă un fotograf de nuntă?",
        answer: "Pachetul cu fotograf pornește de la 800 €, iar cel cu fotograf și videograf de la 1450 €. Prețul final depinde de durata nunții, de locație și de ce vrei să includă, așa că fiecare cuplu primește o ofertă personalizată.",
    },
    {
        question: "Câte fotografii primim și în cât timp?",
        answer: "În medie livrăm între 500 și 1500 de fotografii editate, în funcție de pachet și de durata nunții. Primești 25 de fotografii chiar în ziua nunții, o selecție editată în primele 7 zile și galeria completă în 30-90 de zile lucrătoare.",
    },
    {
        question: "Ce videoclipuri primim?",
        answer: "De obicei două: un clip highlights de 2-5 minute, cu momentele principale editate cinematic, ca un trailer de film, și un film lung care spune toată povestea nunții (între 30 de minute și 4 ore, în funcție de pachet).",
    },
    {
        question: "Merită să luăm fotograf și videograf de la aceeași echipă?",
        answer: "Da, e varianta pe care o recomandăm. O echipă care lucrează împreună de mult se coordonează mai bine, nu își intră în cadru și surprinde mai multe momente decât doi oameni care se cunosc în ziua nunții.",
    },
    {
        question: "Cât de devreme ar trebui să rezervăm data?",
        answer: "Recomandăm să ne scrieți cu cel puțin 6 luni înainte, mai ales pentru nunțile din sezonul de vârf, mai-septembrie. Datele populare se ocupă repede.",
    },
    {
        question: "Vă deplasați și în alte orașe sau în străinătate?",
        answer: "Da. Suntem din Timișoara, iar în orașele din vest, precum Arad, Lugoj sau Caransebeș, nu cerem costuri de deplasare. Pentru alte orașe sau pentru străinătate discutăm deplasarea și cazarea transparent, de la început.",
    },
    {
        question: "Cum arată stilul vostru?",
        answer: "Ne adaptăm stilului pe care ți-l dorești: documentar, editorial, cinematic sau vintage. Noi preferăm fotografia documentară și stilul cinematic, cu momente naturale și culori calde, dar contează mai mult ce vrei tu.",
    },
    {
        question: "Cu ce echipament lucrați?",
        answer: "Lucrăm cu camere și obiective profesionale (în principal Sony), plus echipament de rezervă, lumini, microfoane și trepiede. În funcție de pachet aducem și dronă, platformă 360 și accesorii pentru invitați.",
    },
];

export const Route = createFileRoute("/media/_home/services/wedding/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <ServicePage
            name="Nunți"
            title={
                <>
                    Fotograf și videograf <br /> de <i className="text-chart-1">nuntă</i> în Timișoara
                </>
            }
            description="Fotografie și filmare de nuntă, de la pregătiri până la ultimul dans. Lucrăm în Timișoara, Arad, Lugoj și oriunde în țară sau în străinătate."
            images={images}
            imageAlt="de nuntă"
            packages={packages}
            about={about}
            faq={faq}
        />
    );
}
