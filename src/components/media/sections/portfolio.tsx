"use client";

import { Eyebrow } from "@/components/eyebrow";
import { Img } from "@/components/img";
import { Link } from "@/components/link";
import { TextH1, TextH2, TextP, TextSpan } from "@/components/typography";
import { Pathname } from "@shared/i18n";
import { cn } from "@shared/shadcn/lib/utils";
import { useTranslations } from "next-intl";

interface PortfolioProps {
    name: React.ReactNode;
    to: Pathname;
    description: string;
    label: string;
    image: string;
    className?: string;
}

function Portfolio(props: PortfolioProps) {
    return (
        <Link
            to={props.to}
            className={
                cn(
                    "relative flex flex-col justify-end gap-1 p-6 aspect-square theme-dark group/portfolio",
                    "rounded-2xl overflow-hidden transition-all bg-linear-to-b from-50% from-transparent to-black/50",
                    props.className
                )
            }
        >
            <Img
                src={props.image}
                alt=""
                className="absolute pointer-events-none -z-10 inset-0 size-full object-cover transition-all group-hover/portfolio:scale-105 group-hover/portfolio:brightness-75"
            />
            <TextH2 variant="foreground">
                {props.name}
            </TextH2>
            <TextP className="mb-4">
                {props.description}
            </TextP>
            {/* <TextSpan variant="muted" size="label" font="mono1">
                {props.label}
            </TextSpan> */}
        </Link>
    );
}

interface Props {

}

export function MediaPortfolioSection(props: Props) {
    const t = useTranslations("Media.Page.home.portfolio");

    return (
        <section id="portfolio" className="flex flex-col justify-center items-center px-6 py-16">
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow num="02">
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
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Portfolio
                        name={
                            t.rich("18th-birthday.name", {
                                accent: (chunks) => (
                                    <i className="text-chart-1">{chunks}</i>
                                )
                            })
                        }
                        to="/portfolio/18th-birthday"
                        description={t("18th-birthday.description")}
                        label="24 sesiuni"
                        image="https://s3.vestvisuals.ro/portfolio/b4dwo04rs8ta7na0zzbflpuv/medium"
                        className="sm:aspect-auto sm:col-span-2"
                    />
                    <Portfolio
                        name={
                            t.rich("outdoor.name", {
                                accent: (chunks) => (
                                    <i className="text-success">{chunks}</i>
                                )
                            })
                        }
                        to="/portfolio/outdoor"
                        description={t("outdoor.description")}
                        label="38 sesiuni"
                        image="https://s3.vestvisuals.ro/portfolio/l1xhekvxbakado1gh18v7ged/medium"
                    />
                    <Portfolio
                        name={
                            t.rich("automotive.name", {
                                accent: (chunks) => (
                                    <i className="text-chart-1">{chunks}</i>
                                )
                            })
                        }
                        to="/portfolio/automotive"
                        description={t("automotive.description")}
                        label="17 proiecte"
                        image="https://s3.vestvisuals.ro/portfolio/z34362mh88we0urk97td85ax/medium"
                    />
                    <Portfolio
                        name={
                            t.rich("real-estate.name", {
                                accent: (chunks) => (
                                    <i className="text-success">{chunks}</i>
                                )
                            })
                        }
                        to="/portfolio/real-estate"
                        description={t("real-estate.description")}
                        label="52 proprietati"
                        image="https://s3.vestvisuals.ro/portfolio/f64uxutmybs9iuc08j1cp73y/medium"
                    />
                    <Portfolio
                        name={
                            t.rich("marketing.name", {
                                accent: (chunks) => (
                                    <i className="text-chart-1">{chunks}</i>
                                )
                            })
                        }
                        to="/portfolio/marketing"
                        description={t("marketing.description")}
                        label="29 campanii"
                        image="https://s3.vestvisuals.ro/portfolio/vznmbjtg6w9lltk0uyr5ex2e/medium"
                    />
                </div>
            </div>
        </section>
    );
}
