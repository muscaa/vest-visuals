import { createFileRoute } from "@tanstack/react-router";
import { IconCamera, IconCameraRotate, IconVideo } from "@tabler/icons-react";
import type { ServicePackage, ServicePageProps, ServiceQuestion } from "@/components/media/service";
import { ServicePage } from "@/components/media/service";

const images = [
    "https://s3.vestvisuals.ro/portfolio/ok1f6eurgum0dnwollokpqzv/large",
    "https://s3.vestvisuals.ro/portfolio/eoeuwr98zlfq3qftcfjg50t8/large",
    "https://s3.vestvisuals.ro/portfolio/seajnnjl9fh5a8sfwaxrprah/large",
    "https://s3.vestvisuals.ro/portfolio/ctqwipkk1927k8sa55hyodbd/large",
    "https://s3.vestvisuals.ro/portfolio/tuezrjoujv0hqvpbhydwt9k4/large",
    "https://s3.vestvisuals.ro/portfolio/xku47dpl4g4vorazvjfhdjjc/large",
];

const packages: ServicePackage[] = [
    {
        icon: IconCamera,
        title: "Fotograf",
        description: "Pentru anunțuri și cataloage.",
        from: "100",
        unit: "€/mașină",
        features: [
            "Ședință de aproximativ o oră",
            "Între 10 și 30 de fotografii editate",
            "Album digital disponibil o lună",
            "Fotografiile în 7 zile",
        ],
    },
    {
        icon: IconVideo,
        title: "Videograf",
        description: "Pentru prezentări și social media.",
        from: "100",
        unit: "€/mașină",
        features: [
            "Ședință de aproximativ o oră",
            "Video de prezentare de 1-3 minute sau 2 clipuri scurte pentru Reels și TikTok",
            "Album digital disponibil o lună",
            "Video-ul în 7 zile",
        ],
    },
    {
        icon: IconCameraRotate,
        title: "Fotograf + videograf",
        description: "Fotografii și video din aceeași ședință.",
        from: "190",
        unit: "€/mașină",
        recommended: true,
        features: [
            "Ședință de aproximativ o oră",
            "Între 10 și 30 de fotografii editate",
            "Video de prezentare sau clipuri scurte",
            "Album digital disponibil o lună",
            "Totul în 7 zile",
        ],
    },
];

const about: ServicePageProps["about"] = {
    title: "Fotografie și video auto în Timișoara",
    paragraphs: [
        "Fotografiem mașini pentru dealeri auto, showroom-uri, firme de închirieri și pasionați. Alegem locația, unghiurile și lumina potrivite, ca liniile și detaliile mașinii să iasă în evidență.",
        "Pe lângă fotografii, filmăm prezentări video și clipuri scurte pentru social media, iar la cerere adăugăm cadre aeriene din dronă.",
        "Lucrăm în Timișoara și împrejurimi, iar pentru dealeri și flote cu mai multe mașini facem oferte personalizate.",
    ],
};

const faq: ServiceQuestion[] = [
    {
        question: "Cât costă o ședință foto auto?",
        answer: "Fotografiile pornesc de la 100 € pe mașină, iar fotografiile și video-ul împreună de la 190 € pe mașină. Pentru mai multe mașini facem o ofertă personalizată.",
    },
    {
        question: "Câte fotografii primim și în cât timp?",
        answer: "Între 10 și 30 de fotografii editate pentru fiecare mașină, livrate în 7 zile.",
    },
    {
        question: "Unde are loc ședința?",
        answer: "Într-o locație aleasă împreună: în oraș, în natură, într-o parcare cu fundal potrivit sau chiar în showroom-ul tău.",
    },
    {
        question: "Faceți și clipuri pentru social media?",
        answer: "Da. Putem livra un video de prezentare sau clipuri scurte verticale, gândite pentru Reels și TikTok.",
    },
    {
        question: "Lucrați cu dealeri auto?",
        answer: "Da. Pentru dealeri și firme cu mai multe mașini facem oferte personalizate, în funcție de volum.",
    },
];

export const Route = createFileRoute("/media/services/automotive/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <ServicePage
            name="Automotive"
            title={
                <>
                    Fotografie <i className="text-chart-1">auto</i> <br /> în Timișoara
                </>
            }
            description="Fotografii și video pentru dealeri, showroom-uri și pasionați, ca mașina să arate exact cum merită, în anunț sau pe social media."
            images={images}
            imageAlt="automotive"
            packages={packages}
            about={about}
            faq={faq}
        />
    );
}
