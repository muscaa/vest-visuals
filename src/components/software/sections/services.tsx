"use client";

import {
    TextH1,
    TextH2,
    TextP,
    TextSpan,
} from "@/components/typography";
import {
    ChartNoAxesCombined,
    CloudCog,
    Code,
    HardDrive,
    MessageSquareText,
    MonitorCheck,
    Smartphone,
    Workflow,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Eyebrow } from "@/components/eyebrow";

interface ServiceProps {
    num: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    viz: React.ReactNode;
}

function Service(props: ServiceProps) {
    return (
        <article className="relative group/service flex flex-col gap-3 p-8 transition-all bg-background hover:bg-muted">
            <TextSpan variant="muted" size="label" font="mono2" className="absolute top-4 right-4">
                {props.num}
            </TextSpan>
            <div className="grid place-items-center size-10 mb-2 border rounded-md transition-all bg-muted text-informative group-hover/service:text-success group-hover/service:border-success group-hover/service:-rotate-4">
                {props.icon}
            </div>
            <TextH2>
                {props.title}
            </TextH2>
            <TextP variant="muted" size="sm" className="grow">
                {props.description}
            </TextP>
            <div className="relative h-16 mt-2 rounded-md transition-all bg-muted group-hover/service:bg-background border overflow-hidden">
                {props.viz}
            </div>
        </article>
    );
}

interface Props {

}

export function SoftwareServicesSection(props: Props) {
    const t = useTranslations("Software.Page.home.services");

    return (
        <section id="services" className="flex flex-col justify-center items-center px-6 py-16 bg-linear-to-br from-transparent to-muted border-b">
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow num="02">
                    {t("eyebrow")}
                </Eyebrow>
                <TextH1 className="mb-4 max-w-[24ch]">
                    {t("title")}
                </TextH1>
                <TextP variant="muted" size="lead" className="max-w-[56ch] mb-14">
                    {t("description")}
                </TextP>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border overflow-hidden rounded-lg border">
                    <Service
                        num="01"
                        icon={<Code />}
                        title={t("s1-t")}
                        description={t("s1-d")}
                        viz={<VizWebDev />}
                    />
                    <Service
                        num="02"
                        icon={<Smartphone />}
                        title={t("s2-t")}
                        description={t("s2-d")}
                        viz={<VizMobileDev />}
                    />
                    <Service
                        num="03"
                        icon={<CloudCog />}
                        title={t("s3-t")}
                        description={t("s3-d")}
                        viz={<VizCloudDevOps />}
                    />
                    <Service
                        num="04"
                        icon={<ChartNoAxesCombined />}
                        title={t("s4-t")}
                        description={t("s4-d")}
                        viz={<VizBI />}
                    />
                    <Service
                        num="05"
                        icon={<Workflow />}
                        title={t("s5-t")}
                        description={t("s5-d")}
                        viz={<VizAutomation />}
                    />
                    <Service
                        num="06"
                        icon={<HardDrive />}
                        title={t("s6-t")}
                        description={t("s6-d")}
                        viz={<VizDataEng />}
                    />
                    <Service
                        num="07"
                        icon={<MessageSquareText />}
                        title={t("s7-t")}
                        description={t("s7-d")}
                        viz={<VizConsulting />}
                    />
                    <Service
                        num="08"
                        icon={<MonitorCheck />}
                        title={t("s8-t")}
                        description={t("s8-d")}
                        viz={<VizSupport />}
                    />
                </div>
            </div>
        </section>
    );
}

/* 1. Web Development — browser window, layout skeleton, blinking cursor in the code pane */
function VizWebDev() {
    return (
        <svg viewBox="0 0 200 56" width="100%" height="100%">
            <rect x="30" y="6" width="140" height="44" rx="3" fill="var(--muted)" stroke="var(--border)" />
            <rect x="30" y="6" width="140" height="10" rx="3" fill="none" stroke="var(--border)" />
            <circle cx="37" cy="11" r="1.5" fill="var(--color3)" />
            <circle cx="42" cy="11" r="1.5" fill="var(--color2)" />
            <circle cx="47" cy="11" r="1.5" fill="var(--color1)" />
            <rect x="56" y="8.5" width="60" height="5" rx="2.5" fill="var(--background)" stroke="var(--border)" />
            {/* hero + content skeleton */}
            <rect x="36" y="21" width="56" height="7" rx="1" fill="var(--color1)" opacity=".8" />
            <rect x="36" y="31" width="44" height="2" fill="var(--muted-foreground)" />
            <rect x="36" y="36" width="36" height="2" fill="var(--muted-foreground)" />
            <rect x="36" y="42" width="20" height="5" rx="1" fill="var(--color2)" />
            {/* code pane */}
            <rect x="104" y="21" width="60" height="26" rx="2" fill="var(--background)" stroke="var(--border)" />
            <g fontFamily="JetBrains Mono, monospace" fontSize="5" fill="var(--muted-foreground)">
                <text x="108" y="28"><tspan fill="var(--color1)">&lt;App</tspan> /&gt;</text>
                <text x="108" y="35"><tspan fill="var(--color2)">render</tspan>()</text>
                <text x="108" y="42">deploy ✓</text>
            </g>
            <rect x="134" y="38" width="0.7" height="6" fill="var(--color1)">
                <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" />
            </rect>
        </svg>
    );
}

