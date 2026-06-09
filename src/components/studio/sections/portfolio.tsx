"use client";

import { Eyebrow } from "@/components/eyebrow";
import { Img } from "@/components/img";
import { TextH1, TextH2, TextP, TextSpan } from "@/components/typography";
import { cn } from "@shared/shadcn/lib/utils";

interface PortfolioProps {
    name: string;
    description: string;
    label: string;
    image: string;
    className?: string;
}

function Portfolio(props: PortfolioProps) {
    return (
        <div
            className={
                cn(
                    "relative flex flex-col justify-end gap-1 p-6 aspect-square theme-dark group/portfolio",
                    "rounded-2xl overflow-hidden transition-all bg-linear-to-b from-transparent to-black/50",
                    props.className
                )
            }
        >
            <Img
                src={props.image}
                alt=""
                className="absolute pointer-events-none -z-10 inset-0 size-full object-cover transition-all group-hover/portfolio:scale-105 group-hover/portfolio:brightness-75"
            />
            <TextH2 className="italic text-chart-1">
                {props.name}
            </TextH2>
            <TextP className="mb-4">
                {props.description}
            </TextP>
            <TextSpan variant="muted" size="label" font="mono1">
                {props.label}
            </TextSpan>
        </div>
    );
}

interface Props {

}

export function StudioPortfolioSection(props: Props) {
    return (
        <section id="portfolio" className="flex flex-col justify-center items-center px-6 py-16">
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow num="02">
                    Lucrări
                </Eyebrow>
                <div className="grid grid-cols-2 items-end gap-8 mb-16">
                    <TextH1 size="title">
                        Cinci categorii.
                        <br />
                        <i className="text-primary">O obsesie pentru lumină.</i>
                    </TextH1>
                    <TextP variant="muted" size="lead">
                        Selecții recente, alese pentru ritm și atmosferă, nu doar volum.
                    </TextP>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Portfolio
                        name="Majorate"
                        description="Aniversari care merita amintite"
                        label="24 sesiuni"
                        image="https://s3.vestvisuals.ro/portfolio/b4dwo04rs8ta7na0zzbflpuv/medium"
                        className="sm:aspect-auto sm:col-span-2"
                    />
                    <Portfolio
                        name="Sedinte Foto"
                        description="Portrete in lumina naturala"
                        label="38 sesiuni"
                        image="https://s3.vestvisuals.ro/portfolio/l1xhekvxbakado1gh18v7ged/medium"
                    />
                    <Portfolio
                        name="Automotive"
                        description="Masini, surprinse in miscare"
                        label="17 proiecte"
                        image="https://s3.vestvisuals.ro/portfolio/z34362mh88we0urk97td85ax/medium"
                    />
                    <Portfolio
                        name="Imobilirare"
                        description="Spatii care se vand singure"
                        label="52 proprietati"
                        image="https://s3.vestvisuals.ro/portfolio/f64uxutmybs9iuc08j1cp73y/medium"
                    />
                    <Portfolio
                        name="Promovare Firme"
                        description="Continut comercial cinematic"
                        label="29 campanii"
                        image="https://s3.vestvisuals.ro/portfolio/vznmbjtg6w9lltk0uyr5ex2e/medium"
                    />
                </div>
            </div>
        </section>
    );
}
