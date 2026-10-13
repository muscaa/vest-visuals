import { Link } from "@tanstack/react-router";
import { IconArrowRight } from "@tabler/icons-react";
import Database4 from "@/components/illustrations/database-4.svg?react";
import Maintenance1 from "@/components/illustrations/maintenance-1.svg?react";
import Wireframe from "@/components/illustrations/wireframe.svg?react";
import Workflow2 from "@/components/illustrations/workflow-2.svg?react";
import { HoverCard } from "@/components/cards/hover";
import { Eyebrow } from "@/components/eyebrow";
import { TextH1, TextH2, TextH3, TextP } from "@/components/typography";

export interface Service {
    /** url of the service page: /software/services/<slug> */
    slug: string;
    title: string;
    description: string;
}

export interface ServiceGroup {
    /** section anchor on the home page */
    id: string;
    title: string;
    illustration: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    services: Service[];
}

export const serviceGroups: ServiceGroup[] = [
    {
        id: "dezvoltare-software",
        title: "Dezvoltare software",
        illustration: Wireframe,
        services: [
            {
                slug: "aplicatii-web",
                title: "Aplicații web",
                description: "De la landing page-uri și magazine online la platforme web complexe. Design curat, responsive, și SEO făcut corect din prima zi.",
            },
            {
                slug: "aplicatii-mobile",
                title: "Aplicații mobile",
                description: "Aplicații pentru iOS și Android pe care oamenii chiar le folosesc cu plăcere. Intuitive, rapide și finisate până la detaliu.",
            },
            {
                slug: "software-personalizat",
                title: "Software personalizat",
                description: "Aplicații desktop, unelte interne și integrări între sistemele pe care le folosești deja, construite exact pe procesele tale.",
            },
        ],
    },
    {
        id: "cloud-date",
        title: "Cloud & date",
        illustration: Database4,
        services: [
            {
                slug: "cloud-devops",
                title: "Cloud & DevOps",
                description: "Migrăm, scalăm sau optimizăm infrastructura ta. Deployment-uri fără bătăi de cap și sisteme care rămân fiabile pe măsură ce crești.",
            },
            {
                slug: "data-engineering",
                title: "Data Engineering",
                description: "Colectare din orice sursă, ETL, baze de date și data warehousing. Construim și administrăm tot pipeline-ul, oricât de mari devin datele.",
            },
            {
                slug: "business-intelligence",
                title: "Business Intelligence",
                description: "Dashboard-uri și rapoarte care răspund la întrebări reale despre afacerea ta, nu doar cifre puse pe un grafic.",
            },
        ],
    },
    {
        id: "automatizari",
        title: "Automatizări",
        illustration: Workflow2,
        services: [
            {
                slug: "automatizarea-proceselor",
                title: "Automatizarea proceselor",
                description: "Îți analizăm fluxurile de lucru și automatizăm părțile repetitive: emailuri, rapoarte, procese întregi și pipeline-uri care rulează singure.",
            },
        ],
    },
    {
        id: "consultanta-mentenanta",
        title: "Consultanță & mentenanță",
        illustration: Maintenance1,
        services: [
            {
                slug: "consultanta-tehnica",
                title: "Consultanță tehnică",
                description: "Când ai nevoie de un plan mai mult decât de mâini în plus. Te ajutăm cu arhitectura, codebase-ul existent și deciziile despre ce merită construit.",
            },
            {
                slug: "suport-mentenanta",
                title: "Suport & mentenanță",
                description: "Ținem sistemele tale rapide, sigure și la zi, ca ce construim împreună să meargă bine ani buni după lansare.",
            },
        ],
    },
];

function ServiceCard({ service }: { service: Service }) {
    return (
        <Link
            to="/software/services/$service"
            params={{ service: service.slug }}
            className="group/service"
        >
            <HoverCard className="gap-1 px-6">
                <div className="flex justify-between items-center gap-4">
                    <TextH3 size="md-4" className="font-medium">
                        {service.title}
                    </TextH3>
                    <IconArrowRight className="shrink-0 text-muted-foreground transition-all group-hover/service:translate-x-1 group-hover/service:text-primary" />
                </div>
                <TextP variant="muted" size="sm-2">
                    {service.description}
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
            <TextH2 size="md-2">{group.title}</TextH2>
            <div className="flex flex-col gap-3">
                {
                    group.services.map((service) => (
                        <ServiceCard key={service.slug} service={service} />
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
                <Eyebrow>Servicii</Eyebrow>
                <TextH1 className="mb-4 max-w-[24ch]">Ce facem</TextH1>
                <TextP variant="muted" size="md-3" className="max-w-[56ch] mb-14">
                    Fiecare serviciu, de la aplicații la cloud și date, e făcut
                    de oameni cu experiență exact în acel domeniu. Așa păstrăm
                    calitatea ridicată în tipuri de muncă foarte diferite.
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
