// Pricing — 3 tiers.

import { Icon } from "./icons";
import { SectionRule } from "./section-rule";

export function Pricing() {
    const tiers = [
        {
            name: "Sprint",
            price: "$8.5k",
            unit: "/ week",
            desc: "A single senior on your team. Best for unblockers and short builds.",
            feats: [
                "1 senior engineer or designer",
                "Friday demos, weekly invoice",
                "Async + 2 standups per week",
                "Stop or extend anytime",
                "Code lives in your repo",
            ],
            cta: "Reserve a slot",
        },
        {
            name: "Build",
            price: "$32k",
            unit: "/ month",
            desc: "Cross-functional pod, end-to-end ownership. Our most common engagement.",
            feats: [
                "2 seniors + part-time lead",
                "Design system, frontend, backend",
                "Roadmap reviewed each sprint",
                "8-week minimum, monthly opt-out",
                "Includes infra + observability",
                "Direct Slack + GitHub access",
            ],
            cta: "Book a discovery call",
            feature: true,
        },
        {
            name: "Retainer",
            price: "$14k",
            unit: "/ month",
            desc: "Post-launch support. Bug fixes, small features, infra babysitting.",
            feats: [
                "0.4 FTE allocation",
                "Same team as the build",
                "4-hour critical-bug SLA",
                "Quarterly architecture review",
                "Renewable monthly",
            ],
            cta: "Talk to us",
        },
    ];

    return (
        <section className="section" id="pricing">
            <div className="wrap">
                <SectionRule num="09" tag="Pricing" />
                <h2 className="section-title">Three ways to work together.</h2>
                <p className="section-sub">
                    Weekly billing. No retainers you can&rsquo;t escape. Pricing is what it is — the same
                    number on every invoice.
                </p>
                <div className="tiers">
                    {tiers.map((t) => (
                        <article className={`tier ${t.feature ? "tier--feature" : ""}`} key={t.name}>
                            <div>
                                <div className="tier__name">{t.name}</div>
                                <div className="tier__price">{t.price}<span>{t.unit}</span></div>
                                <p className="tier__desc">{t.desc}</p>
                            </div>
                            <ul className="tier__feat">
                                {t.feats.map((f) => (
                                    <li key={f}><Icon.Check /> {f}</li>
                                ))}
                            </ul>
                            <a href="#contact" className={`btn ${t.feature ? "btn--primary" : "btn--ghost"} btn--arrow`} style={{ justifyContent: "space-between" }}>
                                {t.cta} <Icon.Arrow />
                            </a>
                        </article>
                    ))}
                </div>

                <div style={{
                    marginTop: 24,
                    padding: 16,
                    border: "1px dashed var(--line)",
                    borderRadius: "var(--radius)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 16,
                    fontSize: 13.5,
                    color: "var(--fg-mute)",
                }}>
                    <span>
                        <span style={{ color: "var(--fg)", fontWeight: 500 }}>Equity in lieu of cash?</span> Sometimes — for pre-seed or seed teams we believe in.
                    </span>
                    <a href="#contact" style={{ color: "var(--color1)", fontFamily: "JetBrains Mono, monospace", fontSize: 12 }}>→ tell us about your round</a>
                </div>
            </div>
        </section>
    );
}
