import { IconArrowsShuffle, IconFileInvoice, IconListCheck, IconMail, IconRobot, IconRoute } from "@tabler/icons-react";
import type { SoftwareServiceContent } from "@/components/software/service";

const content: SoftwareServiceContent = {
    title: "Business process automation",
    description: "We analyse your workflows and automate the repetitive parts: emails, invoices, reports and whole processes, so your team can focus on what matters.",
    features: [
        {
            icon: IconRoute,
            title: "Process analysis",
            description: "Together we find where the most time is lost.",
        },
        {
            icon: IconMail,
            title: "Emails and notifications",
            description: "The right messages go out on their own, at the right time.",
        },
        {
            icon: IconFileInvoice,
            title: "Documents and invoices",
            description: "Invoices, contracts and quotes generated automatically.",
        },
        {
            icon: IconArrowsShuffle,
            title: "Connected systems",
            description: "Your apps pass data to each other on their own, with no manual copying.",
        },
        {
            icon: IconRobot,
            title: "Automated workflows",
            description: "Whole processes that run on their own, with approvals where needed.",
        },
        {
            icon: IconListCheck,
            title: "Fewer mistakes",
            description: "Less manual work means fewer errors.",
        },
    ],
    about: {
        title: "Process automation in Timișoara",
        paragraphs: [
            "We automate repetitive work for companies in Timișoara, across Romania and in Europe: data entry, emails, invoicing, reports and moving data between apps.",
            "We start by analysing how your team works, so we automate what saves the most hours first, then continue step by step.",
            "We use both ready-made automation platforms and code written from scratch, depending on what fits best and is cheapest to maintain.",
        ],
    },
    faq: [
        {
            question: "How much does automating a process cost?",
            answer: "Every project is different, so we don't have fixed prices. After a free conversation about what you need, you get a clear offer with stages, deadlines and cost, with no obligation.",
        },
        {
            question: "Which processes can be automated?",
            answer: "Almost anything repetitive: data entry, emails, invoices, reports, approvals or moving data between apps.",
        },
        {
            question: "Do we have to change the apps we use?",
            answer: "Usually not. We connect your existing apps to each other and automate what happens in between.",
        },
        {
            question: "How much time will we save?",
            answer: "It depends on the process, but it's often hours per week for each person on the team. We estimate the gain before we start.",
        },
        {
            question: "When can you start?",
            answer: "We can usually start within one or two weeks of the first conversation. If it's urgent, write to us and we'll find a way.",
        },
    ],
};

export default content;
