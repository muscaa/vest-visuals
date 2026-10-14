import { m } from "@shared/paraglide/messages";
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
import { Rich } from "@/components/rich";
import { formatList } from "@/i18n";

//
// divisions
//
/** Text is stored as message functions and only called while rendering, so it's in the visitor's locale. */
export type DivisionLink = LinkOptions & {
    name: () => string;
};

export interface Division {
    id: string;
    name: string;
    /** short keywords, joined into the page h1, title and description */
    keywords: (() => string)[];
    /** home page of the division */
    link: LinkOptions;
    services: DivisionLink[];
    /** each division draws its own tile, in its own style */
    tile: React.ComponentType;
}


const tile =
    "group/tile relative isolate flex flex-col justify-end min-h-[34rem] p-8 md:p-10 rounded-4xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl";

/** Media: the media style (full photo, big type, italic accent). */
function MediaTile() {
    return (
        <Link to="/media" className={cn(tile, "theme-dark")}>
            <Img
                src="https://cdn0.vestvisuals.ro/portfolio/yu9eomg0ef4f66u2gpbqws4t/large"
                alt={m.home_media_tile_alt()}
                className="absolute -z-10 inset-0 size-full object-cover transition-all duration-500 group-hover/tile:scale-105"
            />
            <div className="absolute -z-10 inset-0 bg-linear-to-b from-transparent from-30% to-black/85" />
            <TextSpan size="sm-3" font="mono-1" className="mb-3 text-foreground/70">
                Media
            </TextSpan>
            <TextH2 size="lg-4" className="mb-4">
                <Rich message={m.home_media_tile_title} />
            </TextH2>
            <TextP className="max-w-[44ch] mb-8 text-foreground/80">
                {m.home_media_tile_description()}
            </TextP>
            <span className={cn(buttonVariants({ size: "xl", variant: "white" }), "self-start")}>
                {m.home_media_tile_cta()}
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
                {m.home_software_tile_title()}
            </TextH2>
            <TextP variant="muted" className="max-w-[44ch] mb-8">
                {m.home_software_tile_description()}
            </TextP>
            <span className={cn(buttonVariants({ size: "xl" }), "self-start")}>
                {m.home_software_tile_cta()}
                <IconArrowRight data-icon="inline-end" className="transition-all group-hover/tile:translate-x-1" />
            </span>
        </Link>
    );
}

export const divisions: Division[] = [
    {
        id: "software",
        name: "Software",
        keywords: [m.home_keyword_software],
        link: { to: "/software" },
        services: serviceGroups.flatMap((group) =>
            group.services.map((service) => ({
                name: service.title,
                ...service.link,
            })),
        ),
        tile: SoftwareTile,
    },
    {
        id: "media",
        name: "Media",
        keywords: [m.home_keyword_photo, m.home_keyword_video],
        link: { to: "/media" },
        services: mediaServices.map(({ id, image, ...service }) => service),
        tile: MediaTile,
    },
];

/** e.g. "foto, video și software". Call it while rendering, it's in the visitor's locale. */
export function getDivisionKeywords() {
    return formatList(divisions.flatMap((division) => division.keywords.map((keyword) => keyword())));
}

/** e.g. "Foto, video și software", the start of the h1 and the page title. Call it while rendering. */
export function getHeadline() {
    const keywords = getDivisionKeywords();
    return keywords.charAt(0).toUpperCase() + keywords.slice(1);
}

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
            id="divisions"
            className="flex flex-col justify-center items-center px-6 py-16"
        >
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow>{m.home_divisions_eyebrow()}</Eyebrow>
                <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-8 mb-12">
                    <TextH2 size="lg-3">
                        <Rich message={m.home_divisions_title} inputs={{ headline: getHeadline() }} />
                    </TextH2>
                    <TextP variant="muted" size="md-3" className="max-w-[48ch]">
                        {m.home_divisions_description()}
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
