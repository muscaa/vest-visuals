import { IconActivity, IconChartLine, IconCloudUpload, IconGitBranch, IconLock, IconServer } from "@tabler/icons-react";
import type { SoftwareServiceContent } from "@/components/software/service";

const content: SoftwareServiceContent = {
    title: "Cloud and DevOps services",
    description: "We migrate, scale and optimise your cloud infrastructure, with automated deployments, monitoring and backups, so your apps stay fast and available as you grow.",
    features: [
        {
            icon: IconCloudUpload,
            title: "Cloud migration",
            description: "We move your apps and data to the cloud without stopping your business.",
        },
        {
            icon: IconGitBranch,
            title: "Automated deployment",
            description: "Every update reaches production automatically, tested and stress-free.",
        },
        {
            icon: IconActivity,
            title: "Monitoring",
            description: "We find out about problems before your customers do.",
        },
        {
            icon: IconServer,
            title: "Scaling",
            description: "Infrastructure grows with your traffic, without paying extra when you don't need it.",
        },
        {
            icon: IconLock,
            title: "Security and backups",
            description: "Controlled access, encrypted data and tested backups.",
        },
        {
            icon: IconChartLine,
            title: "Optimised costs",
            description: "We go through your cloud bills and cut the resources you pay for without using.",
        },
    ],
    about: {
        title: "Cloud and DevOps in Timișoara",
        paragraphs: [
            "We help companies in Timișoara, across Romania and in Europe run their apps in the cloud reliably and without unnecessary costs.",
            "We take care of migration, automated deployments, monitoring, backups and security, so your team can focus on the product, not the servers.",
            "We work with the big cloud providers as well as more affordable options, chosen to fit your needs and budget.",
        ],
    },
    faq: [
        {
            question: "How much do cloud and DevOps services cost?",
            answer: "Every project is different, so we don't have fixed prices. After a free conversation about what you need, you get a clear offer with stages, deadlines and cost, with no obligation.",
        },
        {
            question: "Can you lower our cloud costs?",
            answer: "Often, yes. We look at the resources you use, remove what's unnecessary and pick better-suited configurations.",
        },
        {
            question: "Which cloud providers do you work with?",
            answer: "AWS, Google Cloud, Hetzner and others. We recommend the right option for your app and budget.",
        },
        {
            question: "Do you also offer ongoing management?",
            answer: "Yes, we can take over managing and monitoring your infrastructure long term.",
        },
        {
            question: "When can you start?",
            answer: "We can usually start within one or two weeks of the first conversation. If it's urgent, write to us and we'll find a way.",
        },
    ],
};

export default content;
