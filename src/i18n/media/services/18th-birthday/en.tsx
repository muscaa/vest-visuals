import { IconCamera, IconCameraRotate, IconVideo } from "@tabler/icons-react";
import type { MediaServiceContent } from "@/components/media/service";

const content: MediaServiceContent = {
    title: (
    <>
        <i className="text-chart-1">18th birthday</i> photographer <br /> and videographer in Timișoara
    </>
    ),
    description: "The party, your friends and all the moments you'd otherwise miss, captured in photo and video. On request, we also bring a 360 platform, a drone and accessories for guests.",
    imageAlt: "18th birthday",
    packages: [
        {
            icon: IconCamera,
            title: "Photographer",
            description: "For those who only want photos.",
            from: 250,
            unit: "€",
            features: [
                "A photographer for the whole party, up to 5 hours",
                "Between 300 and 700 edited photos",
                "10 photos delivered on the night of the party",
                "Digital album available for 3 months",
            ],
        },
        {
            icon: IconVideo,
            title: "Videographer",
            description: "For a night you'll want to relive.",
            from: 250,
            unit: "€",
            features: [
                "A videographer for the whole party, up to 5 hours",
                "Full-length film (1 hour+) or cinematic short film (10 min+)",
                "1-4 minute highlights clip",
                "Digital album available for 3 months",
            ],
        },
        {
            icon: IconCameraRotate,
            title: "Photographer + videographer",
            description: "The whole party, photo and video, from the same team.",
            from: 450,
            unit: "€",
            recommended: true,
            features: [
                "A photo-video team for the whole party, up to 5 hours",
                "Between 300 and 700 edited photos",
                "Full-length film or cinematic short film",
                "1-4 minute highlights clip",
                "Accessories for guests: glow sticks, money gun, LED glasses",
                "Digital album available for 3 months",
            ],
        },
    ],
    about: {
        title: "18th birthday photographer and videographer in Timișoara",
        paragraphs: [
            "You only turn 18 once, so it deserves more than a few photos on a phone. We capture the entrance, the cake, the dancing and the friends, and on request we also do a photo session with the birthday person before the party.",
            "You get between 300 and 700 edited photos, a film of the party and a short clip that's perfect for social media. For even more atmosphere we bring accessories for guests, and on request a 360 platform and a drone.",
            "We work in Timișoara, Arad and across western Romania, and we travel to other cities too.",
        ],
    },
    faq: [
        {
            question: "How much does an 18th birthday photographer cost?",
            answer: "The photographer or videographer package starts at €250, and the photographer and videographer package at €450. The final price depends on the length of the party, the venue and what you want included, so everyone gets a personalised offer.",
        },
        {
            question: "When do we get the photos?",
            answer: "Within 2-4 weeks, depending on how busy the season is. If you need them sooner, we can deliver them within 48-72 hours for an extra fee.",
        },
        {
            question: "Do you also do a photo session with the birthday person?",
            answer: "Yes, on request. The session takes about an hour, before the party, outdoors or at a location the birthday person chooses, and includes individual portraits and photos with friends and family.",
        },
        {
            question: "Do you bring a 360 platform or a drone?",
            answer: "Yes, on request. We include them in your personalised offer, along with anything else you need.",
        },
        {
            question: "Which accessories do you bring for guests?",
            answer: "In the photographer and videographer package we bring glow sticks, a money gun and LED glasses, which liven up the party and look great in the photos and the film.",
        },
        {
            question: "Do you travel to other cities?",
            answer: "Yes. We're based in Timișoara, and in western cities such as Arad, Lugoj or Caransebeș we don't charge travel costs. For other cities or abroad, we discuss travel and accommodation openly, from the start.",
        },
    ],
};

export default content;
