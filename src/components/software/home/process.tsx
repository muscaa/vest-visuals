// Process — 5-step timeline + gantt visualization.

import { SectionRule } from "./section-rule";

export function Process() {
    const steps = [
        { n: "01", title: "Discovery", week: "wk 0", desc: "30-min call. We sketch scope, risk, and rough budget — and tell you if we're a bad fit." },
        { n: "02", title: "Sprint zero", week: "wk 1", desc: "Architecture, design tokens, infra-as-code. We commit code to your repo from day one." },
        { n: "03", title: "Weekly ship", week: "wk 2–N", desc: "Demo every Friday. You see exactly what changed and why. Always shippable." },
        { n: "04", title: "Hardening", week: "wk N+1", desc: "Load, accessibility, security review, docs. Boring on purpose." },
        { n: "05", title: "Handoff", week: "wk N+2", desc: "We migrate your team in, then stay on retainer for two months minimum." },
    ];

    return (
        <section className="section" id="process">
            <div className="wrap">
                <SectionRule num="05" tag="Process" />
                <h2 className="section-title">A sprint a week. <em>For real.</em></h2>
                <p className="section-sub">
                    We work in fixed weekly sprints with a Friday demo. You get a predictable cadence —
                    no surprise overruns, no Slack ghosting.
                </p>
                <div className="process">
                    {steps.map((s) => (
                        <div className="step" key={s.n}>
                            <div className="step__num">{s.n}</div>
                            <h4 className="step__title">{s.title}</h4>
                            <p className="step__desc">{s.desc}</p>
                            <span className="step__week">{s.week}</span>
                        </div>
                    ))}
                </div>

                <Gantt />
            </div>
        </section>
    );
}

function Gantt() {
    const tracks = [
        { name: "Architecture", start: 1, end: 3, c: "var(--color1)" },
        { name: "Design system", start: 1, end: 4, c: "var(--color2)" },
        { name: "Backend / API", start: 2, end: 8, c: "var(--color1)" },
        { name: "Frontend app", start: 3, end: 9, c: "var(--color1)" },
        { name: "Data / pipelines", start: 4, end: 8, c: "var(--color3)" },
        { name: "QA + a11y", start: 7, end: 10, c: "var(--color5)" },
        { name: "Handoff", start: 9, end: 11, c: "var(--color2)" },
    ];
    const weeks = 12;

    return (
        <div style={{
            marginTop: 56,
            border: "1px solid var(--line)",
            borderRadius: "calc(var(--radius) * 1.4)",
            background: "var(--bg)",
            overflow: "hidden",
        }}>
            <div style={{
                display: "flex", justifyContent: "space-between",
                padding: "16px 20px",
                borderBottom: "1px solid var(--line)",
                background: "var(--bg-soft)",
            }}>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--fg-mute)" }}>
                    Typical engagement · 10 weeks · 1 sprint = 1 week
                </span>
                <span style={{ display: "flex", gap: 14, fontSize: 11, color: "var(--fg-mute)", fontFamily: "JetBrains Mono, monospace" }}>
                    <Legend c="var(--color1)" l="build" />
                    <Legend c="var(--color2)" l="design" />
                    <Legend c="var(--color3)" l="data" />
                    <Legend c="var(--color5)" l="ops" />
                </span>
            </div>
            <div style={{ padding: 16, position: "relative" }}>
                <div style={{ display: "grid", gridTemplateColumns: `160px repeat(${weeks}, 1fr)`, marginBottom: 8 }}>
                    <div></div>
                    {Array.from({ length: weeks }).map((_, i) => (
                        <div key={i} style={{
                            fontFamily: "JetBrains Mono, monospace",
                            fontSize: 10, color: "var(--fg-faint)",
                            textAlign: "center",
                            borderLeft: i ? "1px dashed var(--line)" : "1px solid var(--line)",
                            paddingBottom: 6,
                        }}>w{i + 1}</div>
                    ))}
                </div>
                {tracks.map((t, i) => (
                    <div key={t.name} style={{
                        display: "grid", gridTemplateColumns: `160px repeat(${weeks}, 1fr)`,
                        alignItems: "center", minHeight: 30,
                        borderTop: "1px dashed var(--line)",
                    }}>
                        <div style={{ fontSize: 12, color: "var(--fg-soft)", paddingRight: 12 }}>{t.name}</div>
                        <div style={{
                            gridColumn: `${t.start + 1} / ${t.end + 2}`,
                            height: 12,
                            background: t.c,
                            opacity: .85,
                            borderRadius: 3,
                            position: "relative",
                            animation: `gantt-grow .8s ${i * 0.08}s cubic-bezier(.7,0,.2,1) backwards`,
                        }} />
                    </div>
                ))}

                <div style={{
                    position: "absolute",
                    top: 0, bottom: 0,
                    left: `calc(160px + 16px + ((100% - 160px - 32px) / ${weeks}) * 4.5)`,
                    width: 1,
                    background: "var(--color4)",
                }}>
                    <div style={{
                        position: "absolute", top: -10, left: -28,
                        fontFamily: "JetBrains Mono, monospace", fontSize: 9,
                        color: "var(--color4)", whiteSpace: "nowrap",
                    }}>↓ today</div>
                </div>
            </div>
        </div>
    );
}

function Legend({ c, l }: { c: string; l: string }) {
    return (
        <span className="legend">
            <span className="sw" style={{ background: c }} /> {l}
        </span>
    );
}
