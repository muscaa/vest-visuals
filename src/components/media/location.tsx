import { m } from "@shared/paraglide/messages";
import { Link } from "@tanstack/react-router";
import {
    IconArrowRight,
    IconCalendarEvent,
    IconCar,
    IconMapPin,
} from "@tabler/icons-react";
import { cn } from "@shared/shadcn/utils";
import { FAQSection, mediaServices } from "./service";
import type { ServiceQuestion } from "./service";
import type { LinkOptions } from "@tanstack/react-router";
import type { Localized } from "@/i18n";
import { HoverCard } from "@/components/cards/hover";
import { Eyebrow } from "@/components/eyebrow";
import { PageBreadcrumbs } from "@/components/breadcrumbs";
import { Img } from "@/components/img";
import { Main } from "@/components/main";
import { TextH1, TextH2, TextH3, TextP, TextSpan } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Rich } from "@/components/rich";
import { localize } from "@/i18n";

//
// locations
//
export type MediaLocationId =
    | "timisoara"
    | "arad"
    | "oradea"
    | "drobeta-turnu-severin"
    | "cluj-napoca"
    | "bucuresti";

/** Text is stored as message functions and only called while rendering, so it's in the visitor's locale. */
export type MediaLocation = LinkOptions & {
    id: MediaLocationId;
    name: () => string;
    county: () => string;
    image: string;
};

