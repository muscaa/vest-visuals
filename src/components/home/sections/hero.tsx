import { Link } from "@tanstack/react-router";
import { IconArrowRight } from "@tabler/icons-react";
import { cn } from "@shared/shadcn/utils";
import { serviceGroups } from "../../software/sections/services";
import { mediaServices } from "../../media/service";
import type { LinkOptions } from "@tanstack/react-router";
import Wireframe from "@/components/illustrations/wireframe.svg?react";
import { Img } from "@/components/img";
import { Eyebrow } from "@/components/eyebrow";
import { TextH2, TextP, TextSpan } from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";

//
// divisions
//
export type Audience = "afaceri" | "evenimente";

export type DivisionLink = LinkOptions & {
    name: string;
};

export interface Division {
    id: string;
    name: string;
    /** short keywords, joined into the page h1, title and description */
    keywords: string[];
    /** home page of the division */
    link: LinkOptions;
    audience: Audience[];
    services: DivisionLink[];
    /** what the division does for businesses, shown in the business section */
    business?: {
        title: string;
        description: string;
    };
    /** each division draws its own tile, in its own style */
    tile: React.ComponentType;
}

/** Joins words the Romanian way: "a, b și c". */
export function joinWords(words: string[]) {
    return words.length > 1
        ? `${words.slice(0, -1).join(", ")} și ${words[words.length - 1]}`
        : (words[0] ?? "");
}

const tile =
    "group/tile relative isolate flex flex-col justify-end min-h-[34rem] p-8 md:p-10 rounded-4xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl";

/** Media: the media style (full photo, big type, italic accent). */
function MediaTile() {
    return (
        <Link to="/media" className={cn(tile, "theme-dark")}>
            <Img
                src="https://cdn0.vestvisuals.ro/portfolio/yu9eomg0ef4f66u2gpbqws4t/large"
                alt="Fotografie de la un eveniment realizată de Vest Visuals"
                className="absolute -z-10 inset-0 size-full object-cover transition-all duration-500 group-hover/tile:scale-105"
            />
            <div className="absolute -z-10 inset-0 bg-linear-to-b from-transparent from-30% to-black/85" />
            <TextSpan size="sm-3" font="mono-1" className="mb-3 text-foreground/70">
                Media
            </TextSpan>
            <TextH2 size="lg-4" className="mb-4">
                Momentele care <i className="text-chart-1">contează.</i>
            </TextH2>
            <TextP className="max-w-[44ch] mb-8 text-foreground/80">
                Nunți, botezuri, majorate, portrete, imobiliare, automotive și
                conținut pentru branduri.
            </TextP>
            <span className={cn(buttonVariants({ size: "xl", variant: "white" }), "self-start")}>
                Vezi Media
                <IconArrowRight data-icon="inline-end" className="transition-all group-hover/tile:translate-x-1" />
            </span>
        </Link>
    );
}

/** Software: the software style (muted surface, grid, illustration, plain type). */
function SoftwareTile() {
    return (
        <Link to="/software" className={cn(tile, "bg-muted")}>
            <div className="grid-background" />
            <Wireframe
                aria-hidden
                className="absolute -z-10 top-8 right-8 size-48 opacity-60 transition-all duration-500 group-hover/tile:scale-105"
            />
            <TextSpan variant="muted" size="sm-3" font="mono-1" className="mb-3">
                Software
            </TextSpan>
            <TextH2 size="lg-4" className="mb-4">
                Software construit să dureze
            </TextH2>
            <TextP variant="muted" className="max-w-[44ch] mb-8">
                Aplicații web și mobile, software personalizat, cloud, date și
                automatizări.
            </TextP>
            <span className={cn(buttonVariants({ size: "xl" }), "self-start")}>
                Vezi serviciile software
                <IconArrowRight data-icon="inline-end" className="transition-all group-hover/tile:translate-x-1" />
            </span>
        </Link>
    );
}

export const divisions: Division[] = [
    {
        id: "software",
        name: "Software",
        keywords: ["software"],
        link: { to: "/software" },
        audience: ["afaceri"],
        services: serviceGroups.flatMap((group) =>
            group.services.map((service) => ({
                name: service.title,
                ...service.link,
            })),
        ),
        business: {
            title: "Site-uri, aplicații și automatizări",
            description:
                "Site-ul sau aplicația de care ai nevoie, infrastructura pe care rulează și automatizările care îți scot munca repetitivă din zi.",
        },
        tile: SoftwareTile,
    },
    {
        id: "media",
        name: "Media",
        keywords: ["foto", "video"],
        link: { to: "/media" },
        audience: ["evenimente", "afaceri"],
        services: mediaServices.map(({ image, ...service }) => service),
        business: {
            title: "Foto și video pentru brand",
            description:
                "Fotografii de produs, imobiliare și automotive, plus clipuri de prezentare care arată afacerea ta așa cum merită.",
        },
        tile: MediaTile,
    },
];

/** e.g. "foto, video și software" */
export const divisionKeywords = joinWords(divisions.flatMap((division) => division.keywords));

/** e.g. "Foto, video și software", the start of the h1 and the page title */
export const headline = divisionKeywords.charAt(0).toUpperCase() + divisionKeywords.slice(1);

const gridColumns: Record<number, string> = {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
};

//
// section
//
interface DivisionsSectionProps {}

export function DivisionsSection(props: DivisionsSectionProps) {
    return (
        <section
            id="domenii"
            className="flex flex-col justify-center items-center px-6 py-16"
        >
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow>Domeniile noastre</Eyebrow>
                <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-8 mb-12">
                    <TextH2 size="lg-3">
                        {headline}{" "}
                        <span className="text-muted-foreground">pentru afaceri și oameni.</span>
                    </TextH2>
                    <TextP variant="muted" size="md-3" className="max-w-[48ch]">
                        Fiecare domeniu are echipa lui, cu oameni specializați
                        exact în ce fac. Alege de ce ai nevoie.
                    </TextP>
                </div>
                <div
                    className={cn(
                        "grid grid-cols-1 gap-6",
                        gridColumns[divisions.length] ?? "md:grid-cols-2",
                    )}
                >
                    {divisions.map(({ id, tile: Tile }) => (
                        <Tile key={id} />
                    ))}
                </div>
            </div>
        </section>
    );
}
