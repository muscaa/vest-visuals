"use client";

// Featured projects — 3 case studies, each with a rich animated mockup.

import { useEffect, useState } from "react";
import { Icon } from "./icons";
import { SectionRule } from "./section-rule";

export function Projects() {
    const cases = [
        {
            client: "Atlas Logistics", year: "2026", role: "Web app + dashboard",
            title: "A control room for 4,200 daily shipments.",
            desc: "Atlas was running ops in spreadsheets. We rebuilt their command center in 14 weeks — live tracking, anomaly alerts, route optimization. The dispatch team grew capacity 2.1× without hiring.",
            tags: ["Next.js", "tRPC", "PostgreSQL", "Mapbox", "D3"],
            metrics: [
                { v: "2.1×", l: "ops throughput" },
                { v: "−38%", l: "time to dispatch" },
                { v: "99.98%", l: "uptime SLA" },
            ],
            viz: <MockAtlas />,
        },
        {
            client: "Foundry Coffee", year: "2025", role: "iOS + commerce",
            title: "A loyalty app 142 cafés actually wanted.",
            desc: "Headless Shopify backend, native SwiftUI client, and a rewards engine that finally made sense to baristas. 380k members in the first year.",
            tags: ["SwiftUI", "Shopify Hydrogen", "Stripe", "Sanity"],
            metrics: [
                { v: "380k", l: "active members" },
                { v: "+44%", l: "repeat purchase" },
                { v: "4.9★", l: "app store rating" },
            ],
            viz: <MockFoundry />,
        },
        {
            client: "Helix Bio", year: "2025", role: "AI tooling",
            title: "An R&D assistant for 80 research scientists.",
            desc: "Document retrieval over 12 years of internal papers, with evals that measure recall, latency, and hallucination together. Cited in 11 published studies.",
            tags: ["Anthropic", "LangGraph", "pgvector", "Python", "Modal"],
            metrics: [
                { v: "11", l: "papers cited" },
                { v: "0.94", l: "recall@10" },
                { v: "180ms", l: "p50 latency" },
            ],
            viz: <MockHelix />,
        },
    ];

    return (
        <section className="section" id="work">
            <div className="wrap">
                <SectionRule num="04" tag="Work" />
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
                    <h2 className="section-title">Three years, three problems<br />we kept thinking about.</h2>
                    <a href="#" className="btn btn--ghost btn--arrow">All case studies <Icon.Arrow /></a>
                </div>
                <div className="proj-grid" style={{ marginTop: 40 }}>
                    {cases.map((c, i) => (
                        <article className="proj" key={i}>
                            <div className="proj__visual">{c.viz}</div>
                            <div className="proj__body">
                                <span className="proj__client">{c.client} &middot; {c.year} &middot; {c.role}</span>
                                <h3 className="proj__title">{c.title}</h3>
                                <p className="proj__desc">{c.desc}</p>
                                <div className="proj__tags">
                                    {c.tags.map((t) => <span className="proj__tag" key={t}>{t}</span>)}
                                </div>
                                <div className="proj__metrics">
                                    {c.metrics.map((m, j) => (
                                        <div className="proj__metric" key={j}>
                                            <b>{m.v}</b><span>{m.l}</span>
                                        </div>
                                    ))}
                                </div>
                                <a href="#" className="btn btn--ghost btn--arrow" style={{ alignSelf: "flex-start", marginTop: 8 }}>
                                    Read case study <Icon.Arrow />
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ---------- mock 1: Atlas Logistics dashboard ---------- */
function MockAtlas() {
    const [tick, setTick] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setTick((t) => t + 1), 1200);
        return () => clearInterval(id);
    }, []);

    const dispatched = 3214 + (tick % 60);
    const inTransit = 942 - (tick % 12);
    const delivered = 1408 + (tick % 30);

    return (
        <div className="mock">
            <div className="mock__win">
                <div className="mock__bar">
                    <span className="dot" /><span className="dot" style={{ background: "color-mix(in oklab, var(--color3) 80%, transparent)" }} /><span className="dot" style={{ background: "color-mix(in oklab, var(--color2) 80%, transparent)" }} />
                    <span className="mock__url">atlas-ops.app/dispatch</span>
                </div>
                <div className="mock__body" style={{ gridTemplateColumns: "1fr", padding: 12, gap: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--fg-mute)" }}>
                            Live dispatch · <span style={{ color: "var(--color2)" }}>● connected</span>
                        </div>
                        <div style={{ display: "flex", gap: 6 }}>
                            {["1h", "24h", "7d", "30d"].map((p, i) => (
                                <span key={p} style={{
                                    fontFamily: "JetBrains Mono, monospace", fontSize: 10,
                                    padding: "2px 6px",
                                    border: "1px solid var(--line)",
                                    borderRadius: 4,
                                    background: i === 1 ? "var(--color1)" : "transparent",
                                    color: i === 1 ? "white" : "var(--fg-mute)",
                                }}>{p}</span>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                        <MetricCell label="dispatched" val={dispatched} delta="+4.2%" color="var(--color1)" />
                        <MetricCell label="in transit" val={inTransit} delta="−1.1%" color="var(--color3)" />
                        <MetricCell label="delivered" val={delivered} delta="+8.4%" color="var(--color2)" />
                    </div>

                    <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 8, minHeight: 120 }}>
                        <AtlasMap />
                        <div style={{
                            border: "1px solid var(--line)", borderRadius: 6, padding: 10,
                            display: "flex", flexDirection: "column", gap: 4,
                            background: "var(--bg-soft)",
                        }}>
                            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, color: "var(--fg-faint)", textTransform: "uppercase", letterSpacing: ".04em" }}>Anomalies (24h)</div>
                            {[
                                { t: "02:14", s: "route", m: "I-95 N delay 22m", c: "var(--color3)" },
                                { t: "02:08", s: "driver", m: "D-3401 break end", c: "var(--color5)" },
                                { t: "01:52", s: "temp", m: "TR-08 +2°C", c: "var(--color4)" },
                                { t: "01:30", s: "ok", m: "P-1102 on time", c: "var(--color2)" },
                                { t: "01:11", s: "route", m: "rerouted ×4", c: "var(--color1)" },
                            ].map((a, i) => (
                                <div key={i} style={{ display: "flex", gap: 6, fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, lineHeight: 1.5 }}>
                                    <span style={{ color: "var(--fg-faint)" }}>{a.t}</span>
                                    <span style={{ color: a.c, width: 8 }}>●</span>
                                    <span style={{ color: "var(--fg-soft)", flex: 1 }}>{a.m}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MetricCell({
    label,
    val,
    delta,
    color,
}: {
    label: string;
    val: number;
    delta: string;
    color: string;
}) {
    return (
        <div style={{
            border: "1px solid var(--line)", borderRadius: 6, padding: "8px 10px",
            background: "var(--bg)",
        }}>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "var(--fg-faint)", textTransform: "uppercase", letterSpacing: ".06em" }}>{label}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 2 }}>
                <span style={{ fontSize: 18, fontWeight: 500, letterSpacing: "-0.02em", fontFeatureSettings: "'tnum'" }}>{val.toLocaleString()}</span>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, color }}>{delta}</span>
            </div>
        </div>
    );
}

function AtlasMap() {
    return (
        <svg viewBox="0 0 200 120" width="100%" height="100%" style={{ border: "1px solid var(--line)", borderRadius: 6, background: "var(--bg-soft)" }}>
            <path d="M10,30 Q30,10 60,15 T120,20 Q160,18 180,40 L190,80 Q170,110 130,108 T70,105 Q30,108 12,90 Z"
                fill="color-mix(in oklab, var(--color1) 4%, transparent)" stroke="var(--line-strong)" strokeWidth=".6" />
            {Array.from({ length: 14 }).map((_, i) => Array.from({ length: 8 }).map((_, j) => (
                <circle key={`${i}-${j}`} cx={15 + i * 13} cy={20 + j * 12} r=".6" fill="var(--line-strong)" opacity=".5" />
            )))}
            <path d="M30,90 Q60,40 100,50 T170,40" stroke="var(--color1)" strokeWidth=".8" fill="none" strokeDasharray="3,2" />
            <path d="M40,60 Q90,80 130,70 T180,90" stroke="var(--color2)" strokeWidth=".8" fill="none" strokeDasharray="3,2" />
            <path d="M50,30 Q90,60 140,55 T180,30" stroke="var(--color3)" strokeWidth=".8" fill="none" strokeDasharray="3,2" />
            {[0, 1, 2, 3].map((i) => {
                const path = ["M30,90 Q60,40 100,50 T170,40", "M40,60 Q90,80 130,70 T180,90", "M50,30 Q90,60 140,55 T180,30", "M30,90 Q60,40 100,50 T170,40"][i];
                const color = ["var(--color1)", "var(--color2)", "var(--color3)", "var(--color1)"][i];
                return (
                    <circle key={i} r="2.2" fill={color} stroke="var(--bg)" strokeWidth="1">
                        <animateMotion dur={`${6 + i}s`} repeatCount="indefinite" path={path} />
                    </circle>
                );
            })}
            {[[30, 90], [100, 50], [170, 40], [180, 90], [40, 60]].map(([x, y], i) => (
                <g key={i}>
                    <circle cx={x} cy={y} r="3.2" fill="var(--bg)" stroke="var(--color1)" strokeWidth="1.2" />
                    <circle cx={x} cy={y} r="1.4" fill="var(--color1)" />
                </g>
            ))}
        </svg>
    );
}

/* ---------- mock 2: Foundry Coffee app ---------- */
function MockFoundry() {
    return (
        <div className="mock" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 400 360" preserveAspectRatio="xMidYMid slice">
                <circle cx="80" cy="60" r="80" fill="color-mix(in oklab, var(--color2) 14%, transparent)" />
                <circle cx="340" cy="300" r="120" fill="color-mix(in oklab, var(--color1) 10%, transparent)" />
            </svg>
            <div style={{
                position: "relative",
                width: 200, height: 340,
                background: "var(--bg)",
                border: "8px solid var(--dark1)",
                borderRadius: 28,
                boxShadow: "0 30px 60px -20px rgba(0,0,0,.3)",
                overflow: "hidden",
                zIndex: 1,
            }}>
                <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 60, height: 14, background: "var(--dark1)", borderRadius: "0 0 8px 8px", zIndex: 3 }} />
                <div style={{ padding: "14px 14px 6px", fontFamily: "JetBrains Mono, monospace", fontSize: 8, color: "var(--fg-faint)", display: "flex", justifyContent: "space-between" }}>
                    <span>9:41</span><span>●●●●●</span>
                </div>
                <div style={{ padding: "8px 14px 0", fontSize: 11, color: "var(--fg-mute)" }}>Good morning</div>
                <div style={{ padding: "2px 14px 12px", fontSize: 18, fontWeight: 500, letterSpacing: "-0.02em" }}>Morgan.</div>

                <div style={{
                    margin: "0 14px",
                    background: "linear-gradient(135deg, var(--color1), var(--color2))",
                    color: "white",
                    borderRadius: 10,
                    padding: "14px",
                    position: "relative",
                    overflow: "hidden",
                }}>
                    <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 8, opacity: .7, textTransform: "uppercase", letterSpacing: ".08em" }}>Beans</div>
                    <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: "-0.03em", marginTop: 2 }}>1,284</div>
                    <div style={{ display: "flex", gap: 4, marginTop: 10, alignItems: "center" }}>
                        <div style={{ height: 4, flex: 1, background: "rgba(255,255,255,.25)", borderRadius: 2, overflow: "hidden" }}>
                            <div style={{ height: "100%", width: "72%", background: "white" }} />
                        </div>
                        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 8 }}>216 to free latte</span>
                    </div>
                    <svg style={{ position: "absolute", right: -10, top: -12, width: 60, height: 60, opacity: .15 }} viewBox="0 0 60 60">
                        <path d="M30,4 C46,4 56,14 56,30 C56,46 46,56 30,56 C14,56 4,46 4,30 C4,14 14,4 30,4 Z M30,12 C40,12 30,20 30,30 C30,40 20,48 30,48" fill="none" stroke="white" strokeWidth="2" />
                    </svg>
                </div>

                <div style={{ padding: "14px 14px 0", fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "var(--fg-faint)", textTransform: "uppercase", letterSpacing: ".06em" }}>Reorder</div>
                {[
                    { n: "Oat flat white", s: "Foundry · Mission", p: "$5.40" },
                    { n: "Single-origin filter", s: "Foundry · Mission", p: "$5.80" },
                    { n: "Espresso · 2 shot", s: "Foundry · SoMa", p: "$4.20" },
                ].map((o, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 14px", borderTop: i ? "1px dashed var(--line)" : "none" }}>
                        <div style={{ width: 24, height: 24, borderRadius: 6, background: "var(--bg-soft)", border: "1px solid var(--line)" }} />
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 10.5, fontWeight: 500 }}>{o.n}</div>
                            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 8, color: "var(--fg-faint)" }}>{o.s}</div>
                        </div>
                        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "var(--color1)" }}>{o.p}</div>
                    </div>
                ))}

                <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    padding: "10px 0 14px",
                    display: "flex", justifyContent: "space-around",
                    background: "var(--bg)",
                    borderTop: "1px solid var(--line)",
                }}>
                    {["◉", "◇", "♢", "○"].map((g, i) => (
                        <span key={i} style={{ fontSize: 14, color: i === 0 ? "var(--color1)" : "var(--fg-faint)" }}>{g}</span>
                    ))}
                </div>
            </div>

            <div style={{
                position: "absolute", right: 24, top: "40%",
                fontFamily: "JetBrains Mono, monospace", fontSize: 10,
                color: "var(--fg-mute)",
                background: "var(--bg)",
                border: "1px solid var(--line)",
                borderRadius: 6, padding: "6px 8px",
                display: "flex", alignItems: "center", gap: 6,
                zIndex: 2,
            }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color2)" }} />
                push 02:14 sent
            </div>
        </div>
    );
}

