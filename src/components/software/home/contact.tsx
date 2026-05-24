"use client";

// Contact — form + scheduling hint.

import { useState, type FormEvent } from "react";
import { Icon } from "./icons";

export function Contact() {
    const [services, setServices] = useState<string[]>(["Web app"]);
    const all = ["Web app", "Mobile app", "Dashboard", "Design system", "AI / RAG", "Internal tool", "E-commerce", "Other"];
    const toggle = (s: string) =>
        setServices((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

    const [budget, setBudget] = useState("$30–60k");
    const budgets = ["< $15k", "$15–30k", "$30–60k", "$60–120k", "$120k+"];

    const [submitted, setSubmitted] = useState(false);

    return (
        <section className="cta" id="contact">
            <div className="wrap cta__inner">
                <div>
                    <div className="section-rule" style={{ marginBottom: 24 }}>
                        <span className="section-rule__num">11</span>
                        <div className="section-rule__line" />
                        <span className="section-rule__tag">Contact</span>
                    </div>
                    <h2 className="section-title" style={{ fontSize: "clamp(36px, 4.4vw, 56px)" }}>
                        Tell us what you&rsquo;re<br />building.
                    </h2>
                    <p className="section-sub" style={{ maxWidth: "42ch" }}>
                        We reply within one business day. If it&rsquo;s a fit, we&rsquo;ll suggest a 30-minute discovery call;
                        if not, we&rsquo;ll point you somewhere good.
                    </p>

                    <div style={{ display: "flex", gap: 24, marginTop: 32, flexWrap: "wrap" }}>
                        <Contactish label="email" value="hello@vestvisuals.co" />
                        <Contactish label="signal" value="+1 (415) 555-2042" />
                        <Contactish label="office" value="San Francisco · Lisbon" />
                    </div>

                    <div style={{
                        marginTop: 32,
                        display: "flex", gap: 24, flexWrap: "wrap",
                        fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--fg-mute)",
                    }}>
                        <span><Icon.Check /> NDA on first call</span>
                        <span><Icon.Check /> SOC2 — audited</span>
                        <span><Icon.Check /> US + EU contracts</span>
                    </div>
                </div>

                <form className="cta__form" onSubmit={(e: FormEvent) => { e.preventDefault(); setSubmitted(true); }}>
                    {submitted ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "24px 4px" }}>
                            <div style={{
                                width: 48, height: 48,
                                background: "var(--color2)",
                                color: "white",
                                display: "grid", placeItems: "center",
                                borderRadius: "50%",
                            }}><Icon.Check style={{ width: 24, height: 24 }} /></div>
                            <h3 style={{ margin: 0, fontSize: 22, fontWeight: 500, letterSpacing: "-0.01em" }}>Got it. We&rsquo;ll reply within one business day.</h3>
                            <p style={{ margin: 0, color: "var(--fg-mute)", fontSize: 14 }}>
                                In the meantime, our last 3 case studies are at <a href="#work" style={{ color: "var(--color1)" }}>vestvisuals.co/work</a>.
                            </p>
                        </div>
                    ) : (
                        <>
                            <label>Your name</label>
                            <input type="text" placeholder="Alex Doe" required />

                            <label>Email</label>
                            <input type="email" placeholder="alex@company.com" required />

                            <label>Company</label>
                            <input type="text" placeholder="Acme Co." />

                            <label>What you&rsquo;re building</label>
                            <div className="cta__chips">
                                {all.map((s) => (
                                    <span
                                        key={s}
                                        className={`cta__chip ${services.includes(s) ? "is-on" : ""}`}
                                        onClick={() => toggle(s)}
                                    >{s}</span>
                                ))}
                            </div>

                            <label>Approximate budget</label>
                            <div className="cta__chips">
                                {budgets.map((b) => (
                                    <span
                                        key={b}
                                        className={`cta__chip ${budget === b ? "is-on" : ""}`}
                                        onClick={() => setBudget(b)}
                                    >{b}</span>
                                ))}
                            </div>

                            <label>What&rsquo;s the problem?</label>
                            <textarea rows={3} placeholder="A few sentences is fine — we'll dig in on the call." />

                            <button type="submit" className="btn btn--primary btn--arrow" style={{ marginTop: 6, justifyContent: "space-between" }}>
                                Send to vest visuals <Icon.Arrow />
                            </button>
                            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10.5, color: "var(--fg-faint)", textAlign: "center", marginTop: 4 }}>
                                · we read every message. <span style={{ color: "var(--fg-mute)" }}>no auto-replies, no funnels.</span>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </section>
    );
}

function Contactish({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10.5, color: "var(--fg-faint)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: "-0.01em" }}>{value}</div>
        </div>
    );
}
