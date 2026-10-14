import { m } from "@shared/paraglide/messages";
import { Link } from "@tanstack/react-router";
import { IconArrowRight } from "@tabler/icons-react";
import { CTASection } from "./sections/cta";
import { findService, serviceGroups } from "./sections/services";
import type { SoftwareServiceId } from "./sections/services";
import type { Icon } from "@tabler/icons-react";
import type { Localized } from "@/i18n";
import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { HoverCard } from "@/components/cards/hover";
import { Eyebrow } from "@/components/eyebrow";
import { Main } from "@/components/main";
import { TextH1, TextH2, TextH3, TextP, TextSpan } from "@/components/typography";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rich } from "@/components/rich";
import { localize } from "@/i18n";

//
// types
//
export interface ServiceFeature {
    icon: Icon;
    title: string;
    description: string;
}

export interface ServiceQuestion {
    question: string;
    answer: string;
}

/** A software service page's text in one locale, see src/i18n/software/services. */
export interface SoftwareServiceContent {
    /** the page h1: says what the service is, the way people search for it */
    title: string;
    description: string;
    features: ServiceFeature[];
    about: {
        title: string;
        paragraphs: string[];
    };
    faq: ServiceQuestion[];
}

export interface ServicePageProps {
    service: SoftwareServiceId;
    /** usually the same in every locale; localized when they're words, not product names */
    technologies: string[] | Localized<string[]>;
    content: Localized<SoftwareServiceContent>;
}

type SectionProps = SoftwareServiceContent & { service: SoftwareServiceId };

//
// hero
//
function HeroSection(props: Pick<SectionProps, "service" | "title" | "description">) {
    const { group } = findService(props.service);
    const Illustration = group.illustration;

    return (
        <section
            id="hero"
            className="relative flex flex-col justify-center items-center px-6 pt-20 pb-16 bg-linear-to-b from-transparent to-muted"
        >
            <div className="grid-background" />
            <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] items-center gap-16 max-w-7xl w-full">
                <div className="flex flex-col">
                    <TextSpan variant="muted" size="sm-3" font="mono-1" className="mb-4">
                        {group.title()}
                    </TextSpan>
                    <TextH1 size="lg-3" className="max-w-[18ch]">
                        {props.title}
                    </TextH1>
                    <TextP variant="muted" size="md-3" className="max-w-[54ch] my-10">
                        {props.description}
                    </TextP>
                    <div className="flex flex-wrap gap-4">
                        <Button
                            size="xl"
                            nativeButton={false}
                            render={<Link to="/software/contact" />}
                        >
                            {m.common_request_quote()}
                        </Button>
                        <Button
                            size="xl"
                            variant="outline"
                            nativeButton={false}
                            render={<Link to="." hash="ce-include" />}
                        >
                            {m.software_service_whats_included()}
                        </Button>
                    </div>
                </div>
                <Illustration aria-hidden className="w-full max-w-md h-auto justify-self-center" />
            </div>
        </section>
    );
}

