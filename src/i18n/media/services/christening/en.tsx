import { IconCamera, IconCameraRotate, IconVideo } from "@tabler/icons-react";
import type { MediaServiceContent } from "@/components/media/service";

const content: MediaServiceContent = {
    title: (
    <>
        <i className="text-chart-1">Christening</i> photographer <br /> and videographer in Timișoara
    </>
    ),
    description: "The ceremony, the party and your little one's first big moments, captured with care. Every package includes a photo session with the baby and the family.",
    imageAlt: "Christening",
    packages: [
        {
            icon: IconCamera,
            title: "Photographer",
            description: "For families who only want photos.",
            from: 400,
            unit: "€",
            features: [
                "A photographer for the whole event, up to 7 hours",
                "Photo session with the baby and the family",
                "Between 300 and 700 edited photos",
                "10 photos delivered on the christening day itself",
                "Digital album available for 3 months",
            ],
        },
        {
            icon: IconVideo,
            title: "Videographer",
            description: "For moments you'll want to relive.",
            from: 400,
            unit: "€",
            features: [
                "A videographer for the whole event, up to 7 hours",
                "Video footage of the baby and the family",
                "Full-length film (2 hours+) or cinematic short film (15 min+)",
                "1-4 minute highlights clip",
                "Digital album available for 3 months",
            ],
        },
        {
            icon: IconCameraRotate,
            title: "Photographer + videographer",
            description: "The whole day, photo and video, from the same team.",
            from: 700,
            unit: "€",
            recommended: true,
            features: [
                "A photo-video team for the whole event, up to 7 hours",
                "Photo and video session with the baby and the family",
                "Between 300 and 700 edited photos",
                "Full-length film or cinematic short film",
                "1-4 minute highlights clip",
                "Accessories for guests",
                "Digital album available for 3 months",
            ],
        },
    ],
    about: {
        title: "Christening photographer and videographer in Timișoara",
        paragraphs: [
            "We capture the christening from getting ready at home and the church ceremony to the party, patiently and discreetly, so your little one and the family feel at ease.",
            "Every package includes a photo session with the baby and the family, which can take place at home. You get between 300 and 700 edited photos, a film of the day and a short clip, all in a digital album.",
            "We work in Timișoara, Arad and across western Romania, and for other cities we discuss travel from the start.",
        ],
    },
    faq: [
        {
            question: "How much does a christening photographer cost?",
            answer: "The photographer or videographer package starts at €400, and the photographer and videographer package at €700. The final price depends on the length of the event, the venue and what you want included, so every family gets a personalised offer.",
        },
        {
            question: "When do we get the photos and videos?",
            answer: "Within 2-4 weeks, depending on how busy the season is. If you need them sooner, we can deliver them within 48-72 hours for an extra fee.",
        },
        {
            question: "Where does the photo session with the baby take place?",
            answer: "Usually at home, where your little one feels most comfortable. The session takes 1-2 hours and includes portraits of the baby with the parents, godparents and the rest of the family.",
        },
        {
            question: "What if the little one is fussy or tired?",
            answer: "We adapt to their schedule. We take breaks when needed and capture moments as they happen, without forcing anything.",
        },
        {
            question: "Do you travel to other cities?",
            answer: "Yes. We're based in Timișoara, and in western cities such as Arad, Lugoj or Caransebeș we don't charge travel costs. For other cities or abroad, we discuss travel and accommodation openly, from the start.",
        },
        {
            question: "What equipment do you use?",
            answer: "We work with professional cameras and lenses (mainly Sony), plus backup gear, lights, microphones and tripods. Depending on the package, we also bring a drone, a 360 platform and accessories for guests.",
        },
    ],
};

export default content;
