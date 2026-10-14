import { IconBulb, IconCode, IconRoute, IconScale, IconStack2, IconUsers } from "@tabler/icons-react";
import type { SoftwareServiceContent } from "@/components/software/service";

const content: SoftwareServiceContent = {
    title: "Technical consulting and software architecture",
    description: "When you need a plan more than extra hands. We help with architecture, your existing code and decisions about what's worth building and how.",
    features: [
        {
            icon: IconBulb,
            title: "Idea validation",
            description: "We tell you honestly whether and how what you have in mind is worth building.",
        },
        {
            icon: IconStack2,
            title: "Architecture",
            description: "We choose the right technologies and structure for what's coming, not just for today.",
        },
        {
            icon: IconCode,
            title: "Code review",
            description: "We review your existing code and tell you what works, what doesn't and what to do about it.",
        },
        {
            icon: IconScale,
            title: "Realistic estimates",
            description: "Clear costs and timelines, so you can plan your budget.",
        },
        {
            icon: IconUsers,
            title: "Working with your team",
            description: "We help your developers with decisions, best practices and mentoring.",
        },
        {
            icon: IconRoute,
            title: "Step-by-step plan",
            description: "A clear path from what you have today to what you want.",
        },
    ],
    about: {
        title: "Technical consulting in Timișoara",
        paragraphs: [
            "We offer technical consulting to companies and startups in Timișoara, across Romania and in Europe, from validating an idea to the technical plan for an existing product.",
            "We review your apps and code, identify the risks and help you decide what's worth keeping, what's worth rewriting and in what order.",
            "It's ideal if you already have developers and want a second opinion, or if you want to build something new and don't know where to start.",
        ],
    },
    faq: [
        {
            question: "How much does technical consulting cost?",
            answer: "The first conversation is free. After that we work either by the hour or on a project with a price agreed upfront, depending on what you need.",
        },
        {
            question: "Do you also work with our development team?",
            answer: "Yes, often. We help the team with architecture decisions, code review and best practices, without taking their place.",
        },
        {
            question: "Can you assess an existing app?",
            answer: "Yes. We audit the code and infrastructure, and you get a report with issues, risks and recommendations.",
        },
        {
            question: "Can you help us choose a supplier or a technology?",
            answer: "Yes. We explain the options in plain terms and help you choose objectively.",
        },
        {
            question: "When can you start?",
            answer: "We can usually start within one or two weeks of the first conversation. If it's urgent, write to us and we'll find a way.",
        },
    ],
};

export default content;