/* 2. Mobile Development — your VizPhone, kept as-is */
function VizMobileDev() {
    return (
        <svg viewBox="0 0 200 56" width="100%" height="100%">
            <rect x="86" y="6" width="28" height="44" rx="4" fill="none" stroke="var(--border)" strokeWidth="1" />
            <rect x="89" y="10" width="22" height="32" rx="1" fill="var(--muted)" />
            <rect x="92" y="13" width="10" height="2" fill="var(--color1)" />
            <rect x="92" y="17" width="16" height="1.5" fill="var(--muted-foreground)" />
            <rect x="92" y="20" width="13" height="1.5" fill="var(--muted-foreground)" />
            <rect x="92" y="26" width="16" height="6" rx="1" fill="var(--color2)" />
            <rect x="92" y="35" width="8" height="1.5" fill="var(--muted-foreground)" />
            <circle cx="100" cy="46" r="1.2" fill="var(--muted-foreground)" />
            <rect x="124" y="6" width="28" height="44" rx="4" fill="none" stroke="var(--border)" strokeWidth="1" />
            <rect x="127" y="10" width="22" height="32" rx="1" fill="var(--muted)" />
            <rect x="130" y="13" width="6" height="6" rx="1" fill="var(--color3)" />
            <rect x="138" y="13" width="6" height="6" rx="1" fill="var(--color1)" />
            <rect x="130" y="21" width="6" height="6" rx="1" fill="var(--color2)" />
            <rect x="138" y="21" width="6" height="6" rx="1" fill="var(--color4)" />
            <rect x="48" y="6" width="28" height="44" rx="4" fill="none" stroke="var(--border)" strokeWidth="1" />
            <rect x="51" y="10" width="22" height="32" rx="1" fill="var(--muted)" />
            <polyline points="53,32 57,28 62,30 67,22 71,26" stroke="var(--color1)" strokeWidth="1" fill="none" />
        </svg>
    );
}

/* 3. Cloud & DevOps — CI/CD pipeline into a cloud, dot travelling the pipe */
function VizCloudDevOps() {
    const stages = ["build", "test", "ship"];
    return (
        <svg viewBox="0 0 200 56" width="100%" height="100%">
            {stages.map((s, i) => (
                <g key={s}>
                    <rect x={12 + i * 42} y="20" width="30" height="16" rx="3"
                        fill="var(--muted)" stroke={["var(--color1)", "var(--color2)", "var(--color3)"][i]} />
                    <text x={27 + i * 42} y="30" textAnchor="middle"
                        fontFamily="JetBrains Mono, monospace" fontSize="6" fill="var(--foreground)">{s}</text>
                </g>
            ))}
            <line x1="42" y1="28" x2="54" y2="28" stroke="var(--border)" strokeWidth="1" />
            <line x1="84" y1="28" x2="96" y2="28" stroke="var(--border)" strokeWidth="1" />
            <line x1="126" y1="28" x2="142" y2="28" stroke="var(--border)" strokeWidth="1" strokeDasharray="2,2" />
            {/* cloud */}
            <path d="M158 36 a8 8 0 0 1 0-16 a10 10 0 0 1 19-2 a7 7 0 0 1 3 13 a6 6 0 0 1 -4 5 Z"
                fill="var(--muted)" stroke="var(--color1)" strokeWidth="1" />
            <text x="167" y="30" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="5.5" fill="var(--color1)">prod</text>
            {/* travelling deploy dot */}
            <circle r="2" fill="var(--color2)">
                <animate attributeName="cx" values="14;165" dur="3s" repeatCount="indefinite" />
                <animate attributeName="cy" values="28;28" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.1;.9;1" dur="3s" repeatCount="indefinite" />
            </circle>
        </svg>
    );
}

