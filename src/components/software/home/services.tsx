// Services — 8 cards, each with a unique inline mini-viz.

import type { ReactNode } from "react";
import { Icon } from "./icons";
import { SectionRule } from "./section-rule";

export function Services() {
    const items: { n: string; icon: ReactNode; title: string; desc: string; meta: string; viz: ReactNode }[] = [
        {
            n: "01", icon: <Icon.Code />, title: "Custom web apps",
            desc: "TypeScript, React, Next.js. Type-safe from the database to the design system.",
            meta: "12 shipped",
            viz: <VizCode />,
        },
        {
            n: "02", icon: <Icon.Phone />, title: "Mobile apps",
            desc: "Native (Swift, Kotlin) or universal (React Native, Expo) — your call.",
            meta: "iOS + Android",
            viz: <VizPhone />,
        },
        {
            n: "03", icon: <Icon.Chart />, title: "Dashboards & dataviz",
            desc: "D3, Plot, custom WebGL. We turn warehouse rows into something you can act on.",
            meta: "real-time ready",
            viz: <VizChart />,
        },
        {
            n: "04", icon: <Icon.Grid />, title: "Design systems",
            desc: "Tokens, components, docs. Tailwind + shadcn or fully custom — handed off to your team.",
            meta: "Figma + code",
            viz: <VizSystem />,
        },
        {
            n: "05", icon: <Icon.Spark />, title: "AI integrations",
            desc: "RAG, agents, evals. Claude, GPT, in-house — we ship the boring scaffolding around them.",
            meta: "eval-driven",
            viz: <VizAI />,
        },
        {
            n: "06", icon: <Icon.Bolt />, title: "Internal tools",
            desc: "Admin panels, ops dashboards, workflow apps. Built fast, maintained for years.",
            meta: "low-overhead",
            viz: <VizPanel />,
        },
        {
            n: "07", icon: <Icon.Cart />, title: "E-commerce",
            desc: "Shopify Hydrogen, custom storefronts, headless. Conversion is a number — we move it.",
            meta: "+34% CR avg",
            viz: <VizCart />,
        },
        {
            n: "08", icon: <Icon.Layers />, title: "Platform engineering",
            desc: "Migrations, infra, CI/CD. We get your team off the things slowing them down.",
            meta: "no rewrites",
            viz: <VizStack />,
        },
    ];
    return (
        <section className="section" id="services">
            <div className="wrap">
                <SectionRule num="02" tag="Services" />
                <h2 className="section-title">What we build, end to end.</h2>
                <p className="section-sub">
                    Senior generalists on every project. No staff augmentation, no junior layers.
                    We pick the simplest stack that does the job for ten years.
                </p>
                <div className="services">
                    {items.map((it) => (
                        <article className="svc" key={it.n}>
                            <span className="svc__num">{it.n}</span>
                            <div className="svc__icon">{it.icon}</div>
                            <h3 className="svc__title">{it.title}</h3>
                            <p className="svc__desc">{it.desc}</p>
                            <div className="svc__viz">{it.viz}</div>
                            <div className="svc__mini">
                                <span>→ <b>{it.meta}</b></span>
                                <span>{it.n}/08</span>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ---------- viz mini-mockups (CSS/SMIL animated) ---------- */
function VizCode() {
    return (
        <svg viewBox="0 0 200 56" width="100%" height="100%" preserveAspectRatio="none">
            <g fontFamily="JetBrains Mono, monospace" fontSize="6.5" fill="var(--fg-soft)">
                <text x="10" y="14"><tspan fill="var(--color5)">01</tspan> <tspan fill="var(--color1)">const</tspan> ship = () =&gt; &#123;</text>
                <text x="10" y="26"><tspan fill="var(--color5)">02</tspan>   <tspan fill="var(--color2)">return</tspan> &quot;main&quot;</text>
                <text x="10" y="38"><tspan fill="var(--color5)">03</tspan> &#125;</text>
                <text x="10" y="50"><tspan fill="var(--color5)">04</tspan> <tspan fill="var(--color2)">// ✓</tspan> tests pass</text>
            </g>
            <rect x="10" y="8" width="0.7" height="44" fill="var(--color1)">
                <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" />
            </rect>
        </svg>
    );
}

function VizPhone() {
    return (
        <svg viewBox="0 0 200 56" width="100%" height="100%">
            <rect x="86" y="6" width="28" height="44" rx="4" fill="none" stroke="var(--line-strong)" strokeWidth="1" />
            <rect x="89" y="10" width="22" height="32" rx="1" fill="var(--bg-soft)" />
            <rect x="92" y="13" width="10" height="2" fill="var(--color1)" />
            <rect x="92" y="17" width="16" height="1.5" fill="var(--line-strong)" />
            <rect x="92" y="20" width="13" height="1.5" fill="var(--line-strong)" />
            <rect x="92" y="26" width="16" height="6" rx="1" fill="var(--color2)" />
            <rect x="92" y="35" width="8" height="1.5" fill="var(--line-strong)" />
            <circle cx="100" cy="46" r="1.2" fill="var(--line-strong)" />
            <rect x="124" y="6" width="28" height="44" rx="4" fill="none" stroke="var(--line)" strokeWidth="1" />
            <rect x="127" y="10" width="22" height="32" rx="1" fill="var(--bg-soft)" />
            <rect x="130" y="13" width="6" height="6" rx="1" fill="var(--color3)" />
            <rect x="138" y="13" width="6" height="6" rx="1" fill="var(--color1)" />
            <rect x="130" y="21" width="6" height="6" rx="1" fill="var(--color2)" />
            <rect x="138" y="21" width="6" height="6" rx="1" fill="var(--color4)" />
            <rect x="48" y="6" width="28" height="44" rx="4" fill="none" stroke="var(--line)" strokeWidth="1" />
            <rect x="51" y="10" width="22" height="32" rx="1" fill="var(--bg-soft)" />
            <polyline points="53,32 57,28 62,30 67,22 71,26" stroke="var(--color1)" strokeWidth="1" fill="none" />
        </svg>
    );
}

function VizChart() {
    return (
        <svg viewBox="0 0 200 56" width="100%" height="100%" preserveAspectRatio="none">
            <defs>
                <linearGradient id="vc1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--color1)" stopOpacity=".5" />
                    <stop offset="100%" stopColor="var(--color1)" stopOpacity="0" />
                </linearGradient>
            </defs>
            <path d="M0,46 L20,42 L40,38 L60,32 L80,30 L100,22 L120,28 L140,16 L160,20 L180,12 L200,18 L200,56 L0,56 Z" fill="url(#vc1)" />
            <path d="M0,46 L20,42 L40,38 L60,32 L80,30 L100,22 L120,28 L140,16 L160,20 L180,12 L200,18" stroke="var(--color1)" strokeWidth="1.4" fill="none" />
            <g>
                {[20, 40, 60, 80, 100, 120, 140, 160, 180].map((x, i) => (
                    <circle key={i} cx={x} cy={[42, 38, 32, 30, 22, 28, 16, 20, 12][i]} r="1.5" fill="var(--bg)" stroke="var(--color1)" />
                ))}
            </g>
            <line x1="160" y1="0" x2="160" y2="56" stroke="var(--color2)" strokeWidth="0.5" strokeDasharray="2,2">
                <animate attributeName="x1" values="20;180;20" dur="6s" repeatCount="indefinite" />
                <animate attributeName="x2" values="20;180;20" dur="6s" repeatCount="indefinite" />
            </line>
        </svg>
    );
}

function VizSystem() {
    return (
        <svg viewBox="0 0 200 56" width="100%" height="100%">
            {[0, 1, 2, 3, 4, 5].map((i) => (
                <rect key={i} x={12 + i * 30} y="12" width="22" height="22" rx="3"
                    fill={["var(--color1)", "var(--color2)", "var(--color3)", "var(--color4)", "var(--fg-soft)", "var(--line-strong)"][i]} />
            ))}
            {[0, 1, 2, 3, 4, 5].map((i) => (
                <rect key={i} x={12 + i * 30} y="38" width="22" height="6" rx="1" fill="var(--line)" />
            ))}
        </svg>
    );
}

function VizAI() {
    return (
        <svg viewBox="0 0 200 56" width="100%" height="100%">
            <circle cx="100" cy="28" r="10" fill="none" stroke="var(--color1)" strokeWidth="1" />
            <circle cx="100" cy="28" r="6" fill="var(--color1)" opacity=".4">
                <animate attributeName="r" values="6;9;6" dur="2.4s" repeatCount="indefinite" />
            </circle>
            {[0, 60, 120, 180, 240, 300].map((a, i) => (
                <g key={i} transform={`rotate(${a} 100 28)`}>
                    <line x1="100" y1="14" x2="100" y2="6" stroke="var(--line-strong)" strokeWidth="0.6" />
                    <circle cx="100" cy="4" r="2.2" fill="var(--bg)" stroke={i % 2 ? "var(--color2)" : "var(--color5)"} />
                </g>
            ))}
            <text x="100" y="30.5" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6" fill="white">RAG</text>
        </svg>
    );
}

function VizPanel() {
    return (
        <svg viewBox="0 0 200 56" width="100%" height="100%">
            <rect x="6" y="6" width="40" height="44" fill="var(--bg-soft)" stroke="var(--line)" />
            <rect x="50" y="6" width="144" height="10" fill="var(--bg-soft)" stroke="var(--line)" />
            <rect x="50" y="20" width="144" height="30" fill="none" stroke="var(--line)" />
            {[0, 1, 2, 3, 4, 5].map((i) => (
                <rect key={i} x="9" y={9 + i * 7} width={[24, 20, 28, 18, 22, 16][i]} height="3" fill={i === 1 ? "var(--color1)" : "var(--line-strong)"} />
            ))}
            {[0, 1, 2].map((i) => (
                <g key={i}>
                    <rect x={54 + i * 48} y="24" width="40" height="20" fill="none" stroke="var(--line)" />
                    <rect x={56 + i * 48} y="26" width="14" height="2" fill="var(--fg-soft)" />
                    <text x={56 + i * 48} y="40" fontFamily="JetBrains Mono" fontSize="7" fill="var(--color1)" fontWeight="600">{[1.2, 8.4, 42][i]}<tspan fontSize="4.5" fill="var(--fg-faint)">k</tspan></text>
                </g>
            ))}
        </svg>
    );
}

function VizCart() {
    return (
        <svg viewBox="0 0 200 56" width="100%" height="100%">
            {[0, 1, 2, 3].map((i) => (
                <g key={i}>
                    <rect x={10 + i * 48} y="6" width="40" height="32" rx="2" fill="var(--bg-soft)" stroke="var(--line)" />
                    <rect x={14 + i * 48} y="10" width="32" height="18" fill={["var(--color1)", "var(--color2)", "var(--color3)", "var(--color4)"][i]} opacity=".25" />
                    <rect x={14 + i * 48} y="32" width="20" height="2" fill="var(--fg-soft)" />
                    <rect x={10 + i * 48} y="42" width="40" height="8" rx="1" fill="none" stroke="var(--line)" />
                    <text x={30 + i * 48} y="48" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6" fill="var(--fg-soft)">+ Add</text>
                </g>
            ))}
        </svg>
    );
}

function VizStack() {
    return (
        <svg viewBox="0 0 200 56" width="100%" height="100%">
            {[0, 1, 2, 3].map((i) => (
                <g key={i} transform={`translate(${30 + i * 5} ${10 + i * 8})`}>
                    <rect width="120" height="10" rx="2" fill={["var(--color1)", "var(--color2)", "var(--color3)", "var(--color5)"][i]} opacity={1 - i * 0.18} />
                    <text x="6" y="7" fontFamily="JetBrains Mono" fontSize="6" fill="white" opacity=".9">
                        {["app/", "api/", "infra/", "data/"][i]}
                    </text>
                </g>
            ))}
        </svg>
    );
}