//
// features
//
function FeaturesSection(props: Pick<SectionProps, "features">) {
    return (
        <section
            id="ce-include"
            className="flex flex-col justify-center items-center px-6 py-16 scroll-mt-4"
        >
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow>{m.software_service_whats_included()}</Eyebrow>
                <TextH2 size="md-1" className="mb-14 max-w-[24ch]">
                    {m.software_service_features_title()}
                </TextH2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
                    {
                        props.features.map(({ icon: FeatureIcon, title, description }) => (
                            <li key={title} className="flex flex-col gap-3">
                                <div className="flex justify-center items-center size-12 rounded-lg border bg-muted text-primary">
                                    <FeatureIcon className="size-6" />
                                </div>
                                <TextH3 size="md-3" className="font-medium">{title}</TextH3>
                                <TextP variant="muted">{description}</TextP>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </section>
    );
}

//
// technologies
//
function TechnologiesSection(props: { technologies: string[] }) {
    return (
        <section
            id="tehnologii"
            className="flex flex-col justify-center items-center px-6 pb-16"
        >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] items-start gap-6 md:gap-16 max-w-7xl w-full">
                <div className="flex flex-col gap-2">
                    <TextH2 size="md-2">{m.software_service_technologies()}</TextH2>
                    <TextP variant="muted">{m.software_service_technologies_description()}</TextP>
                </div>
                <ul className="flex flex-wrap gap-2">
                    {
                        props.technologies.map((technology) => (
                            <li key={technology}>
                                <Badge variant="outline" className="h-8 px-4 text-sm-2">
                                    {technology}
                                </Badge>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </section>
    );
}

//
// about
//
function AboutSection(props: Pick<SectionProps, "service" | "about">) {
    const related = serviceGroups.flatMap((group) =>
        group.services.filter((service) => service.id !== props.service),
    );

    return (
        <section
            id="despre"
            className="flex flex-col justify-center items-center px-6 py-16 bg-linear-to-b from-muted to-transparent"
        >
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow>{m.common_about_service()}</Eyebrow>
                <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-12 lg:gap-24">
                    <div className="flex flex-col">
                        <TextH2 size="md-1" className="mb-8">{props.about.title}</TextH2>
                        <div className="flex flex-col gap-4 max-w-[68ch]">
                            {
                                props.about.paragraphs.map((paragraph) => (
                                    <TextP key={paragraph} variant="muted" size="md-4">
                                        {paragraph}
                                    </TextP>
                                ))
                            }
                        </div>
                    </div>
                    <nav aria-label={m.software_service_other_label()} className="flex flex-col gap-4">
                        <TextH3 size="sm-3" font="mono-1" variant="muted">{m.common_other_services()}</TextH3>
                        <ul className="flex flex-col gap-2">
                            {
                                related.map((service) => (
                                    <li key={service.id}>
                                        <Link {...service.link} className="group/related block">
                                            <HoverCard className="flex-row justify-between items-center px-5 py-3">
                                                <TextSpan size="md-4">{service.title()}</TextSpan>
                                                <IconArrowRight className="size-5 text-muted-foreground transition-all group-hover/related:translate-x-1 group-hover/related:text-primary" />
                                            </HoverCard>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>
                </div>
            </div>
        </section>
    );
}

//
// faq
//
function FAQSection(props: Pick<SectionProps, "faq">) {
    return (
        <section
            id="intrebari"
            className="flex flex-col justify-center items-center px-6 py-16"
        >
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow>{m.common_faq_eyebrow()}</Eyebrow>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-12 md:gap-16">
                    <div className="flex flex-col gap-4">
                        <TextH2 size="md-1">{m.common_faq_title()}</TextH2>
                        <TextP variant="muted" size="md-3">
                            <Rich message={m.common_faq_more} />
                        </TextP>
                    </div>
                    <Accordion className="rounded-xl bg-card">
                        {
                            props.faq.map(({ question, answer }) => (
                                <AccordionItem key={question} value={question}>
                                    <AccordionTrigger className="p-5 text-md-4 hover:no-underline">
                                        {question}
                                    </AccordionTrigger>
                                    <AccordionContent className="px-1 pb-5 text-sm-1 text-muted-foreground">
                                        <p>{answer}</p>
                                    </AccordionContent>
                                </AccordionItem>
                            ))
                        }
                    </Accordion>
                </div>
            </div>
        </section>
    );
}

//
// page
//
/** A software service page: hero, what's included, technologies, a description for search engines and the FAQ. */
export function ServicePage(props: ServicePageProps) {
    const content = localize(props.content);
    const { service } = findService(props.service);

    return (
        <Main>
            <PageBreadcrumbs
                items={[
                    { name: "Software", to: "/software" },
                    { name: m.common_services(), to: "/software", hash: "servicii" },
                ]}
                page={service.title()}
            />
            <HeroSection service={props.service} title={content.title} description={content.description} />
            <FeaturesSection features={content.features} />
            <TechnologiesSection technologies={Array.isArray(props.technologies) ? props.technologies : localize(props.technologies)} />
            <AboutSection service={props.service} about={content.about} />
            <FAQSection faq={content.faq} />
            <CTASection />
        </Main>
    );
}
