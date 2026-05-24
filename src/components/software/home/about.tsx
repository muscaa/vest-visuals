// About — small team grid + values strip.

import { SectionRule } from "./section-rule";

export function About() {
    const team = [
        { name: "Maya Park", init: "MP", role: "Founder / engineering", bio: "12y building product. Ex-Stripe, ex-early Linear.", c: "var(--color1)" },
        { name: "Tomás Reyes", init: "TR", role: "Design + systems", bio: "Design systems lead. Ex-Vercel, ex-Figma plugins.", c: "var(--color2)" },
        { name: "Iris Nakamura", init: "IN", role: "ML + infra", bio: "RAG, evals, retrieval. PhD CMU, ex-Anthropic.", c: "var(--color3)" },
        { name: "Sam Olufemi", init: "SO", role: "Mobile + platform", bio: "iOS since iOS 4. Built 22 production apps.", c: "var(--color4)" },
    ];

    return (
        <section className="section" id="about">
            <div className="wrap">
                <SectionRule num="07" tag="Team" />
                <h2 className="section-title">Four people. <em>That&rsquo;s it.</em></h2>
                <p className="section-sub">
                    We stay small on purpose. You work with the people who write the code &mdash;
                    no project managers, no account leads, no handoffs. We&rsquo;ve been doing this since 2019.
                </p>
                <div className="team">
                    {team.map((m) => (
                        <article className="member" key={m.name}>
                            <div className="member__avatar" style={{ background: m.c }}>{m.init}</div>
                            <h4 className="member__name">{m.name}</h4>
                            <div className="member__role">{m.role}</div>
                            <p className="member__bio">{m.bio}</p>
                        </article>
                    ))}
                </div>

                <div style={{
                    marginTop: 32,
                    display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1,
                    background: "var(--line)",
                    border: "1px solid var(--line)",
                    borderRadius: "calc(var(--radius) * 1.4)",
                    overflow: "hidden",
                }}>
                    {[
                        { k: "Honest", v: "We'll tell you not to build it, if it shouldn't exist." },
                        { k: "Concrete", v: "Every estimate has a number. Every milestone has a date." },
                        { k: "Slow", v: "Boring tech, boring meetings, boring incidents." },
                    ].map((v) => (
                        <div key={v.k} style={{
                            background: "var(--bg)", padding: "20px 24px",
                            display: "flex", flexDirection: "column", gap: 4,
                        }}>
                            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--fg-faint)", textTransform: "uppercase", letterSpacing: ".08em" }}>—— {v.k}</div>
                            <div style={{ fontSize: 15, color: "var(--fg-soft)" }}>{v.v}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
