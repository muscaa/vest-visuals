import { m } from "@shared/paraglide/messages";
import { Link } from "@tanstack/react-router";
import { IconArrowRight } from "@tabler/icons-react";
import type { LinkOptions } from "@tanstack/react-router";
import Database4 from "@/components/illustrations/database-4.svg?react";
import Maintenance1 from "@/components/illustrations/maintenance-1.svg?react";
import Wireframe from "@/components/illustrations/wireframe.svg?react";
import Workflow2 from "@/components/illustrations/workflow-2.svg?react";
import { HoverCard } from "@/components/cards/hover";
import { Eyebrow } from "@/components/eyebrow";
import { TextH1, TextH2, TextH3, TextP } from "@/components/typography";

export type SoftwareServiceId =
    | "web-apps"
    | "mobile-apps"
    | "custom-software"
    | "cloud-devops"
    | "data-engineering"
    | "business-intelligence"
    | "process-automation"
    | "technical-consulting"
    | "support-maintenance";

/** Text is stored as message functions and only called while rendering, so it's in the visitor's locale. */
export interface Service {
    id: SoftwareServiceId;
    /** the service's own page */
    link: LinkOptions;
    title: () => string;
    description: () => string;
}

export interface ServiceGroup {
    /** section anchor on the home page */
    id: string;
    title: () => string;
    /** shorter title for the navbar */
    navTitle: () => string;
    illustration: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    services: Service[];
}

export const serviceGroups: ServiceGroup[] = [
    {
        id: "dezvoltare-software",
        title: m.software_group_development,
        navTitle: m.software_group_development_nav,
        illustration: Wireframe,
        services: [
            {
                id: "web-apps",
                link: { to: "/software/services/web-apps" },
                title: m.software_service_web_apps,
                description: m.software_service_web_apps_description,
            },
            {
                id: "mobile-apps",
                link: { to: "/software/services/mobile-apps" },
                title: m.software_service_mobile_apps,
                description: m.software_service_mobile_apps_description,
            },
            {
                id: "custom-software",
                link: { to: "/software/services/custom-software" },
                title: m.software_service_custom_software,
                description: m.software_service_custom_software_description,
            },
        ],
    },
    {
        id: "cloud-date",
        title: m.software_group_cloud_data,
        navTitle: m.software_group_cloud_data,
        illustration: Database4,
        services: [
            {
                id: "cloud-devops",
                link: { to: "/software/services/cloud-devops" },
                title: m.software_service_cloud_devops,
                description: m.software_service_cloud_devops_description,
            },
            {
                id: "data-engineering",
                link: { to: "/software/services/data-engineering" },
                title: m.software_service_data_engineering,
                description: m.software_service_data_engineering_description,
            },
            {
                id: "business-intelligence",
                link: { to: "/software/services/business-intelligence" },
                title: m.software_service_business_intelligence,
                description: m.software_service_business_intelligence_description,
            },
        ],
    },
    {
        id: "automatizari",
        title: m.software_group_automation,
        navTitle: m.software_group_automation,
        illustration: Workflow2,
        services: [
            {
                id: "process-automation",
                link: { to: "/software/services/process-automation" },
                title: m.software_service_process_automation,
                description: m.software_service_process_automation_description,
            },
        ],
    },
    {
        id: "consultanta-mentenanta",
        title: m.software_group_consulting,
        navTitle: m.software_group_consulting_nav,
        illustration: Maintenance1,
        services: [
            {
                id: "technical-consulting",
                link: { to: "/software/services/technical-consulting" },
                title: m.software_service_technical_consulting,
                description: m.software_service_technical_consulting_description,
            },
            {
                id: "support-maintenance",
                link: { to: "/software/services/support-maintenance" },
                title: m.software_service_support_maintenance,
                description: m.software_service_support_maintenance_description,
            },
        ],
    },
];

function ServiceCard({ service }: { service: Service }) {
    return (
        <Link {...service.link} className="group/service">
            <HoverCard className="gap-1 px-6">
                <div className="flex justify-between items-center gap-4">
                    <TextH3 size="md-4" className="font-medium">
                        {service.title()}
                    </TextH3>
                    <IconArrowRight className="shrink-0 text-muted-foreground transition-all group-hover/service:translate-x-1 group-hover/service:text-primary" />
                </div>
                <TextP variant="muted" size="sm-2">
                    {service.description()}
                </TextP>
            </HoverCard>
        </Link>
    );
}

function ServiceGroupEntry({ group }: { group: ServiceGroup }) {
    const Illustration = group.illustration;

    return (
        <article id={group.id} className="relative isolate flex flex-col gap-6 pt-24 scroll-mt-8">
            <Illustration
                aria-hidden
                className="absolute -z-10 -top-8 right-0 size-96 opacity-50 pointer-events-none mask-b-from-50%"
            />
            <TextH2 size="md-2">{group.title()}</TextH2>
            <div className="flex flex-col gap-3">
                {
                    group.services.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))
                }
            </div>
        </article>
    );
}

interface ServicesSectionProps { }

export function ServicesSection(props: ServicesSectionProps) {
    return (
        <section
            id="servicii"
            className="flex flex-col justify-center items-center px-6 py-16"
        >
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow>{m.common_services()}</Eyebrow>
                <TextH1 className="mb-4 max-w-[24ch]">{m.software_services_title()}</TextH1>
                <TextP variant="muted" size="md-3" className="max-w-[56ch] mb-14">
                    {m.software_services_description()}
                </TextP>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
                    {
                        serviceGroups.map((group) => (
                            <ServiceGroupEntry key={group.id} group={group} />
                        ))
                    }
                </div>
            </div>
        </section>
    );
}

/** Finds a service and the group it belongs to. */
export function findService(id: SoftwareServiceId) {
    for (const group of serviceGroups) {
        const service = group.services.find((value) => value.id === id);
        if (service) return { group, service };
    }
    throw new Error(`Unknown software service: ${id}`);
}