/* ---------- mock 3: Helix Bio AI tool ---------- */
function MockHelix() {
    const [typed, setTyped] = useState("");
    const target = "How do KRAS G12C inhibitors compare in resistance pathways across our 2024 mouse studies?";
    useEffect(() => {
        let i = 0;
        const id = setInterval(() => {
            i++;
            setTyped(target.slice(0, i));
            if (i >= target.length) { setTimeout(() => { setTyped(""); i = 0; }, 2400); }
        }, 35);
        return () => clearInterval(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="mock">
            <div className="mock__win">
                <div className="mock__bar">
                    <span className="dot" /><span className="dot" style={{ background: "color-mix(in oklab, var(--color3) 80%, transparent)" }} /><span className="dot" style={{ background: "color-mix(in oklab, var(--color2) 80%, transparent)" }} />
                    <span className="mock__url">helix.internal/assist</span>
                </div>
                <div className="mock__body" style={{ gridTemplateColumns: "140px 1fr", padding: 0, gap: 0 }}>
                    <div style={{ borderRight: "1px solid var(--line)", padding: 12, background: "var(--bg-soft)" }}>
                        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "var(--fg-faint)", textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 8 }}>Threads</div>
                        {[
                            { t: "KRAS resistance", d: "2d", a: true },
                            { t: "BRCA1 panel review", d: "4d" },
                            { t: "GLP-1 lit review", d: "1w" },
                            { t: "CRISPR off-target", d: "2w" },
                        ].map((th, i) => (
                            <div key={i} style={{
                                padding: "6px 8px",
                                marginBottom: 2,
                                borderRadius: 4,
                                background: th.a ? "var(--bg)" : "transparent",
                                border: th.a ? "1px solid var(--line)" : "1px solid transparent",
                            }}>
                                <div style={{ fontSize: 10.5, fontWeight: th.a ? 500 : 400 }}>{th.t}</div>
                                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 8, color: "var(--fg-faint)" }}>{th.d}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 8, minHeight: 200 }}>
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <div style={{
                                background: "var(--color1)",
                                color: "white",
                                padding: "8px 10px",
                                borderRadius: "8px 8px 2px 8px",
                                fontSize: 11,
                                maxWidth: "85%",
                                fontFamily: "JetBrains Mono, monospace",
                            }}>
                                {typed}<span style={{ opacity: typed.length === target.length ? 0 : 1 }}>▍</span>
                            </div>
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                            <div style={{ width: 18, height: 18, borderRadius: "50%", background: "var(--color2)", flexShrink: 0, marginTop: 2 }} />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 10.5, color: "var(--fg)", lineHeight: 1.5 }}>
                                    Across the 2024 mouse studies (n=4), <b>sotorasib</b> showed faster
                                    emergence of MET-amplified clones than <b>adagrasib</b> (median 38d vs 64d).
                                    See sections cited below for the resistance pathways observed.
                                </div>
                                <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                                    {["MS-2024-031", "MS-2024-014", "MS-2024-052", "Pham et al."].map((s, i) => (
                                        <span key={i} style={{
                                            fontFamily: "JetBrains Mono, monospace", fontSize: 8.5,
                                            padding: "2px 6px",
                                            border: "1px solid var(--line)",
                                            borderRadius: 3,
                                            color: "var(--fg-soft)",
                                            background: "var(--bg-soft)",
                                        }}>{s}</span>
                                    ))}
                                </div>
                                <div style={{ marginTop: 10, padding: "8px 10px", border: "1px dashed var(--line)", borderRadius: 4, background: "var(--bg-soft)" }}>
                                    <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 8.5, color: "var(--fg-faint)", marginBottom: 6 }}>EVAL · run #4291</div>
                                    <div style={{ display: "flex", gap: 10, fontFamily: "JetBrains Mono, monospace", fontSize: 9 }}>
                                        <span><span style={{ color: "var(--color2)" }}>recall</span> 0.94</span>
                                        <span><span style={{ color: "var(--color2)" }}>cite</span> 4/4</span>
                                        <span><span style={{ color: "var(--color3)" }}>halluc</span> 0.02</span>
                                        <span><span style={{ color: "var(--fg-mute)" }}>lat</span> 182ms</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
