import { IconCamera, IconCameraRotate, IconVideo } from "@tabler/icons-react";
import type { MediaServiceContent } from "@/components/media/service";

const content: MediaServiceContent = {
    title: (
    <>
        <i className="text-chart-1">Automotive</i> photography <br /> in Timișoara
    </>
    ),
    description: "Photos and video for dealers, showrooms and enthusiasts, so the car looks exactly as it deserves, in a listing or on social media.",
    imageAlt: "Automotive",
    packages: [
        {
            icon: IconCamera,
            title: "Photographer",
            description: "For listings and catalogues.",
            from: 100,
            unit: "€/car",
            features: [
                "Session of about one hour",
                "Between 10 and 30 edited photos",
                "Digital album available for one month",
                "Photos within 7 days",
            ],
        },
        {
            icon: IconVideo,
            title: "Videographer",
            description: "For presentations and social media.",
            from: 100,
            unit: "€/car",
            features: [
                "Session of about one hour",
                "1-3 minute presentation video or 2 short clips for Reels and TikTok",
                "Digital album available for one month",
                "Video within 7 days",
            ],
        },
        {
            icon: IconCameraRotate,
            title: "Photographer + videographer",
            description: "Photos and video from the same session.",
            from: 190,
            unit: "€/car",
            recommended: true,
            features: [
                "Session of about one hour",
                "Between 10 and 30 edited photos",
                "Presentation video or short clips",
                "Digital album available for one month",
                "Everything within 7 days",
            ],
        },
    ],
    about: {
        title: "Automotive photography and video in Timișoara",
        paragraphs: [
            "We photograph cars for dealers, showrooms, rental companies and enthusiasts. We choose the right location, angles and light, so the car's lines and details stand out.",
            "Besides photos, we film presentation videos and short clips for social media, and on request we add aerial drone footage.",
            "We work in and around Timișoara, and for dealers and fleets with several cars we make personalised offers.",
        ],
    },
    faq: [
        {
            question: "How much does a car photo shoot cost?",
            answer: "Photos start at €100 per car, and photos and video together at €190 per car. For several cars we make a personalised offer.",
        },
        {
            question: "How many photos do we get, and how soon?",
            answer: "Between 10 and 30 edited photos for each car, delivered within 7 days.",
        },
        {
            question: "Where does the shoot take place?",
            answer: "At a location we choose together: around town, in nature, in a car park with the right backdrop or even in your showroom.",
        },
        {
            question: "Do you also make clips for social media?",
            answer: "Yes. We can deliver a presentation video or short vertical clips, made for Reels and TikTok.",
        },
        {
            question: "Do you work with car dealers?",
            answer: "Yes. For dealers and companies with several cars we make personalised offers, based on volume.",
        },
    ],
};

export default content;
