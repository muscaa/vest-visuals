"use client";

import { Eyebrow } from "@/components/eyebrow";
import { Img } from "@/components/img";
import { Link } from "@/components/link";
import { TextH1, TextH2, TextP } from "@/components/typography";
import { Pathname } from "@shared/i18n";
import { cn } from "@shared/shadcn/lib/utils";
import { useTranslations } from "next-intl";

interface LocationProps {
    name: string;
    to: Pathname;
    county?: string;
    image?: string;
    description?: string;
    accent?: string;
    className?: string;
}

function Location(props: LocationProps) {
    return (
        <Link
            to={props.to}
            className={cn("relative flex flex-col gap-2 px-4 py-6 transition-all bg-background hover:bg-muted", props.className)}
        >
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
        </Link>
    );
}

interface Props {

}

export function MediaLocationsSection(props: Props) {
    const t = useTranslations("Media.Page.home.locations");

    return (
        <section id="locations" className="flex flex-col justify-center items-center px-6 py-16 bg-linear-to-b from-transparent to-success/20">
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow num="05">
                    {t("eyebrow")}
                </Eyebrow>
                <div className="grid grid-cols-2 items-end gap-8 mb-16">
                    <TextH1 size="title">
                        {
                            t.rich("title", {
                                accent: (chunks) => (
                                    <i className="text-success">{chunks}</i>
                                )
                            })
                        }
                    </TextH1>
                    <TextP variant="muted" size="lead">
                        {t("description")}
                    </TextP>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border bg-clip-padding border-b border-t">
                    <Location
                        name="Timișoara"
                        to="/locations/timisoara"
                        county="Timiș"
                        image="https://images.unsplash.com/photo-1687696162729-a75f9ddc004d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="bg-muted sm:col-span-2 lg:col-span-3"
                    />
                    <Location
                        name="Arad"
                        to="/locations/arad"
                        county="Arad"
                        image="https://images.unsplash.com/photo-1632207857925-a4d52c54d683?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                    <Location
                        name="Oradea"
                        to="/locations/oradea"
                        county="Bihor"
                        image="https://images.unsplash.com/photo-1654172054677-9a8cd7a8c04a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                    <Location
                        name="Drobeta-Turnu Severin"
                        to="/locations/drobeta-turnu-severin"
                        county="Mehedinți"
                        image="https://images.unsplash.com/photo-1592335234454-1454bd449a2c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                    <Location
                        name="Cluj-Napoca"
                        to="/locations/cluj-napoca"
                        county="Cluj"
                        image="https://images.unsplash.com/photo-1678736680989-195226823176?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                    <Location
                        name="București"
                        to="/locations/bucuresti"
                        county="București"
                        image="https://images.unsplash.com/photo-1695314620864-b551fd6574ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                    <Location
                        name={t("other.name")}
                        to="/contact"
                        description={t("other.description")}
                        accent={t("other.link")}
                        className="hover:bg-[color-mix(in_oklab,_var(--color2)_20%,_var(--muted))]"
                    />
                </div>
            </div>
        </section>
    );
}