/* 4. Business Intelligence — your VizPanel dashboard (sidebar + KPI cards), unchanged */
function VizBI() {
    return (
        <svg viewBox="0 0 200 56" width="100%" height="100%">
            <rect x="6" y="6" width="40" height="44" fill="var(--muted)" stroke="var(--border)" />
            <rect x="50" y="6" width="144" height="10" fill="var(--muted)" stroke="var(--border)" />
            <rect x="50" y="20" width="144" height="30" fill="none" stroke="var(--border)" />
            {[0, 1, 2, 3, 4, 5].map((i) => (
                <rect key={i} x="9" y={9 + i * 7} width={[24, 20, 28, 18, 22, 16][i]} height="3"
                    fill={i === 1 ? "var(--color1)" : "var(--muted-foreground)"} />
            ))}
            {[0, 1, 2].map((i) => (
                <g key={i}>
                    <rect x={54 + i * 48} y="24" width="40" height="20" fill="none" stroke="var(--border)" />
                    <rect x={56 + i * 48} y="26" width="14" height="2" fill="var(--foreground)" />
                    <text x={56 + i * 48} y="40" fontFamily="JetBrains Mono" fontSize="7" fill="var(--color1)" fontWeight="600">
                        {[1.2, 8.4, 42][i]}<tspan fontSize="4.5" fill="var(--muted-foreground)">k</tspan>
                    </text>
                </g>
            ))}
        </svg>
    );
}

/* 5. Workflow Automation — trigger → branch → actions, pulse running through the graph */
function VizAutomation() {
    return (
        <svg viewBox="0 0 200 56" width="100%" height="100%">
            {/* edges */}
            <path d="M48 28 H78" stroke="var(--border)" strokeWidth="1" />
            <path d="M102 22 C118 14, 130 14, 146 16" stroke="var(--border)" strokeWidth="1" fill="none" />
            <path d="M102 34 C118 42, 130 42, 146 40" stroke="var(--border)" strokeWidth="1" fill="none" />
            {/* trigger */}
            <rect x="18" y="20" width="30" height="16" rx="8" fill="var(--color1)" opacity=".9" />
            <text x="33" y="30" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="5.5" fill="white">when</text>
            {/* condition diamond */}
            <rect x="80" y="18" width="20" height="20" rx="3" transform="rotate(45 90 28)"
                fill="var(--muted)" stroke="var(--color2)" />
            <text x="90" y="30" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="5.5" fill="var(--foreground)">if</text>
            {/* actions */}
            <rect x="146" y="8" width="36" height="14" rx="3" fill="var(--muted)" stroke="var(--color3)" />
            <text x="164" y="17" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="5.5" fill="var(--foreground)">notify</text>
            <rect x="146" y="34" width="36" height="14" rx="3" fill="var(--muted)" stroke="var(--color4)" />
            <text x="164" y="43" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="5.5" fill="var(--foreground)">update</text>
            {/* pulse along the top branch */}
            <circle r="1.8" fill="var(--color2)">
                <animateMotion dur="2.6s" repeatCount="indefinite"
                    path="M33 28 H90 C118 14, 130 14, 160 15" />
            </circle>
        </svg>
    );
}

/* 6. Data Engineering — ETL: source cylinders → transform → warehouse */
function VizDataEng() {
    return (
        <svg viewBox="0 0 200 56" width="100%" height="100%">
            {/* source databases */}
            {[0, 1, 2].map((i) => (
                <g key={i} transform={`translate(14 ${8 + i * 15})`}>
                    <ellipse cx="11" cy="3" rx="11" ry="3" fill={["var(--color1)", "var(--color2)", "var(--color3)"][i]} opacity=".7" />
                    <path d="M0 3 v6 a11 3 0 0 0 22 0 v-6" fill={["var(--color1)", "var(--color2)", "var(--color3)"][i]} opacity=".35" />
                    <line x1="36" y1="6" x2="76" y2={28 - (8 + i * 15)} stroke="var(--border)" strokeWidth=".8" />
                </g>
            ))}
            {/* transform box */}
            <rect x="90" y="18" width="34" height="20" rx="3" fill="var(--muted)" stroke="var(--border)" />
            <text x="107" y="27" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="5.5" fill="var(--color1)">ETL</text>
            <text x="107" y="34" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="4.5" fill="var(--muted-foreground)">clean·join</text>
            <line x1="124" y1="28" x2="148" y2="28" stroke="var(--border)" strokeWidth="1" strokeDasharray="3,2">
                <animate attributeName="stroke-dashoffset" values="10;0" dur="1.2s" repeatCount="indefinite" />
            </line>
            {/* warehouse */}
            <g transform="translate(150 14)">
                <ellipse cx="14" cy="4" rx="14" ry="4" fill="var(--foreground)" opacity=".8" />
                <path d="M0 4 v20 a14 4 0 0 0 28 0 v-20" fill="var(--foreground)" opacity=".25" />
                <line x1="0" y1="12" x2="0" y2="12" />
                <ellipse cx="14" cy="12" rx="14" ry="4" fill="none" stroke="var(--background)" strokeWidth=".6" opacity=".5" />
                <ellipse cx="14" cy="20" rx="14" ry="4" fill="none" stroke="var(--background)" strokeWidth=".6" opacity=".5" />
            </g>
        </svg>
    );
}

