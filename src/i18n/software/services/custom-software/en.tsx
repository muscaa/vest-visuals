import { IconArrowsShuffle, IconDeviceDesktop, IconLifebuoy, IconPuzzle, IconReportAnalytics, IconUsers } from "@tabler/icons-react";
import type { SoftwareServiceContent } from "@/components/software/service";

const content: SoftwareServiceContent = {
    title: "Custom software for your business",
    description: "Desktop apps, internal tools and integrations between the systems you already use, built exactly around your processes, so your team works faster and with fewer mistakes.",
    features: [
        {
            icon: IconPuzzle,
            title: "Built around your processes",
            description: "You don't change how you work to fit a program, the program fits you.",
        },
        {
            icon: IconArrowsShuffle,
            title: "System integrations",
            description: "We connect your ERP, accounting, CRM and other apps, so data flows on its own.",
        },
        {
            icon: IconDeviceDesktop,
            title: "Desktop apps",
            description: "For Windows, macOS or Linux, when a web app isn't enough.",
        },
        {
            icon: IconUsers,
            title: "Roles and permissions",
            description: "Everyone on the team sees and does only what they need to.",
        },
        {
            icon: IconReportAnalytics,
            title: "Reports",
            description: "The data you need, one click away, not spread across ten Excel files.",
        },
        {
            icon: IconLifebuoy,
            title: "Long-term support",
            description: "We stay with you after launch, with updates and new features.",
        },
    ],
    about: {
        title: "Custom software in Timișoara",
        paragraphs: [
            "We build custom software for companies in Timișoara, across Romania and in Europe, when off-the-shelf programs don't fit the way the team works.",
            "We build internal tools, admin dashboards, desktop apps and integrations between the systems you already use, so you're done with duplicate work and data copied by hand.",
            "We start by analysing your processes and deliver in stages, so the team can use and test the app as early as possible.",
        ],
    },
    faq: [
        {
            question: "How much does custom software cost?",
            answer: "Every project is different, so we don't have fixed prices. After a free conversation about what you need, you get a clear offer with stages, deadlines and cost, with no obligation.",
        },
        {
            question: "Why choose custom software over an off-the-shelf one?",
            answer: "When existing programs force you to change how you work, or to pay for dozens of features you don't use, an app built around your processes is usually more efficient in the long run.",
        },
        {
            question: "Can you connect the apps we already use?",
            answer: "Yes. We integrate ERPs, accounting software, CRMs, online stores and almost any system with an API or an accessible database.",
        },
        {
            question: "Who owns the code?",
            answer: "You do. At the end you get all the source code and the documentation.",
        },
        {
            question: "When can you start?",
            answer: "We can usually start within one or two weeks of the first conversation. If it's urgent, write to us and we'll find a way.",
        },
    ],
};

export default content;
