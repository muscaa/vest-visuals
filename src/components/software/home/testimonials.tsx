// Testimonials.

import { SectionRule } from "./section-rule";

export function Testimonials() {
    const quotes = [
        {
            body: "We've worked with three studios before Vest. They were the first to push back on a feature we wanted, and they were right. Ship rate doubled after that.",
            name: "Lena Voss",
            role: "CTO, Atlas Logistics",
            initials: "LV",
        },
        {
            body: "Friday demos changed how my board talks to me. I show up with shipped product, not slides. I cannot oversell this part of how Vest works.",
            name: "Devon Marsh",
            role: "Founder, Foundry",
            initials: "DM",
        },
        {
            body: "The eval harness they built is now copied in three other internal teams. They left us in a better place than they found us in.",
            name: "Dr. Priya Kapoor",
            role: "Head of R&D, Helix Bio",
            initials: "PK",
        },
    ];

    return (
        <section className="section" id="quotes">
            <div className="wrap">
                <SectionRule num="08" tag="Clients" />
                <h2 className="section-title">In their words.</h2>
                <p className="section-sub">
                    Things our clients said in the post-launch retrospective. Names and titles are real.
                </p>
                <div className="quotes">
                    {quotes.map((q, i) => (
                        <article className="quote" key={i}>
                            <div>
                                <div className="quote__mark">&ldquo;</div>
                                <p className="quote__body">{q.body}</p>
                            </div>
                            <div className="quote__who">
                                <div className="quote__avatar" style={{ background: ["var(--color1)", "var(--color2)", "var(--color3)"][i] }}>{q.initials}</div>
                                <div>
                                    <div className="quote__who-name">{q.name}</div>
                                    <div className="quote__who-title">{q.role}</div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
