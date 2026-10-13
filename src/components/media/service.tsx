import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { IconArrowRight, IconCheck } from "@tabler/icons-react";
import { cn } from "@shared/shadcn/utils";
import { CTASection } from "./sections/cta";
import type { Icon } from "@tabler/icons-react";
import type { LinkOptions } from "@tanstack/react-router";
import { HoverCard } from "@/components/cards/hover";
import { Eyebrow } from "@/components/eyebrow";
import { Img } from "@/components/img";
import { Main } from "@/components/main";
import {
    TextH1,
    TextH2,
    TextH3,
    TextLink,
    TextP,
    TextSpan,
} from "@/components/typography";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
export type MediaService = LinkOptions & {
    name: string;
};

/** Every media service page, used for related links, the home page and anywhere else they're listed. */
export const mediaServices: MediaService[] = [
    { name: "Nunți", to: "/media/services/wedding" },
    { name: "Botezuri", to: "/media/services/christening" },
    { name: "Majorate", to: "/media/services/18th-birthday" },
    { name: "Ședințe foto", to: "/media/services/photo-session" },
    { name: "Imobiliare", to: "/media/services/real-estate" },
    { name: "Automotive", to: "/media/services/automotive" },
    { name: "Promovare afaceri", to: "/media/services/business-promotion" },
];

//
// types
//
export interface ServicePackage {
    icon: Icon;
    title: string;
    /** one line on who the package is for */
    description: string;
    /** starting price, every client gets a custom offer */
    from: string;
    /** shown after the price, e.g. "€" or "€/oră" */
    unit: string;
    features: string[];
    recommended?: boolean;
}

export interface ServiceQuestion {
    question: string;
    answer: string;
}

export interface ServicePageProps {
    /** the service's name, as listed in {@link mediaServices} */
    name: string;
    /** the page h1: says what and where, the way people search for it */
    title: React.ReactNode;
    description: string;
    images: string[];
    /** used in the photos' alt text, e.g. "de nuntă" */
    imageAlt: string;
    packages: ServicePackage[];
    about: {
        title: string;
        paragraphs: string[];
    };
    faq: ServiceQuestion[];
}

//
// hero
//
function HeroOverlay(
    props: Pick<ServicePageProps, "name" | "title" | "description">,
) {
    const { api } = useCarousel();

    useEffect(() => {
        if (!api) return;

        const interval = setInterval(api.scrollNext, 5000);
        return () => clearInterval(interval);
    }, [api]);

    return (
        <div className="flex flex-col items-center px-6 py-10 min-h-screen-no-nav pointer-events-none theme-dark bg-linear-to-b from-black/30 via-black/10 to-black/60">
            <div className="flex flex-col justify-between gap-8 max-w-7xl w-full grow">
                <Breadcrumb className="pointer-events-auto">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink render={<Link to="/media" />}>
                                Media
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                render={<Link to="/media" hash="portfolio" />}
                            >
                                Servicii
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{props.name}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
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
                            Vezi pachetele
                        </Button>
                        <Button
                            variant="outline"
                            size="xl"
                            nativeButton={false}
                            render={<Link to="/media/contact" />}
                        >
                            Cere o ofertă
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

function HeroSection(
    props: Pick<
        ServicePageProps,
        "name" | "title" | "description" | "images" | "imageAlt"
    >,
) {
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
                                alt={`Fotografie ${props.imageAlt} realizată de Vest Visuals (${index + 1})`}
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
                    Cel mai ales
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
                    De la
                </TextSpan>
                <div className="flex items-baseline gap-2">
                    <TextSpan
                        size="lg-3"
                        className={cn(
                            "tabular-nums",
                            pkg.recommended && "text-primary",
                        )}
                    >
                        {pkg.from}
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
                Cere o ofertă
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

function PackagesSection(props: Pick<ServicePageProps, "packages">) {
    const packages = orderPackages(props.packages);

    return (
        <section
            id="pachete"
            className="flex flex-col justify-center items-center px-6 py-16 bg-linear-to-b from-muted to-transparent scroll-mt-4"
        >
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow>Pachete</Eyebrow>
                <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-8 mb-16">
                    <TextH2 size="lg-2">
                        Alege <i className="text-primary">pachetul.</i>
                    </TextH2>
                    <TextP variant="muted" size="md-3">
                        Prețurile sunt orientative. Fiecare client primește o
                        ofertă personalizată, în funcție de durată, locație și
                        de ce ai nevoie.
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
function AboutSection(props: Pick<ServicePageProps, "name" | "about">) {
    const related = mediaServices.filter(
        (service) => service.name !== props.name,
    );

    return (
        <section
            id="despre"
            className="flex flex-col justify-center items-center px-6 py-16"
        >
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow>Despre serviciu</Eyebrow>
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
                        aria-label="Alte servicii foto și video"
                        className="flex flex-col gap-4"
                    >
                        <TextH3 size="sm-3" font="mono-1" variant="muted">
                            Alte servicii
                        </TextH3>
                        <ul className="flex flex-col gap-3">
                            {related.map(({ name, ...link }) => (
                                <li key={name}>
                                    <Link
                                        {...link}
                                        className="group/related block"
                                    >
                                        <HoverCard className="flex-row justify-between items-center px-6 py-4">
                                            <TextSpan size="md-3">
                                                {name}
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
function FAQSection(props: Pick<ServicePageProps, "faq">) {
    return (
        <section
            id="intrebari"
            className="flex flex-col justify-center items-center px-6 py-16 bg-linear-to-b from-muted to-transparent"
        >
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow>Întrebări</Eyebrow>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-12 md:gap-16">
                    <div className="flex flex-col gap-6">
                        <TextH2 size="lg-2">
                            Întrebări <i className="text-primary">frecvente.</i>
                        </TextH2>
                        <TextP variant="muted" size="md-3">
                            Nu ai găsit răspunsul? Scrie-ne la{" "}
                            <TextLink href="mailto:contact@vestvisuals.ro">
                                contact@vestvisuals.ro
                            </TextLink>{" "}
                            și îți răspundem direct.
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
    return (
        <Main>
            <HeroSection {...props} />
            <PackagesSection packages={props.packages} />
            <AboutSection name={props.name} about={props.about} />
            <FAQSection faq={props.faq} />
            <CTASection />
        </Main>
    );
}
