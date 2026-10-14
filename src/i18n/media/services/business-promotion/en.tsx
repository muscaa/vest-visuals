import { IconCamera, IconVideo } from "@tabler/icons-react";
import type { MediaServiceContent } from "@/components/media/service";

const content: MediaServiceContent = {
    title: (
    <>
        Photo and video <br /> for <i className="text-chart-1">businesses</i> in Timișoara
    </>
    ),
    description: "Photo and video content for your website, social media and ads: products, spaces, team and everything that makes your business stand out.",
    imageAlt: "Business promotion",
    packages: [
        {
            icon: IconCamera,
            title: "Photographer",
            description: "For your website, catalogues and social media.",
            from: 150,
            unit: "€",
            features: [
                "Session of about 2 hours",
                "Between 20 and 50 edited photos",
                "Products, spaces or team",
                "Digital album available for one month",
                "Photos within 7 days",
            ],
        },
        {
            icon: IconVideo,
            title: "Videographer",
            description: "For ads and social media.",
            from: 200,
            unit: "€",
            features: [
                "Filming of about 2 hours",
                "2-4 minute presentation video or 3 short clips for Reels and TikTok",
                "Digital album available for one month",
                "Video within 7 days",
            ],
        },
    ],
    about: {
        title: "Business photography and video in Timișoara",
        paragraphs: [
            "We make photos and video for restaurants, shops, clinics, offices and any business that needs good content: products, spaces, team or events.",
            "We deliver photos ready for your website and catalogues, presentation videos and short vertical clips for Reels and TikTok, and on request we add aerial drone footage.",
            "We work in and around Timișoara. If you need content regularly, we'll make you a tailored offer.",
        ],
    },
    faq: [
        {
            question: "How much does a business photo shoot cost?",
            answer: "Photos start at €150, and filming at €200. The final price depends on the length, the location and how much content you need.",
        },
        {
            question: "What kinds of businesses do you photograph?",
            answer: "Any business that needs content: restaurants and cafés, shops, clinics, salons, offices, manufacturers and brands with their own products.",
        },
        {
            question: "Where does the shoot take place?",
            answer: "Usually at your business's premises, so the photos show the real space, or at a location suited to the products.",
        },
        {
            question: "Do you also make clips for social media?",
            answer: "Yes. We can deliver short vertical clips for Reels and TikTok, as well as a presentation video.",
        },
        {
            question: "Can we work together on a regular basis?",
            answer: "Yes. If you need new content every month, we'll make you a tailored offer.",
        },
    ],
};

export default content;
