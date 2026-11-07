import { IconDeviceMobile, IconGauge, IconLayoutDashboard, IconPlugConnected, IconSearch, IconShieldCheck } from "@tabler/icons-react";
import type { SoftwareServiceContent } from "@/components/software/service";

const content: SoftwareServiceContent = {
    title: "Custom web app development",
    description: "We build business websites, online stores and complex web platforms that are fast, secure and optimised for Google, shaped exactly around the way your business works.",
    features: [
        {
            icon: IconLayoutDashboard,
            title: "Tailored design",
            description: "An interface designed for your customers, not a bought template, with your brand's identity.",
        },
        {
            icon: IconDeviceMobile,
            title: "Responsive on any screen",
            description: "Looks and works just as well on phone, tablet and desktop.",
        },
        {
            icon: IconSearch,
            title: "SEO from day one",
            description: "Structure, speed and content designed so you get found on Google, not bolted on at the end.",
        },
        {
            icon: IconGauge,
            title: "Fast and lightweight",
            description: "Pages that load quickly, because every second lost means customers lost.",
        },
        {
            icon: IconShieldCheck,
            title: "Secure",
            description: "Authentication, roles, protected data and security updates.",
        },
        {
            icon: IconPlugConnected,
            title: "Integrations",
            description: "Online payments, invoicing, CRM, email marketing and other systems you already use.",
        },
    ],
    about: {
        title: "Web app development in Timișoara",
        paragraphs: [
            "We build web apps for businesses in Timișoara, across Romania and in Europe: business websites, online stores, customer portals, admin dashboards and SaaS platforms. Every project starts from how you work, not from a template.",
            "We handle everything: analysis, design, development, testing, launch and maintenance. The code is yours, documented and easy to build on, whether by us or by your own team.",
            "We work with modern, proven technologies, chosen so the app stays fast, secure and easy to extend as your business grows.",
        ],
    },
    faq: [
        {
            question: "How much does a web app cost?",
            answer: "Every project is different, so we don't have fixed prices. After a free conversation about what you need, you get a clear offer with stages, deadlines and cost, with no obligation.",
        },
        {
            question: "How long does it take to build a web app?",
            answer: "A business website usually takes 2-4 weeks, and a more complex platform a few months. We give you a clear deadline in the offer and work in stages, so you can see progress along the way.",
        },
        {
            question: "Who owns the code?",
            answer: "You do. At the end you get all the source code and access to every account, without depending on us.",
        },
        {
            question: "Can you take over an existing app?",
            answer: "Yes. We review the existing code, tell you honestly what state it's in and suggest either step-by-step improvements or a rewrite, if needed.",
        },
        {
            question: "When can you start?",
            answer: "We can usually start within one or two weeks of the first conversation. If it's urgent, write to us and we'll find a way.",
        },
    ],
};

export default content;
