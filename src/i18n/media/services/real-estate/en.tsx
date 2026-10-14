import { IconCamera, IconVideo } from "@tabler/icons-react";
import type { MediaServiceContent } from "@/components/media/service";

const content: MediaServiceContent = {
    title: (
    <>
        <i className="text-success">Real estate</i> photography <br /> in Timișoara
    </>
    ),
    description: "Photos and video for apartments, houses and commercial spaces, so your listing stands out and the property sells or rents faster.",
    imageAlt: "Real estate",
    packages: [
        {
            icon: IconCamera,
            title: "Photography",
            description: "For listings that grab attention.",
            from: 100,
            unit: "€",
            features: [
                "Apartments, houses, villas and commercial spaces",
                "Between 10 and 40 edited photos, depending on the property",
                "1-2 hour session",
                "Digital album available for one month",
                "Photos within 7 days",
            ],
        },
        {
            icon: IconVideo,
            title: "Video",
            description: "For video tours and social media.",
            from: 100,
            unit: "€",
            features: [
                "Apartments, houses, villas and commercial spaces",
                "1-5 minute presentation video or 2-3 short clips for Reels and TikTok",
                "Landscape or vertical format",
                "Digital album available for one month",
                "Video within 7 days",
            ],
        },
    ],
    about: {
        title: "Real estate photography and video in Timișoara",
        paragraphs: [
            "A listing with good photos stands out from the rest. We photograph apartments, houses, villas and commercial spaces with correct lighting, wide angles and true colours, so the property looks just as it is, only on its best day.",
            "For a complete presentation we also film video tours or short vertical clips for social media, and on request we add aerial drone footage.",
            "We work with real estate agencies, developers and owners in and around Timișoara, and we offer discounts for multiple properties.",
        ],
    },
    faq: [
        {
            question: "How much does real estate photography cost?",
            answer: "Photos for an apartment start at €100. For houses, villas and commercial spaces the price goes up with the floor area, and we offer discounts for multiple properties.",
        },
        {
            question: "How many photos do we get, and how soon?",
            answer: "On average between 10 and 40 edited photos, depending on the size of the property. You get them within 7 days.",
        },
        {
            question: "How do I prepare the property for the shoot?",
            answer: "We recommend the place is clean and tidy, ideally with white bed linen, and with personal items out of sight.",
        },
        {
            question: "Do you also offer video?",
            answer: "Yes: a presentation video or 2-3 short clips, vertical for social media or landscape, depending on where you want to use them.",
        },
        {
            question: "Do you offer discounts for multiple properties?",
            answer: "Yes, for multiple properties we offer discounts from 10% upwards. Write to us and we'll put together a personalised offer.",
        },
        {
            question: "Do you also do drone photos?",
            answer: "Yes, on request, for properties where the surroundings, the yard or the land matter.",
        },
    ],
};

export default content;
