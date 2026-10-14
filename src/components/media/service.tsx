import { m } from "@shared/paraglide/messages";
import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { IconArrowRight, IconCheck } from "@tabler/icons-react";
import { cn } from "@shared/shadcn/utils";
import { CTASection } from "./sections/cta";
import type { Icon } from "@tabler/icons-react";
import type { LinkOptions } from "@tanstack/react-router";
import type { Localized } from "@/i18n";
import { HoverCard } from "@/components/cards/hover";
import { Eyebrow } from "@/components/eyebrow";
import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { Img } from "@/components/img";
import { Main } from "@/components/main";
import {
    TextH1,
    TextH2,
    TextH3,
    TextP,
    TextSpan,
} from "@/components/typography";
import { Rich } from "@/components/rich";
import { formatNumber, localize } from "@/i18n";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselCounter,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    useCarousel,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";

//
// services
//
export type MediaServiceId =
    | "wedding"
    | "christening"
    | "18th-birthday"
    | "photo-session"
    | "real-estate"
    | "automotive"
    | "business-promotion";

export type MediaService = LinkOptions & {
    id: MediaServiceId;
    /** a message function, called while rendering so it's in the visitor's locale */
    name: () => string;
    /** cover photo for cards linking to the service */
    image: string;
};

/** Every media service page, used for related links, the home page and anywhere else they're listed. */
export const mediaServices: MediaService[] = [
    { id: "wedding", name: m.media_service_wedding, to: "/media/services/wedding", image: "https://s3.vestvisuals.ro/portfolio/b4dwo04rs8ta7na0zzbflpuv/medium" },
    { id: "christening", name: m.media_service_christening, to: "/media/services/christening", image: "https://cdn0.vestvisuals.ro/portfolio/yu9eomg0ef4f66u2gpbqws4t/medium" },
    { id: "18th-birthday", name: m.media_service_18th_birthday, to: "/media/services/18th-birthday", image: "https://cdn0.vestvisuals.ro/portfolio/qyko3rjjfg14yjhvs2l45wck/medium" },
    { id: "photo-session", name: m.media_service_photo_session, to: "/media/services/photo-session", image: "https://s3.vestvisuals.ro/portfolio/tp2e4xpmgdo71mx3q8ixtt0f/medium" },
    { id: "real-estate", name: m.media_service_real_estate, to: "/media/services/real-estate", image: "https://s3.vestvisuals.ro/portfolio/f64uxutmybs9iuc08j1cp73y/medium" },
    { id: "automotive", name: m.media_service_automotive, to: "/media/services/automotive", image: "https://s3.vestvisuals.ro/portfolio/ok1f6eurgum0dnwollokpqzv/medium" },
    { id: "business-promotion", name: m.media_service_business_promotion, to: "/media/services/business-promotion", image: "https://s3.vestvisuals.ro/portfolio/xrja8xss5xpgf6ytj14rvcr0/medium" },
];

/** Finds a media service by id. */
export function findMediaService(id: MediaServiceId) {
    const service = mediaServices.find((value) => value.id === id);
    if (!service) throw new Error(`Unknown media service: ${id}`);
    return service;
}

//
// types
//
export interface ServicePackage {
    icon: Icon;
    title: string;
    /** one line on who the package is for */
    description: string;
    /** starting price, every client gets a custom offer; formatted for the locale */
    from: number;
    /** shown after the price, e.g. "€" or "€/oră" / "€/hour" */
    unit: string;
    features: string[];
    recommended?: boolean;
}

export interface ServiceQuestion {
    question: string;
    answer: string;
}

/** A media service page's text in one locale, see src/i18n/media/services. */
export interface MediaServiceContent {
    /** the page h1: says what and where, the way people search for it */
    title: React.ReactNode;
    description: string;
    /** what the photos show, in the photos' alt text: "Fotografie {de nuntă} …" / "{Wedding} photo …" */
    imageAlt: string;
    packages: ServicePackage[];
    about: {
        title: string;
        paragraphs: string[];
    };
    faq: ServiceQuestion[];
}

export interface ServicePageProps {
    service: MediaServiceId;
    /** the same in every locale */
    images: string[];
    content: Localized<MediaServiceContent>;
}

type SectionProps = MediaServiceContent & { service: MediaServiceId; images: string[] };