/* 7. Technical Consulting — whiteboard architecture sketch + advisory note */
function VizConsulting() {
    return (
        <svg viewBox="0 0 200 56" width="100%" height="100%">
            {/* whiteboard */}
            <rect x="22" y="6" width="100" height="44" rx="3" fill="var(--muted)" stroke="var(--border)" />
            <rect x="30" y="14" width="22" height="12" rx="2" fill="none" stroke="var(--color1)" />
            <rect x="66" y="14" width="22" height="12" rx="2" fill="none" stroke="var(--color2)" />
            <rect x="48" y="34" width="22" height="12" rx="2" fill="none" stroke="var(--color3)" />
            <line x1="52" y1="20" x2="66" y2="20" stroke="var(--muted-foreground)" strokeWidth=".8" />
            <line x1="41" y1="26" x2="56" y2="34" stroke="var(--muted-foreground)" strokeWidth=".8" />
            <line x1="77" y1="26" x2="62" y2="34" stroke="var(--muted-foreground)" strokeWidth=".8" />
            {/* crossed-out option — the decision */}
            <rect x="96" y="34" width="20" height="12" rx="2" fill="none" stroke="var(--muted-foreground)" strokeDasharray="2,2" />
            <line x1="96" y1="34" x2="116" y2="46" stroke="var(--color3)" strokeWidth="1" />
            {/* advice bubble */}
            <rect x="132" y="12" width="56" height="22" rx="4" fill="var(--background)" stroke="var(--color1)" />
            <path d="M140 34 l-4 7 l9 -7 Z" fill="var(--background)" stroke="var(--color1)" />
            <g fontFamily="JetBrains Mono, monospace" fontSize="5" fill="var(--foreground)">
                <text x="138" y="21">use queue,</text>
                <text x="138" y="29">not cron <tspan fill="var(--color2)">✓</tspan></text>
            </g>
        </svg>
    );
}

/* 8. Support & Maintenance — uptime monitor with live heartbeat */
function VizSupport() {
    return (
        <svg viewBox="0 0 200 56" width="100%" height="100%" preserveAspectRatio="none">
            <rect x="10" y="8" width="180" height="40" rx="3" fill="var(--muted)" stroke="var(--border)" />
            <g fontFamily="JetBrains Mono, monospace" fontSize="5.5">
                <text x="16" y="17" fill="var(--muted-foreground)">status</text>
                <text x="184" y="17" textAnchor="end" fill="var(--color2)">● 99.98% up</text>
            </g>
            {/* uptime ticks */}
            {[...Array(24)].map((_, i) => (
                <rect key={i} x={16 + i * 7} y="38" width="4.5" height="6" rx="1"
                    fill={i === 9 ? "var(--color3)" : "var(--color2)"} opacity={i === 9 ? 0.9 : 0.55} />
            ))}
            {/* heartbeat */}
            <polyline points="16,29 60,29 68,29 73,21 79,35 84,29 110,29 118,29 123,23 129,33 134,29 184,29"
                fill="none" stroke="var(--color1)" strokeWidth="1.2" />
            <circle r="2" fill="var(--color1)">
                <animateMotion dur="3s" repeatCount="indefinite"
                    path="M16 29 L60 29 L68 29 L73 21 L79 35 L84 29 L110 29 L118 29 L123 23 L129 33 L134 29 L184 29" />
            </circle>
        </svg>
    );
}
