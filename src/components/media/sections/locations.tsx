import { cn } from "@shared/shadcn/utils";
import { Link } from "@tanstack/react-router";
import type { LinkOptions } from "@tanstack/react-router";
import { Eyebrow } from "@/components/eyebrow";
import { Img } from "@/components/img";
import { TextH1, TextH2, TextP } from "@/components/typography";

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
                    alt="" // TODO
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
                <Eyebrow num="05">Unde filmam</Eyebrow>
                <div className="grid grid-cols-2 items-end gap-8 mb-16">
                    <TextH1 size="lg-2">
                        Oriunde{" "}
                        <i className="text-success">ne duce filmarea.</i>
                    </TextH1>
                    <TextP variant="muted" size="md-3">
                        Un proiect bun merită drumul. Ne strângem echipamentul
                        și venim acolo unde ai nevoie de noi, aproape sau
                        departe.
                    </TextP>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <LocationsEntry
                        to="/media"
                        name="Timișoara"
                        county="Timiș"
                        image="https://images.unsplash.com/photo-1687696162729-a75f9ddc004d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="sm:col-span-2 lg:col-span-3"
                    />
                    <LocationsEntry
                        to="/media"
                        name="Arad"
                        county="Arad"
                        image="https://images.unsplash.com/photo-1632207857925-a4d52c54d683?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                    <LocationsEntry
                        to="/media"
                        name="Oradea"
                        county="Bihor"
                        image="https://images.unsplash.com/photo-1654172054677-9a8cd7a8c04a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                    <LocationsEntry
                        to="/media"
                        name="Drobeta-Turnu Severin"
                        county="Mehedinți"
                        image="https://images.unsplash.com/photo-1592335234454-1454bd449a2c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                    <LocationsEntry
                        to="/media"
                        name="Cluj-Napoca"
                        county="Cluj"
                        image="https://images.unsplash.com/photo-1678736680989-195226823176?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                    <LocationsEntry
                        to="/media"
                        name="București"
                        county="București"
                        image="https://images.unsplash.com/photo-1695314620864-b551fd6574ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                    <LocationsEntry
                        to="/media"
                        name="În altă parte?"
                        description="Mergem în toată țara pentru filmarea potrivită"
                        accent="Spune-ne unde"
                        className="hover:bg-[color-mix(in_oklab,var(--color2)_20%,var(--muted))]"
                    />
                </div>
            </div>
        </section>
    );
}
