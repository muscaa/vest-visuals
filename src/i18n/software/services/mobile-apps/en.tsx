import { IconBell, IconDeviceMobile, IconPalette, IconPlugConnected, IconRefresh, IconRocket } from "@tabler/icons-react";
import type { SoftwareServiceContent } from "@/components/software/service";

const content: SoftwareServiceContent = {
    title: "Mobile app development for iOS and Android",
    description: "We build intuitive, fast mobile apps for iPhone and Android that your customers enjoy using, from the first idea to publishing on the App Store and Google Play.",
    features: [
        {
            icon: IconDeviceMobile,
            title: "iOS and Android",
            description: "One app, built for both platforms, so you reach all your customers.",
        },
        {
            icon: IconPalette,
            title: "Intuitive design",
            description: "Simple, clear interfaces, tested with real users.",
        },
        {
            icon: IconBell,
            title: "Push notifications",
            description: "Keep your customers up to date with offers, orders or important messages.",
        },
        {
            icon: IconRefresh,
            title: "Works offline too",
            description: "Important data stays available even without an internet connection.",
        },
        {
            icon: IconRocket,
            title: "App store publishing",
            description: "We handle publishing on the App Store and Google Play, and the updates.",
        },
        {
            icon: IconPlugConnected,
            title: "Connected to your systems",
            description: "Integration with the website, online store or internal apps you already have.",
        },
    ],
    about: {
        title: "Mobile app development in Timișoara",
        paragraphs: [
            "We build mobile apps for businesses and startups in Timișoara, across Romania and in Europe: customer apps, loyalty programmes, bookings, orders or internal tools for your team.",
            "We start from what the app needs to do and for whom, build a prototype you can test early, then develop it in stages all the way to launch.",
            "After launch we stay with you: updates for new iOS and Android versions, new features and support.",
        ],
    },
    faq: [
        {
            question: "How much does a mobile app cost?",
            answer: "Every project is different, so we don't have fixed prices. After a free conversation about what you need, you get a clear offer with stages, deadlines and cost, with no obligation.",
        },
        {
            question: "Do you build apps for both iPhone and Android?",
            answer: "Yes. We usually build a single app that works on both platforms, which cuts the cost and development time.",
        },
        {
            question: "Do you handle publishing on the App Store and Google Play?",
            answer: "Yes, the whole process, including each store's requirements and later updates.",
        },
        {
            question: "How long does development take?",
            answer: "A first working product usually takes 2-4 months, depending on complexity. We give you a clear deadline in the offer.",
        },
        {
            question: "When can you start?",
            answer: "We can usually start within one or two weeks of the first conversation. If it's urgent, write to us and we'll find a way.",
        },
    ],
};

export default content;
