import { IconArrowsShuffle, IconClockHour4, IconDatabase, IconFilter, IconShieldCheck, IconStack2 } from "@tabler/icons-react";
import type { SoftwareServiceContent } from "@/components/software/service";

const content: SoftwareServiceContent = {
    title: "Data engineering services",
    description: "We collect data from all your sources, clean it and bring it into one place, with automated pipelines and databases that stay fast however much the data grows.",
    features: [
        {
            icon: IconDatabase,
            title: "Databases",
            description: "Design, optimisation and migration for fast, reliable databases.",
        },
        {
            icon: IconArrowsShuffle,
            title: "ETL pipelines",
            description: "Data arrives automatically from every source, cleaned and ready to use.",
        },
        {
            icon: IconStack2,
            title: "Data warehouse",
            description: "All of the company's data in one place, ready for reporting.",
        },
        {
            icon: IconFilter,
            title: "Data quality",
            description: "Automatic checks, so decisions are based on correct data.",
        },
        {
            icon: IconClockHour4,
            title: "Automatic updates",
            description: "Data updates itself, as often as you need.",
        },
        {
            icon: IconShieldCheck,
            title: "Security and GDPR",
            description: "Controlled access and data handled in line with the law.",
        },
    ],
    about: {
        title: "Data engineering in Timișoara",
        paragraphs: [
            "We build and run data infrastructure for companies in Timișoara, across Romania and in Europe: from collecting data from apps, online stores and files to data warehouses ready for analysis.",
            "The pipelines we build run automatically, check the data and let you know when something's wrong, so you stop wasting time on manual exports and copying.",
            "It works hand in hand with our business intelligence service, so the data makes it all the way into reports and dashboards.",
        ],
    },
    faq: [
        {
            question: "How much does a data engineering project cost?",
            answer: "Every project is different, so we don't have fixed prices. After a free conversation about what you need, you get a clear offer with stages, deadlines and cost, with no obligation.",
        },
        {
            question: "Which sources can you pull data from?",
            answer: "Almost anything: databases, apps with an API, online stores, CRMs, ERPs, Excel or CSV files.",
        },
        {
            question: "What's the difference between data engineering and business intelligence?",
            answer: "Data engineering brings in and prepares the data, and business intelligence turns it into reports and dashboards. We usually do them together.",
        },
        {
            question: "Will our data stay safe?",
            answer: "Yes. We control access, encrypt sensitive data and comply with the GDPR.",
        },
        {
            question: "When can you start?",
            answer: "We can usually start within one or two weeks of the first conversation. If it's urgent, write to us and we'll find a way.",
        },
    ],
};

export default content;
