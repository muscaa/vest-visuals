import { m } from "@shared/paraglide/messages";
import { cn } from "@shared/shadcn/utils";
import { Link } from "@tanstack/react-router";
import type { LinkOptions } from "@tanstack/react-router";
import { Eyebrow } from "@/components/eyebrow";
import { Img } from "@/components/img";
import { mediaLocations } from "@/components/media/location";
import { TextH1, TextH2, TextP } from "@/components/typography";
import { Rich } from "@/components/rich";

type LocationsEntryProps = LinkOptions & {
    name: string;
    county?: string;
    image?: string;
    description?: string;
    accent?: string;
    className?: string;
};

function LocationsEntry({
    name,
    county,
    image,
    description,
    accent,
    className,
    ...props
}: LocationsEntryProps) {
    return (
        <Link
            {...props}
            className={cn(
                "group/locations-entry relative flex flex-col min-h-32 gap-1 p-6",
                "rounded-2xl overflow-hidden transition-all bg-card hover:bg-muted",
                className,
            )}
        >
            {image && (
                <Img
                    src={image}
                    alt="" // decorative, the city name is the link text
                    className="absolute pointer-events-none inset-0 size-full object-cover brightness-75 mask-l-from-0% mask-l-to-100%"
                />
            )}
            <TextH2 className={`z-10 ${accent ? "text-success" : ""}`}>
                {name}
            </TextH2>
            {county && (
                <TextP
                    variant="muted"
                    size="sm-3"
                    font="mono-1"
                    className="z-10"
                >
                    {county}
                </TextP>
            )}
            {description && (
                <TextP size="md-3" className="z-10">
                    {description}
                </TextP>
            )}
            {accent && (
                <TextP size="sm-1" className="z-10 text-success">
                    {accent}
                </TextP>
            )}
        </Link>
    );
}

interface LocationsSectionProps {}

export function LocationsSection(props: LocationsSectionProps) {
    return (
        <section
            id="locations"
            className="flex flex-col justify-center items-center px-6 py-16 bg-linear-to-b from-transparent to-success/20"
        >
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow>{m.media_locations_eyebrow()}</Eyebrow>
                <div className="grid grid-cols-2 items-end gap-8 mb-16">
                    <TextH1 size="lg-2">
                        <Rich message={m.media_locations_title} />
                    </TextH1>
                    <TextP variant="muted" size="md-3">
                        {m.media_locations_description()}
                    </TextP>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        mediaLocations.map(({ id, name, county, image, ...link }, index) => (
                            <LocationsEntry
                                key={id}
                                {...link}
                                name={name()}
                                county={county()}
                                image={image}
                                className={index === 0 ? "sm:col-span-2 lg:col-span-3" : undefined}
                            />
                        ))
                    }
                    <LocationsEntry
                        to="/media/contact"
                        name={m.media_locations_elsewhere()}
                        description={m.media_locations_elsewhere_description()}
                        accent={m.media_locations_elsewhere_accent()}
                        className="hover:bg-[color-mix(in_oklab,var(--color2)_20%,var(--muted))]"
                    />
                </div>
            </div>
        </section>
    );
}