/** Every city with its own page, used for the home page section and the "other cities" links. */
export const mediaLocations: MediaLocation[] = [
    {
        id: "timisoara",
        name: m.location_timisoara,
        county: m.county_timis,
        to: "/media/locations/timisoara",
        image: "https://images.unsplash.com/photo-1687696162729-a75f9ddc004d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: "arad",
        name: m.location_arad,
        county: m.county_arad,
        to: "/media/locations/arad",
        image: "https://images.unsplash.com/photo-1632207857925-a4d52c54d683?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: "oradea",
        name: m.location_oradea,
        county: m.county_bihor,
        to: "/media/locations/oradea",
        image: "https://images.unsplash.com/photo-1654172054677-9a8cd7a8c04a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: "drobeta-turnu-severin",
        name: m.location_drobeta,
        county: m.county_mehedinti,
        to: "/media/locations/drobeta-turnu-severin",
        image: "https://images.unsplash.com/photo-1592335234454-1454bd449a2c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: "cluj-napoca",
        name: m.location_cluj,
        county: m.county_cluj,
        to: "/media/locations/cluj-napoca",
        image: "https://images.unsplash.com/photo-1678736680989-195226823176?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: "bucuresti",
        name: m.location_bucuresti,
        county: m.county_bucuresti,
        to: "/media/locations/bucuresti",
        image: "https://images.unsplash.com/photo-1695314620864-b551fd6574ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
];

//
// types
//
export interface LocationSpot {
    name: string;
    description: string;
}

/** A location page's text in one locale, see src/i18n/media/locations. */
export interface LocationContent {
    /** the city in the locative, e.g. "în Timișoara" / "in Timișoara" */
    inCity: string;
    description: string;
    spots: LocationSpot[];
    faq: ServiceQuestion[];
}

export interface LocationPageProps {
    location: MediaLocationId;
    /** no travel costs for this city */
    freeTravel?: boolean;
    content: Localized<LocationContent>;
}

type SectionProps = LocationContent & { location: MediaLocation; freeTravel?: boolean };

function findLocation(id: MediaLocationId) {
    const location = mediaLocations.find((value) => value.id === id);
    if (!location) throw new Error(`Unknown location: ${id}`);
    return location;
}

//
// hero
//
function HeroSection(props: SectionProps) {
    return (
        <section id="hero" className="relative isolate flex w-full theme-dark">
            <Img
                src={props.location.image}
                alt={m.media_location_alt({ city: props.location.name(), county: props.location.county() })}
                loading="eager"
                fetchPriority="high"
                className="absolute -z-10 inset-0 size-full object-cover"
            />
            <div className="absolute -z-10 inset-0 bg-linear-to-b from-black/40 via-black/20 to-black/70" />
            <div className="flex flex-col items-center w-full px-6 py-10 min-h-[80dvh]">
                <div className="flex flex-col justify-between gap-8 max-w-7xl w-full grow">
                    <div />
                    <div className="flex flex-col gap-4">
                        <TextSpan size="sm-3" font="mono-1" className="text-foreground/70">
                            {
                                // Bucharest is a municipality, not a county
                                props.location.id === "bucuresti"
                                    ? m.media_location_bucharest_region()
                                    : m.media_location_county({ county: props.location.county() })
                            }
                        </TextSpan>
                        <TextH1 size="lg-1">
                            <Rich message={m.media_location_title} inputs={{ inCity: props.inCity }} />
                        </TextH1>
                    </div>
                    <div className="flex flex-col gap-8">
                        <TextP size="md-3" className="max-w-[60ch] text-pretty">
                            {props.description}
                        </TextP>
                        <div className="flex not-xs:flex-col gap-4">
                            <Button
                                variant="white"
                                size="xl"
                                nativeButton={false}
                                render={<Link to="/media/contact" />}
                            >
                                {m.common_request_quote()}
                            </Button>
                            <Button
                                variant="outline"
                                size="xl"
                                nativeButton={false}
                                render={<Link to="." hash="services" />}
                            >
                                {m.media_location_see_services()}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

//
// tiles
//
/** A photo card with a name on top, like the city cards on the media home page. */
function PhotoTile(props: LinkOptions & { name: string; label: string; image: string; alt: string; className?: string }) {
    const { name, label, image, alt, className, ...link } = props;

    return (
        <Link
            {...link}
            className={cn(
                "group/tile relative isolate flex flex-col justify-end gap-1 p-5 rounded-2xl overflow-hidden theme-dark",
                className,
            )}
        >
            <Img
                src={image}
                alt={alt}
                className="absolute -z-10 inset-0 size-full object-cover transition-all duration-300 group-hover/tile:scale-105"
            />
            <div className="absolute -z-10 inset-0 bg-linear-to-b from-transparent from-30% to-black/80" />
            <div className="flex justify-between items-end gap-3">
                <div className="flex flex-col">
                    <TextSpan size="md-2">{name}</TextSpan>
                    <TextSpan size="sm-3" font="mono-1" className="text-foreground/70">
                        {label}
                    </TextSpan>
                </div>
                <IconArrowRight className="size-5 shrink-0 mb-1 transition-all group-hover/tile:translate-x-1" />
            </div>
        </Link>
    );
}

/** The last card of a list, pointing to the contact page, like "În altă parte?" on the media home page. */
function ContactTile(props: { title: string; description: string; accent: string; className?: string }) {
    return (
        <Link
            to="/media/contact"
            className={cn(
                "flex flex-col justify-end gap-1 p-5 rounded-2xl bg-card transition-all hover:bg-[color-mix(in_oklab,var(--color2)_20%,var(--muted))]",
                props.className,
            )}
        >
            <TextSpan size="md-2" className="text-success">{props.title}</TextSpan>
            <TextP variant="muted">{props.description}</TextP>
            <TextSpan className="text-success">{props.accent}</TextSpan>
        </Link>
    );
}

//
// services
//
function ServicesSection(props: Pick<SectionProps, "inCity">) {
    return (
        <section
            id="services"
            className="flex flex-col justify-center items-center px-6 py-16 bg-linear-to-b from-muted to-transparent scroll-mt-4"
        >
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow>{m.common_services()}</Eyebrow>
                <TextH2 size="lg-2" className="mb-12">
                    <Rich message={m.media_location_services_title} inputs={{ inCity: props.inCity }} />
                </TextH2>
                <ul className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
                    {
                        mediaServices.map(({ id, name, image, ...link }) => (
                            <li key={id}>
                                <PhotoTile
                                    {...link}
                                    name={name()}
                                    label={props.inCity}
                                    image={image}
                                    alt={m.media_location_service_alt({ service: name(), inCity: props.inCity })}
                                    className="h-52"
                                />
                            </li>
                        ))
                    }
                    <li>
                        <ContactTile
                            title={m.media_location_other()}
                            description={m.media_location_other_description()}
                            accent={m.common_write_us()}
                            className="h-52"
                        />
                    </li>
                </ul>
            </div>
        </section>
    );
}

//
// spots
//
function SpotsSection(props: Pick<SectionProps, "inCity" | "spots">) {
    return (
        <section
            id="spots"
            className="flex flex-col justify-center items-center px-6 py-16"
        >
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow>{m.media_location_spots_eyebrow()}</Eyebrow>
                <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-8 mb-12">
                    <TextH2 size="lg-2">
                        <Rich message={m.media_location_spots_title} inputs={{ inCity: props.inCity }} />
                    </TextH2>
                    <TextP variant="muted" size="md-3">
                        {m.media_location_spots_description()}
                    </TextP>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        props.spots.map((spot) => (
                            <li key={spot.name} className="flex gap-4 p-6 rounded-3xl bg-card ring-1 ring-foreground/5 shadow-md">
                                <div className="flex justify-center items-center size-11 shrink-0 rounded-2xl bg-success/15 text-success">
                                    <IconMapPin className="size-5" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <TextH3 size="md-3">{spot.name}</TextH3>
                                    <TextP variant="muted">{spot.description}</TextP>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </section>
    );
}

//
// travel
//
function TravelSection(props: Pick<SectionProps, "location" | "freeTravel">) {
    const city = props.location.name();
    const items = [
        {
            icon: IconCar,
            title: props.freeTravel ? m.media_location_free_travel() : m.media_location_paid_travel(),
            text: props.freeTravel
                ? m.media_location_free_travel_description({ city })
                : m.media_location_paid_travel_description({ city }),
        },
        {
            icon: IconCalendarEvent,
            title: m.media_location_book_early(),
            text: m.media_location_book_early_description(),
        },
    ];

    return (
        <section
            id="travel"
            className="flex flex-col justify-center items-center px-6 pb-16"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl w-full">
                {
                    items.map(({ icon: ItemIcon, title, text }, index) => (
                        <div
                            key={title}
                            className={cn(
                                "flex gap-5 p-8 rounded-3xl",
                                index === 0 && props.freeTravel ? "bg-success/15" : "bg-muted",
                            )}
                        >
                            <ItemIcon
                                className={cn(
                                    "size-8 shrink-0",
                                    index === 0 && props.freeTravel ? "text-success" : "text-primary",
                                )}
                            />
                            <div className="flex flex-col gap-2">
                                <TextH3 size="md-2">{title}</TextH3>
                                <TextP variant="muted" size="md-4">{text}</TextP>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    );
}

//
// other cities
//
function OtherCitiesSection(props: Pick<SectionProps, "location">) {
    const others = mediaLocations.filter((location) => location.id !== props.location.id);

    return (
        <section
            id="other-cities"
            className="flex flex-col justify-center items-center px-6 py-16"
        >
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow>{m.media_location_other_cities()}</Eyebrow>
                <ul className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4">
                    {
                        others.map(({ id, name, county, image, ...link }) => (
                            <li key={id}>
                                <PhotoTile
                                    {...link}
                                    name={name()}
                                    label={county()}
                                    image={image}
                                    alt={m.media_location_alt({ city: name(), county: county() })}
                                    className="h-40"
                                />
                            </li>
                        ))
                    }
                    <li>
                        <ContactTile
                            title={m.media_locations_elsewhere()}
                            description={m.media_location_elsewhere_description()}
                            accent={m.media_locations_elsewhere_accent()}
                            className="h-40"
                        />
                    </li>
                </ul>
            </div>
        </section>
    );
}

//
// cta
//
function CTASection(props: Pick<SectionProps, "inCity">) {
    return (
        <section
            id="cta"
            className="flex flex-col justify-center items-center px-6 py-16"
        >
            <div className="flex flex-col items-center max-w-7xl w-full">
                <Eyebrow align="center" className="w-full">{m.common_contact()}</Eyebrow>
                <TextH2 size="lg-2" className="mb-8 text-center">
                    <Rich message={m.media_location_cta_title} inputs={{ inCity: props.inCity }} />
                </TextH2>
                <TextP variant="muted" size="md-3" className="max-w-[58ch] mb-12 text-center">
                    {m.media_location_cta_description()}
                </TextP>
                <div className="flex flex-wrap justify-center items-center gap-4">
                    <Button size="xl" nativeButton={false} render={<Link to="/media/contact" />}>
                        {m.common_request_quote()}
                    </Button>
                    <Button
                        size="xl"
                        variant="link"
                        nativeButton={false}
                        render={<a href="mailto:contact@vestvisuals.ro" />}
                    >
                        contact@vestvisuals.ro
                    </Button>
                </div>
            </div>
        </section>
    );
}

//
// page
//
/** A media location page: city hero, services, photo spots, travel, FAQ and other cities. */
export function LocationPage(props: LocationPageProps) {
    const location = findLocation(props.location);
    const content = localize(props.content);

    return (
        <Main>
            <PageBreadcrumbs items={[{ name: "Media", to: "/media" }, { name: m.common_locations(), to: "/media", hash: "locations" }]} page={location.name()} />
            <HeroSection {...content} location={location} freeTravel={props.freeTravel} />
            <ServicesSection inCity={content.inCity} />
            <SpotsSection inCity={content.inCity} spots={content.spots} />
            <TravelSection location={location} freeTravel={props.freeTravel} />
            <FAQSection faq={content.faq} />
            <OtherCitiesSection location={location} />
            <CTASection inCity={content.inCity} />
        </Main>
    );
}