//
// hero
//
function HeroOverlay(props: Pick<SectionProps, "title" | "description">) {
    const { api } = useCarousel();

    useEffect(() => {
        if (!api) return;

        const interval = setInterval(api.scrollNext, 5000);
        return () => clearInterval(interval);
    }, [api]);

    return (
        <div className="flex flex-col items-center px-6 py-10 min-h-[80dvh] pointer-events-none theme-dark bg-linear-to-b from-black/30 via-black/10 to-black/60">
            <div className="flex flex-col justify-between gap-8 max-w-7xl w-full grow">
                <div />
                <TextH1 size="lg-1">{props.title}</TextH1>
                <div className="flex flex-col gap-8">
                    <TextP size="md-3" className="max-w-[60ch] text-pretty">
                        {props.description}
                    </TextP>
                    <div className="flex not-xs:flex-col gap-4 pointer-events-auto">
                        <Button
                            variant="white"
                            size="xl"
                            nativeButton={false}
                            render={<Link to="." hash="pachete" />}
                        >
                            {m.media_service_see_packages()}
                        </Button>
                        <Button
                            variant="outline"
                            size="xl"
                            nativeButton={false}
                            render={<Link to="/media/contact" />}
                        >
                            {m.common_request_quote()}
                        </Button>
                    </div>
                </div>
                <div className="flex justify-center sm:justify-end items-center gap-2 pointer-events-auto">
                    <CarouselPrevious className="relative inset-0 translate-y-0" />
                    <CarouselCounter />
                    <CarouselNext className="relative inset-0 translate-y-0" />
                </div>
            </div>
        </div>
    );
}

function HeroSection(props: Pick<SectionProps, "title" | "description" | "images" | "imageAlt">) {
    return (
        <section id="hero" className="relative isolate flex w-full">
            <Carousel opts={{ loop: true }} className="size-full">
                <HeroOverlay {...props} />
                <CarouselContent
                    extraClassName="absolute inset-0 -z-10"
                    className="m-0"
                >
                    {props.images.map((image, index) => (
                        <CarouselItem key={image} className="p-0">
                            <Img
                                src={image}
                                alt={m.media_service_photo_alt({ kind: props.imageAlt, number: index + 1 })}
                                loading={index === 0 ? "eager" : "lazy"}
                                fetchPriority={index === 0 ? "high" : "low"}
                                className="size-full object-cover"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </section>
    );
}

//
// packages
//
function PackageCard({ pkg }: { pkg: ServicePackage }) {
    const PackageIcon = pkg.icon;

    return (
        <Card
            className={cn(
                "relative overflow-visible gap-6 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl",
                // a primary outline and a soft primary glow from the top, on top of the normal card color
                pkg.recommended &&
                    "lg:-my-4 lg:py-12 shadow-xl ring-2 ring-primary dark:ring-primary bg-linear-to-b from-primary/15 via-transparent to-transparent",
            )}
        >
            {pkg.recommended && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 px-3 font-mono uppercase shadow-md">
                    {m.media_service_recommended()}
                </Badge>
            )}
            <div className="flex flex-col gap-4">
                <div
                    className={cn(
                        "flex justify-center items-center size-14 rounded-2xl",
                        pkg.recommended
                            ? "bg-primary text-primary-foreground"
                            : "bg-primary/10 text-primary",
                    )}
                >
                    <PackageIcon className="size-7" />
                </div>
                <div className="flex flex-col gap-1">
                    <TextH3 size="md-2">{pkg.title}</TextH3>
                    <TextP variant="muted">{pkg.description}</TextP>
                </div>
            </div>
            <div className="flex flex-col">
                <TextSpan size="sm-3" font="mono-1" variant="muted">
                    {m.media_service_from()}
                </TextSpan>
                <div className="flex items-baseline gap-2">
                    <TextSpan
                        size="lg-3"
                        className={cn(
                            "tabular-nums",
                            pkg.recommended && "text-primary",
                        )}
                    >
                        {formatNumber(pkg.from)}
                    </TextSpan>
                    <TextSpan size="md-3" variant="muted">
                        {pkg.unit}
                    </TextSpan>
                </div>
            </div>
            <Separator />
            <ul className="flex flex-col gap-3 grow">
                {pkg.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                        <IconCheck className="size-5 shrink-0 mt-0.5 text-primary" />
                        <TextSpan>{feature}</TextSpan>
                    </li>
                ))}
            </ul>
            <Button
                size="xl"
                variant={pkg.recommended ? "default" : "outline"}
                nativeButton={false}
                render={<Link to="/media/contact" />}
                className="w-full"
            >
                {m.common_request_quote()}
            </Button>
        </Card>
    );
}

/** The recommended package goes in the middle of a row of three, where the eye lands first. */
function orderPackages(packages: ServicePackage[]) {
    const recommended = packages.findIndex((pkg) => pkg.recommended);
    if (packages.length !== 3 || recommended === -1 || recommended === 1)
        return packages;

    const rest = packages.filter((_, index) => index !== recommended);
    return [rest[0], packages[recommended], rest[1]];
}

