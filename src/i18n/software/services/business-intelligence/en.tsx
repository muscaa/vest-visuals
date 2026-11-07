import { IconChartBar, IconDeviceMobile, IconLayoutDashboard, IconRefresh, IconReportAnalytics, IconUsers } from "@tabler/icons-react";
import type { SoftwareServiceContent } from "@/components/software/service";

const content: SoftwareServiceContent = {
    title: "Business intelligence services",
    description: "Dashboards and reports that answer real questions about your business: sales, costs, customers and team, updated automatically and easy to read.",
    features: [
        {
            icon: IconLayoutDashboard,
            title: "Dashboards",
            description: "Your business's key numbers, on one screen.",
        },
        {
            icon: IconReportAnalytics,
            title: "Automated reports",
            description: "Reports land in your inbox on their own, daily, weekly or monthly.",
        },
        {
            icon: IconChartBar,
            title: "Clear metrics",
            description: "We decide together what's worth tracking, so you don't get lost in the data.",
        },
        {
            icon: IconRefresh,
            title: "Always up-to-date data",
            description: "Everything updates automatically, with no manual exports.",
        },
        {
            icon: IconUsers,
            title: "Role-based access",
            description: "Everyone sees only the data that's relevant to them.",
        },
        {
            icon: IconDeviceMobile,
            title: "On your phone too",
            description: "Dashboards look good on mobile as well.",
        },
    ],
    about: {
        title: "Business intelligence in Timișoara",
        paragraphs: [
            "We help companies in Timișoara, across Romania and in Europe understand their business better, with dashboards and reports built around the questions that matter.",
            "We start from what you want to find out, not from the data you have. Then we connect the data sources, define the metrics and build reports your team actually uses.",
            "If your data is spread across several systems, we also bring it into one place, through our data engineering service.",
        ],
    },
    faq: [
        {
            question: "How much does a dashboard cost?",
            answer: "Every project is different, so we don't have fixed prices. After a free conversation about what you need, you get a clear offer with stages, deadlines and cost, with no obligation.",
        },
        {
            question: "Which tools do you use?",
            answer: "Power BI, Metabase, Looker Studio or dashboards built from scratch, depending on what you already use and your budget.",
        },
        {
            question: "Can we use our Excel data?",
            answer: "Yes. We often start from Excel files and then automate data collection step by step.",
        },
        {
            question: "How often is the data updated?",
            answer: "As often as you need: once a day, every hour or close to real time.",
        },
        {
            question: "When can you start?",
            answer: "We can usually start within one or two weeks of the first conversation. If it's urgent, write to us and we'll find a way.",
        },
    ],
};

export default content;
