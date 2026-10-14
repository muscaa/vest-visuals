import { IconCamera, IconCameraRotate, IconVideo } from "@tabler/icons-react";
import type { MediaServiceContent } from "@/components/media/service";

const content: MediaServiceContent = {
    title: (
    <>
        Fotograf și videograf <br /> de <i className="text-chart-1">majorat</i> în Timișoara
    </>
    ),
    description: "Petrecerea, prietenii și toate momentele pe care le-ai rata altfel, surprinse foto și video. La cerere venim și cu platformă 360, dronă și accesorii pentru invitați.",
    imageAlt: "de majorat",
    packages: [
        {
            icon: IconCamera,
            title: "Fotograf",
            description: "Pentru cine vrea doar fotografii.",
            from: 250,
            unit: "€",
            features: [
                "Fotograf pe toată durata petrecerii, până la 5 ore",
                "Între 300 și 700 de fotografii editate",
                "10 fotografii livrate chiar în seara petrecerii",
                "Album digital disponibil 3 luni",
            ],
        },
        {
            icon: IconVideo,
            title: "Videograf",
            description: "Pentru o seară pe care s-o retrăiești.",
            from: 250,
            unit: "€",
            features: [
                "Videograf pe toată durata petrecerii, până la 5 ore",
                "Film lung (1 oră+) sau scurtmetraj cinematic (10 min+)",
                "Clip highlights de 1-4 minute",
                "Album digital disponibil 3 luni",
            ],
        },
        {
            icon: IconCameraRotate,
            title: "Fotograf + videograf",
            description: "Toată petrecerea, foto și video, de la aceeași echipă.",
            from: 450,
            unit: "€",
            recommended: true,
            features: [
                "O echipă foto-video pe toată durata petrecerii, până la 5 ore",
                "Între 300 și 700 de fotografii editate",
                "Film lung sau scurtmetraj cinematic",
                "Clip highlights de 1-4 minute",
                "Accesorii pentru invitați: bețe luminoase, pistol cu bani, ochelari LED",
                "Album digital disponibil 3 luni",
            ],
        },
    ],
    about: {
        title: "Fotograf și videograf de majorat în Timișoara",
        paragraphs: [
            "Un majorat se sărbătorește o singură dată, așa că merită să rămână mai mult decât câteva poze pe telefon. Surprindem intrarea, tortul, dansurile și prietenii, iar la cerere facem și o ședință foto cu sărbătoritul înainte de petrecere.",
            "Primești între 300 și 700 de fotografii editate, un film al petrecerii și un clip scurt, numai bun pentru social media. Pentru și mai multă atmosferă venim cu accesorii pentru invitați, iar la cerere aducem platformă 360 și dronă.",
            "Lucrăm în Timișoara, Arad și în tot vestul țării, dar ne deplasăm și în alte orașe.",
        ],
    },
    faq: [
        {
            question: "Cât costă un fotograf de majorat?",
            answer: "Pachetul cu fotograf sau cu videograf pornește de la 250 €, iar cel cu fotograf și videograf de la 450 €. Prețul final depinde de durata petrecerii, de locație și de ce vrei să includă, așa că fiecare primește o ofertă personalizată.",
        },
        {
            question: "Când primim fotografiile?",
            answer: "În 2-4 săptămâni, în funcție de cât de aglomerat e sezonul. Dacă ai nevoie de ele mai repede, le putem livra în 48-72 de ore, contra cost.",
        },
        {
            question: "Faceți și o ședință foto cu sărbătoritul?",
            answer: "Da, la cerere. Ședința durează aproximativ o oră, are loc înainte de petrecere, în aer liber sau într-o locație aleasă de sărbătorit, și include portrete individuale și fotografii cu prietenii și familia.",
        },
        {
            question: "Aduceți platformă 360 sau dronă?",
            answer: "Da, la cerere. Le includem în oferta personalizată, alături de orice altceva ai nevoie.",
        },
        {
            question: "Ce accesorii aduceți pentru invitați?",
            answer: "În pachetul cu fotograf și videograf aducem bețe luminoase, pistol cu bani și ochelari LED, care animă petrecerea și arată foarte bine în fotografii și în film.",
        },
        {
            question: "Vă deplasați și în alte orașe?",
            answer: "Da. Suntem din Timișoara, iar în orașele din vest, precum Arad, Lugoj sau Caransebeș, nu cerem costuri de deplasare. Pentru alte orașe sau pentru străinătate discutăm deplasarea și cazarea transparent, de la început.",
        },
    ],
};

export default content;
