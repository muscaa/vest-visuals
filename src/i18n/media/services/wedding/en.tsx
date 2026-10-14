import { IconCamera, IconCameraRotate, IconVideo } from "@tabler/icons-react";
import type { MediaServiceContent } from "@/components/media/service";

const content: MediaServiceContent = {
    title: (
    <>
        <i className="text-chart-1">Wedding</i> photographer <br /> and videographer in Timișoara
    </>
    ),
    description: "Wedding photography and video, from getting ready to the last dance. We work in Timișoara, Arad, Lugoj and anywhere else in Romania or abroad.",
    imageAlt: "Wedding",
    packages: [
        {
            icon: IconCamera,
            title: "Photographer",
            description: "For couples who only want photos.",
            from: 800,
            unit: "€",
            features: [
                "A photographer for the whole wedding, up to 15 hours",
                "Between 500 and 1500 edited photos",
                "25 photos delivered on the wedding day itself",
                "Digital album available for 12 months",
            ],
        },
        {
            icon: IconVideo,
            title: "Videographer",
            description: "For couples who want to relive their day.",
            from: 800,
            unit: "€",
            features: [
                "A videographer for the whole wedding, up to 15 hours",
                "Full-length film (3 hours+) or cinematic short film (30 min)",
                "2-4 minute highlights clip",
                "Aerial drone footage",
                "Digital album available for 12 months",
            ],
        },
        {
            icon: IconCameraRotate,
            title: "Photographer + videographer",
            description: "The whole day, photo and video, from the same team.",
            from: 1450,
            unit: "€",
            recommended: true,
            features: [
                "A photo-video team for the whole wedding, up to 15 hours",
                "Between 500 and 1500 edited photos",
                "25 photos delivered on the wedding day itself",
                "Full-length film or cinematic short film",
                "2-4 minute highlights clip",
                "Aerial drone footage",
                "Digital album available for 12 months",
            ],
        },
    ],
    about: {
        title: "Wedding photographer and videographer in Timișoara",
        paragraphs: [
            "We cover wedding photography and video from the couple getting ready, the civil and religious ceremonies and the couple's photo session to the party and the last dance. We work discreetly, so guests feel free and the moments stay natural.",
            "You can choose just a photographer, just a videographer or a full photo-video team. You get between 500 and 1500 edited photos, a full-length film or a cinematic short film, a highlights clip and, if you like, aerial drone footage. Everything arrives in a digital album, where you can download it and share it with your family.",
            "We're based in Timișoara and shoot weddings across western Romania, in Arad, Lugoj or Caransebeș, with no travel costs, as well as in the rest of the country and abroad.",
        ],
    },
    faq: [
        {
            question: "How much does a wedding photographer cost?",
            answer: "The photographer package starts at €800, and the photographer and videographer package at €1450. The final price depends on the length of the wedding, the venue and what you want included, so every couple gets a personalised offer.",
        },
        {
            question: "How many photos do we get, and how soon?",
            answer: "On average we deliver between 500 and 1500 edited photos, depending on the package and the length of the wedding. You get 25 photos on the wedding day itself, an edited selection within the first 7 days and the full gallery within 30-90 business days.",
        },
        {
            question: "Which videos do we get?",
            answer: "Usually two: a 2-5 minute highlights clip with the main moments edited cinematically, like a film trailer, and a full-length film that tells the whole story of the wedding (between 30 minutes and 4 hours, depending on the package).",
        },
        {
            question: "Is it worth getting the photographer and videographer from the same team?",
            answer: "Yes, it's what we recommend. A team that has worked together for a long time coordinates better, stays out of each other's shots and captures more moments than two people meeting on the wedding day.",
        },
        {
            question: "How early should we book the date?",
            answer: "We recommend writing to us at least 6 months ahead, especially for weddings in the peak season, May to September. Popular dates fill up fast.",
        },
        {
            question: "Do you travel to other cities or abroad?",
            answer: "Yes. We're based in Timișoara, and in western cities such as Arad, Lugoj or Caransebeș we don't charge travel costs. For other cities or abroad, we discuss travel and accommodation openly, from the start.",
        },
        {
            question: "What's your style like?",
            answer: "We adapt to the style you want: documentary, editorial, cinematic or vintage. We lean towards documentary photography and a cinematic style, with natural moments and warm colours, but what you want matters more.",
        },
        {
            question: "What equipment do you use?",
            answer: "We work with professional cameras and lenses (mainly Sony), plus backup gear, lights, microphones and tripods. Depending on the package, we also bring a drone, a 360 platform and accessories for guests.",
        },
    ],
};

export default content;
