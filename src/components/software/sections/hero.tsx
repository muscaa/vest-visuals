"use client";

import { ButtonLink } from "@/components/snippets";
import { TextH1, TextP, TextSpan } from "@/components/typography";
import { cn } from "@shared/shadcn/lib/utils";
import { useTranslations } from "next-intl";
import { useRef } from "react";

interface Props {

}

export function SoftwareHeroSection(props: Props) {
    const t = useTranslations("Software.Page.home.hero");

    return (
        <header id="hero" className="relative flex flex-col justify-center items-center px-6 pt-24 pb-18 border-b">
            <div className="grid-background" />
            <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-16 items-center max-w-7xl w-full">
                <div className="flex flex-col">
                    <TextH1 size="display" className="mt-14">
                        {t("title")}
                    </TextH1>
                    <TextP variant="muted" size="lead" className="max-w-[50ch] my-10">
                        {t("description")}
                    </TextP>
                    <div className="flex gap-4">
                        <ButtonLink to="/contact" variant="default">
                            {t("button-1")}
                        </ButtonLink>
                        <ButtonLink href="#services" variant="outline">
                            {t("button-2")}
                        </ButtonLink>
                    </div>
                    {/* <div className="flex gap-12 mt-16">
                        <TextSpan variant="muted" size="label" font="mono2"><b>11</b> shipped products</TextSpan>
                        <TextSpan variant="muted" size="label" font="mono2"><b>4x</b> on-time delivery</TextSpan>
                        <TextSpan variant="muted" size="label" font="mono2"><b>NPS 72</b> last 12mo</TextSpan>
                    </div> */}
                </div>
                <div className="relative group/mockups bg-muted border rounded-2xl overflow-hidden w-full aspect-5/4">
                    <HeroMockSvg />
                </div>
            </div>
        </header>
    );
}