function PackagesSection(props: Pick<SectionProps, "packages">) {
    const packages = orderPackages(props.packages);

    return (
        <section
            id="pachete"
            className="flex flex-col justify-center items-center px-6 py-16 bg-linear-to-b from-muted to-transparent scroll-mt-4"
        >
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow>{m.media_service_packages_eyebrow()}</Eyebrow>
                <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-8 mb-16">
                    <TextH2 size="lg-2">
                        <Rich message={m.media_service_packages_title} />
                    </TextH2>
                    <TextP variant="muted" size="md-3">
                        {m.media_service_packages_description()}
                    </TextP>
                </div>
                <div
                    className={cn(
                        "grid grid-cols-1 md:grid-cols-2 items-stretch gap-6 pt-3",
                        packages.length % 3 === 0 && "lg:grid-cols-3",
                        packages.length === 2 && "max-w-4xl w-full mx-auto",
                    )}
                >
                    {packages.map((pkg) => (
                        <PackageCard key={pkg.title} pkg={pkg} />
                    ))}
                </div>
            </div>
        </section>
    );
}

//
// about
//
function AboutSection(props: Pick<SectionProps, "service" | "about">) {
    const related = mediaServices.filter(
        (service) => service.id !== props.service,
    );

    return (
        <section
            id="despre"
            className="flex flex-col justify-center items-center px-6 py-16"
        >
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow>{m.common_about_service()}</Eyebrow>
                <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-12 lg:gap-24">
                    <div className="flex flex-col">
                        <TextH2 size="md-1" className="mb-8">
                            {props.about.title}
                        </TextH2>
                        <div className="flex flex-col gap-4 max-w-[68ch]">
                            {props.about.paragraphs.map((paragraph) => (
                                <TextP
                                    key={paragraph}
                                    variant="muted"
                                    size="md-4"
                                >
                                    {paragraph}
                                </TextP>
                            ))}
                        </div>
                    </div>
                    <nav
                        aria-label={m.media_service_other_label()}
                        className="flex flex-col gap-4"
                    >
                        <TextH3 size="sm-3" font="mono-1" variant="muted">
                            {m.common_other_services()}
                        </TextH3>
                        <ul className="flex flex-col gap-3">
                            {related.map(({ id, name, image, ...link }) => (
                                <li key={id}>
                                    <Link
                                        {...link}
                                        className="group/related block"
                                    >
                                        <HoverCard className="flex-row justify-between items-center px-6 py-4">
                                            <TextSpan size="md-3">
                                                {name()}
                                            </TextSpan>
                                            <IconArrowRight className="text-muted-foreground transition-all group-hover/related:translate-x-1 group-hover/related:text-primary" />
                                        </HoverCard>
                                    </Link>
                                </li>
                            ))}
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
export function FAQSection(props: Pick<SectionProps, "faq">) {
    return (
        <section
            id="intrebari"
            className="flex flex-col justify-center items-center px-6 py-16 bg-linear-to-b from-muted to-transparent"
        >
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow>{m.common_faq_eyebrow()}</Eyebrow>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-12 md:gap-16">
                    <div className="flex flex-col gap-6">
                        <TextH2 size="lg-2">
                            <Rich message={m.common_faq_title_rich} />
                        </TextH2>
                        <TextP variant="muted" size="md-3">
                            <Rich message={m.common_faq_more} />
                        </TextP>
                    </div>
                    <Accordion className="rounded-3xl bg-card">
                        {props.faq.map(({ question, answer }) => (
                            <AccordionItem key={question} value={question}>
                                <AccordionTrigger className="p-6 text-md-4 hover:no-underline">
                                    {question}
                                </AccordionTrigger>
                                <AccordionContent className="px-2 pb-6 text-sm-1 text-muted-foreground">
                                    <p>{answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}

//
// page
//
/** A media service page: photo hero, packages with starting prices, a description for search engines and the FAQ. */
export function ServicePage(props: ServicePageProps) {
    const content = localize(props.content);
    const service = findMediaService(props.service);

    return (
        <Main>
            <PageBreadcrumbs items={[{ name: "Media", to: "/media" }, { name: m.common_services(), to: "/media", hash: "portfolio" }]} page={service.name()} />
            <HeroSection {...content} images={props.images} />
            <PackagesSection packages={content.packages} />
            <AboutSection service={props.service} about={content.about} />
            <FAQSection faq={content.faq} />
            <CTASection />
        </Main>
    );
}
