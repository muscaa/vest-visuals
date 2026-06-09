"use client";

import { Eyebrow } from "@/components/eyebrow";
import { Img } from "@/components/img";
import { TextH1, TextH2, TextP } from "@/components/typography";
import { cn } from "@shared/shadcn/lib/utils";

interface LocationProps {
    name: string;
    county?: string;
    image?: string;
    description?: string;
    accent?: string;
    className?: string;
}

function Location(props: LocationProps) {
    return (
        <div className={cn("relative flex flex-col gap-2 px-4 py-6 transition-all bg-background hover:bg-muted", props.className)}>
            {
                props.image && (
                    <Img
                        src={props.image}
                        alt=""
                        className="absolute pointer-events-none inset-0 size-full object-cover brightness-75 mask-l-from-0% mask-l-to-100%"
                    />
                )
            }
            <TextH2 className={`z-10 ${props.accent ? "text-success" : ""}`}>
                {props.name}
            </TextH2>
            {
                props.county && (
                    <TextP variant="muted" size="label" font="mono1" className="z-10">
                        {props.county}
                    </TextP>
                )
            }
            {
                props.description && (
                    <TextP size="label" className="z-10">
                        {props.description}
                    </TextP>
                )
            }
            {
                props.accent && (
                    <TextP size="body" className="z-10 text-success">
                        {props.accent}
                    </TextP>
                )
            }
        </div>
    );
}

interface Props {

}

export function StudioLocationsSection(props: Props) {
    return (
        <section id="locations" className="flex flex-col justify-center items-center px-6 py-16 bg-linear-to-b from-transparent to-success/20">
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow num="05">
                    Locații
                </Eyebrow>
                <div className="grid grid-cols-2 items-end gap-8 mb-16">
                    <TextH1 size="title">
                        Lucrăm din Timișoara.
                        <br />
                        <i className="text-primary">Venim oriunde.</i>
                    </TextH1>
                    <TextP variant="muted" size="lead">
                        Studio principal în Timișoara — dar lucrăm cu plăcere oriunde povestea ne cheamă.
                    </TextP>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border bg-clip-padding border-b border-t">
                    <Location
                        name="Timișoara"
                        county="Timiș"
                        image="https://images.unsplash.com/photo-1687696162729-a75f9ddc004d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="bg-muted sm:col-span-2 lg:col-span-3"
                    />
                    <Location
                        name="Arad"
                        county="Arad"
                        image="https://images.unsplash.com/photo-1632207857925-a4d52c54d683?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                    <Location
                        name="Oradea"
                        county="Bihor"
                        image="https://images.unsplash.com/photo-1654172054677-9a8cd7a8c04a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                    <Location
                        name="Drobeta-Turnu Severin"
                        county="Mehedinți"
                        image="https://images.unsplash.com/photo-1592335234454-1454bd449a2c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                    <Location
                        name="Cluj-Napoca"
                        county="Cluj"
                        image="https://images.unsplash.com/photo-1678736680989-195226823176?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                    <Location
                        name="București"
                        county="București"
                        image="https://images.unsplash.com/photo-1695314620864-b551fd6574ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                    <Location
                        name="Orașul tău?"
                        description="Filmăm și fotografiem în toată țara."
                        accent="Spune-ne unde"
                        className="hover:bg-[color-mix(in_oklab,_var(--color2)_20%,_var(--muted))]"
                    />
                </div>
            </div>
        </section>
    );
}