function HeroMockSvg() {
    const svgRef = useRef<SVGSVGElement>(null);

    const mono = "JetBrains Mono, ui-monospace, monospace";

    const handleMove = (e: React.MouseEvent) => {
        const el = svgRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * 2;  // -1 .. 1
        const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
        el.style.setProperty("--hm-mx", (x * 5).toFixed(2)); // max ±5 "px" at depth 1
        el.style.setProperty("--hm-my", (y * 5).toFixed(2));
    };

    const handleLeave = () => {
        const el = svgRef.current;
        if (!el) return;
        el.style.setProperty("--hm-mx", "0");
        el.style.setProperty("--hm-my", "0");
    };

    const bars = [62, 78, 45, 90, 70, 58, 84, 52, 76, 88, 64, 72]; // % of chart height
    const kpis = [
        { label: "Profit", text: "$48.2k", accent: "+12%", accentFill: "var(--success)" },
        { label: "Sessions", text: "12,408", accent: "+4.1%", accentFill: "var(--primary)", hot: true },
        { label: "Avg Ping", text: "184ms", accent: "-22%", accentFill: "var(--success)" },
        { label: "Errors", text: "0.04%", accent: "flat", accentFill: "var(--muted-foreground)" },
    ];
    const tasks = [
        { title: "Sprint 14 demo", description: "Fri · 4pm" },
        { title: "Design review", description: "Tue · 2pm" },
        { title: "Eval harness", description: "Wed · 10am" },
        { title: "Migration plan", description: "Thu · 11am" },
    ];
    // delay: irregular on purpose — mimics real build timing
    const termLines = [
        { text: "$ npm run build", fill: "var(--foreground)", delay: 0.15 },
        { text: "→ Creating an optimized production build...", fill: "var(--primary)", delay: 0.65 },
        { text: "✓ Compiled successfully in 10.3s", fill: "var(--success)", delay: 1.45 },
        { text: "✓ Finished TypeScript in 14.9s", fill: "var(--success)", delay: 2.05 },
        { text: "→ Generating sitemaps...", fill: "var(--primary)", delay: 2.5 },
        { text: "✓ Done!", fill: "var(--success)", delay: 3.15 },
        { text: "$", fill: "var(--foreground)", delay: 3.45 },
    ];
    const caretDelay = 3.55;

    return (
        <svg ref={svgRef} viewBox="0 0 700 560" width="100%" height="100%" role="img"
            aria-label="Dashboard, terminal and mobile app mockup"
            onMouseMove={handleMove} onMouseLeave={handleLeave}>
            <style>{`
                .hmw { filter: drop-shadow(0 6px 14px rgb(0 0 0 / .18)); transition: filter .35s ease; }
                svg:hover .hmw { filter: drop-shadow(0 14px 28px rgb(0 0 0 / .3)); }
                .hmPar {
                    transform: translate(
                        calc(var(--hm-mx, 0) * var(--hm-f, 1) * 1px),
                        calc(var(--hm-my, 0) * var(--hm-f, 1) * 1px)
                    );
                    transition: transform .25s ease-out;
                    will-change: transform;
                }
                .hmFloatA { animation: hmFloat 6.5s ease-in-out infinite; }
                .hmFloatB { animation: hmFloat 7.6s ease-in-out -2.2s infinite; }
                .hmFloatC { animation: hmFloat 5.4s ease-in-out -3.6s infinite; }
                @keyframes hmFloat { 50% { transform: translateY(-7px); } }
                .hmLine { animation: hmReveal .3s ease-out backwards; }
                @keyframes hmReveal { from { opacity: 0; transform: translateY(4px); } }
                .hmCaret { animation: hmBlink 1.1s steps(1) infinite backwards; }
                @keyframes hmBlink { 0%, 100% { opacity: 0; } 50% { opacity: 1; } }
                .hmBar { animation: hmGrow .8s cubic-bezier(.2,.7,.3,1) backwards;
                         transform-box: fill-box; transform-origin: bottom; }
                @keyframes hmGrow { from { transform: scaleY(0); } }
                .hm-dark {
                    --background: #1b1b1f;
                    --secondary: #2a2a31;
                    --border: #3a3a42;
                    --foreground: #e7e7ea;
                    --muted-foreground: #9b9ba3;
                }
                @media (prefers-reduced-motion: reduce) {
                    .hmFloatA, .hmFloatB, .hmFloatC, .hmCaret, .hmLine, .hmBar { animation: none; }
                    .hmPar { transform: none; transition: none; }
                }
            `}</style>

            <defs>
                <linearGradient id="hmBrand" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="var(--primary)" />
                    <stop offset="100%" stopColor="var(--success)" />
                </linearGradient>
                <linearGradient id="hmBrandBr" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="30%" stopColor="var(--primary)" />
                    <stop offset="100%" stopColor="var(--success)" />
                </linearGradient>
                <clipPath id="hmBrowserClip"><rect x="63" y="56" width="525" height="392" rx="10" /></clipPath>
                <clipPath id="hmPhoneClip"><rect x="538" y="202" width="135" height="282" rx="16" /></clipPath>
            </defs>

            {/* ═══ Browser — z1, floatA, parallax depth 1 ═══ */}
            <g className="hmw hmPar" style={{ "--hm-f": 1 } as any}>
                <g className="hmFloatA">
                    <g clipPath="url(#hmBrowserClip)">
                        <rect x="63" y="56" width="525" height="392" fill="var(--background)" />
                        {/* chrome */}
                        <rect x="63" y="56" width="525" height="30" fill="var(--muted)" />
                        <circle cx="78" cy="71" r="4" fill="var(--border)" />
                        <circle cx="92" cy="71" r="4" fill="var(--border)" />
                        <circle cx="106" cy="71" r="4" fill="var(--border)" />
                        <rect x="120" y="63" width="456" height="17" rx="4"
                            fill="var(--background)" stroke="var(--border)" />
                        <text x="128" y="75" fontFamily={mono} fontSize="9.5"
                            fill="var(--muted-foreground)">www.vestvisuals.ro/dashboard</text>
                        <line x1="63" y1="86" x2="588" y2="86" stroke="var(--border)" />
                        {/* sidebar */}
                        <rect x="63" y="86" width="72" height="362" fill="var(--muted)" />
                        <line x1="135" y1="86" x2="135" y2="448" stroke="var(--border)" />
                        <rect x="72" y="95" width="48" height="16" rx="3" fill="url(#hmBrand)" />
                        {[0, 1, 2, 3, 4].map((i) => (
                            <rect key={i} x="72" y={120 + i * 12} width="48" height="7" rx="2"
                                fill={i === 1 ? "var(--primary)" : "var(--secondary)"}
                                opacity={i === 1 ? 0.5 : 1} />
                        ))}
                        {/* KPI cards */}
                        {kpis.map((k, i) => (
                            <g key={k.label} transform={`translate(${147 + i * 109} 98)`}>
                                <rect width="102" height="58" rx="4"
                                    fill={k.hot ? "var(--primary)" : "var(--muted)"}
                                    fillOpacity={k.hot ? 0.1 : 1}
                                    stroke={k.hot ? "var(--primary)" : "var(--border)"}
                                    strokeOpacity={k.hot ? 0.5 : 1} />
                                <text x="10" y="16" fontFamily={mono} fontSize="8"
                                    fill="var(--muted-foreground)">{k.label}</text>
                                <text x="10" y="33" fontFamily={mono} fontSize="12.5" fontWeight="600"
                                    fill="var(--foreground)">{k.text}</text>
                                <text x="10" y="48" fontFamily={mono} fontSize="8"
                                    fill={k.accentFill}>{k.accent}</text>
                            </g>
                        ))}
                        {/* chart */}
                        <rect x="147" y="168" width="429" height="268" rx="4"
                            fill="var(--muted)" stroke="var(--border)" />
                        {bars.map((pct, i) => {
                            const h = (pct / 100) * 252;
                            return (
                                <rect key={i} className="hmBar"
                                    style={{ animationDelay: `${i * 0.05}s` }}
                                    x={155 + i * 35} y={428 - h} width="31" height={h} rx="2"
                                    fill={i === 7 ? "var(--success)" : "var(--primary)"}
                                    opacity={i === 7 ? 1 : 0.5} />
                            );
                        })}
                    </g>
                    <rect x="63" y="56" width="525" height="392" rx="10"
                        fill="none" stroke="var(--border)" />
                </g>
            </g>

            {/* ═══ Phone — z2, rotate 4°, floatB, parallax depth 2.2 ═══ */}
            <g className="hmw hmPar" style={{ "--hm-f": 2.2 } as any}>
                <g transform="rotate(4 605 343)">
                    <g className="hmFloatB">
                        <rect x="532" y="196" width="147" height="294" rx="22" fill="#000" />
                        <g clipPath="url(#hmPhoneClip)">
                            <rect x="538" y="202" width="135" height="282" fill="var(--background)" />
                            {/* status bar */}
                            <text x="548" y="223" fontFamily={mono} fontSize="9"
                                fill="var(--foreground)">09:41</text>
                            <text x="663" y="223" textAnchor="end" fontFamily={mono} fontSize="9"
                                fill="var(--foreground)">80%</text>
                            {/* gradient summary card (theme-dark → fixed light text) */}
                            <rect x="544" y="232" width="123" height="44" rx="6" fill="url(#hmBrandBr)" />
                            <text x="552" y="249" fontFamily={mono} fontSize="8" fill="#fff"
                                opacity=".92">This Week</text>
                            <text x="552" y="266" fontFamily={mono} fontSize="11.5" fontWeight="600"
                                fill="#fff">5 sales</text>
                            {/* tasks — dots alternate primary/success, last one highlighted */}
                            {tasks.map((t, i) => {
                                const last = i === tasks.length - 1;
                                return (
                                    <g key={t.title} transform={`translate(544 ${284 + i * 50})`}>
                                        <rect width="123" height="44" rx="6"
                                            fill={last ? "var(--primary)" : "var(--muted)"}
                                            fillOpacity={last ? 0.1 : 1}
                                            stroke={last ? "var(--primary)" : "var(--border)"}
                                            strokeOpacity={last ? 0.5 : 1} />
                                        <rect x="9" y="18" width="8" height="8" rx="2"
                                            fill={i % 2 === 0 ? "var(--primary)" : "var(--success)"} />
                                        <text x="24" y="20" fontFamily={mono} fontSize="8"
                                            fill="var(--foreground)">{t.title}</text>
                                        <text x="24" y="32" fontFamily={mono} fontSize="7.5"
                                            fill="var(--muted-foreground)">{t.description}</text>
                                    </g>
                                );
                            })}
                        </g>
                    </g>
                </g>
            </g>

            {/* ═══ Terminal — z3, rotate -3°, floatC, parallax depth 3, always dark ═══ */}
            <g className="hmw hmPar hm-dark" style={{ "--hm-f": 3 } as any}>
                <g transform="rotate(-3 154 425)">
                    <g className="hmFloatC">
                        <rect x="14" y="346" width="280" height="158" rx="8"
                            fill="var(--background)" stroke="var(--border)" />
                        <path d="M14 354 a8 8 0 0 1 8 -8 h264 a8 8 0 0 1 8 8 v18 h-280 Z"
                            fill="var(--secondary)" />
                        <circle cx="28" cy="359" r="4" fill="var(--destructive)" />
                        <circle cx="40" cy="359" r="4" fill="var(--warning)" />
                        <circle cx="52" cy="359" r="4" fill="var(--success)" />
                        <text x="64" y="362.5" fontFamily={mono} fontSize="9"
                            fill="var(--muted-foreground)">docker@root - zsh</text>
                        <g fontFamily={mono} fontSize="9.5">
                            {termLines.map((l, i) => (
                                <text key={i} className="hmLine"
                                    style={{ animationDelay: `${l.delay}s` }}
                                    x="26" y={390 + i * 16} fill={l.fill}>{l.text}</text>
                            ))}
                            <rect className="hmCaret"
                                style={{ animationDelay: `${caretDelay}s` }}
                                x="42" y={390 + 6 * 16 - 9} width="6" height="11"
                                fill="var(--foreground)" />
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
}
