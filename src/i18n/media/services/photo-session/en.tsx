import { IconBolt, IconCamera } from "@tabler/icons-react";
import type { MediaServiceContent } from "@/components/media/service";

const content: MediaServiceContent = {
    title: (
    <>
        <i className="text-success">Outdoor</i> photo <br /> sessions in Timișoara
    </>
    ),
    description: "Individual, couple or family portraits, at a location of your choice. Natural retouching, so you still look like yourself.",
    imageAlt: "Photo session",
    packages: [
        {
            icon: IconBolt,
            title: "Flash",
            description: "A short session, for a few great portraits.",
            from: 50,
            unit: "€",
            features: [
                "Up to 30 minutes",
                "Location of your choice",
                "Natural retouching of skin, light and colours",
                "Digital album available for one month",
                "Photos within 7 days",
            ],
        },
        {
            icon: IconCamera,
            title: "Standard",
            description: "More time, more shots and outfits.",
            from: 100,
            unit: "€/hour",
            recommended: true,
            features: [
                "One hour or more",
                "Location of your choice",
                "You can change outfits",
                "Natural retouching of skin, light and colours",
                "Digital album available for one month",
                "Photos within 7 days",
            ],
        },
    ],
    about: {
        title: "Outdoor photo sessions in Timișoara",
        paragraphs: [
            "We do individual, couple, family or friends photo sessions, in a park, around town or anywhere that says something about you. We help you with posing, so you don't stand stiffly in front of the camera.",
            "We work with natural light and retouch naturally: we correct skin, light and colours without changing how you look. You get between 20 and 200 edited photos, within 7 days.",
            "Sessions take place in and around Timișoara, and for other locations we discuss travel.",
        ],
    },
    faq: [
        {
            question: "How much does a photo session cost?",
            answer: "A short session of up to 30 minutes starts at €50, and the standard session at €100 per hour. The final price depends on the length and the location.",
        },
        {
            question: "How many photos do I get, and how soon?",
            answer: "On average between 20 and 200 edited photos, depending on the package and the length of the session. You get them within 7 days.",
        },
        {
            question: "Where can we do the photo session?",
            answer: "Anywhere you like: in a park, around town, in nature or somewhere that matters to you. If you're not sure where, we'll recommend a few spots in Timișoara.",
        },
        {
            question: "What should I wear?",
            answer: "Clothes you feel good in, in colours that go together. With the Standard package you can change outfits, so you can try several styles.",
        },
        {
            question: "What's your style like?",
            answer: "We adapt to the style you want: documentary, editorial, cinematic or vintage. We lean towards documentary photography and a cinematic style, with natural moments and warm colours, but what you want matters more.",
        },
    ],
};

export default content;
