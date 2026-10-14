import { IconBug, IconDatabase, IconGauge, IconHeartRateMonitor, IconShieldCheck, IconTools } from "@tabler/icons-react";
import type { SoftwareServiceContent } from "@/components/software/service";

const content: SoftwareServiceContent = {
    title: "App support and maintenance",
    description: "We keep your apps fast, secure and up to date, with updates, monitoring and quick fixes, so what we built together keeps running well for years after launch.",
    features: [
        {
            icon: IconHeartRateMonitor,
            title: "Round-the-clock monitoring",
            description: "We find out about problems before your customers notice them.",
        },
        {
            icon: IconBug,
            title: "Fixing problems",
            description: "We step in quickly when something breaks.",
        },
        {
            icon: IconShieldCheck,
            title: "Security updates",
            description: "Libraries and servers always up to date.",
        },
        {
            icon: IconGauge,
            title: "Performance",
            description: "The app stays fast as it grows.",
        },
        {
            icon: IconDatabase,
            title: "Backups",
            description: "Regular, tested backups, so your data is always safe.",
        },
        {
            icon: IconTools,
            title: "Improvements",
            description: "New features and tweaks, when your business needs them.",
        },
    ],
    about: {
        title: "Support and maintenance in Timișoara",
        paragraphs: [
            "We provide support and maintenance for web and mobile apps and infrastructure, for companies in Timișoara, across Romania and in Europe, both for apps we built and ones we take over.",
            "We take care of updates, security, backups and monitoring, and step in quickly when a problem comes up.",
            "We work on a monthly subscription or on demand, depending on how critical the app is for your business.",
        ],
    },
    faq: [
        {
            question: "How much does app maintenance cost?",
            answer: "It depends on the size of the app and how quickly we need to respond. We usually work with a monthly subscription, agreed after a free assessment.",
        },
        {
            question: "Do you take over apps built by others?",
            answer: "Yes. We first review the code and infrastructure, then take over the maintenance.",
        },
        {
            question: "How quickly do you respond to a problem?",
            answer: "It depends on the subscription. For critical apps we can step in within a few hours.",
        },
        {
            question: "What does maintenance include?",
            answer: "Security updates, backups, monitoring, fixing problems and a number of hours for improvements, depending on the subscription.",
        },
        {
            question: "When can you start?",
            answer: "We can usually start within one or two weeks of the first conversation. If it's urgent, write to us and we'll find a way.",
        },
    ],
};

export default content;
