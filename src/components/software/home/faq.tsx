// FAQ — native <details> accordion.

import { Icon } from "./icons";
import { SectionRule } from "./section-rule";

export function FAQ() {
    const items = [
        {
            q: "How quickly can you start?",
            a: "Most engagements start within 2–3 weeks of our discovery call. We keep one slot open for unblockers — if you're stuck and need help this week, ask.",
        },
        {
            q: "Do you sign NDAs?",
            a: "Yes, mutual NDA at the start of the discovery call. We don't talk publicly about any project unless the client asks us to.",
        },
        {
            q: "Will you work with our existing team?",
            a: "Yes, this is most of what we do. We pair with your engineers, run code review on both sides, and avoid building parallel kingdoms.",
        },
        {
            q: "What's your team based?",
            a: "San Francisco and Lisbon. We cover working hours from ~07:00 PT to ~18:00 PT.",
        },
        {
            q: "Do you do design without engineering?",
            a: "We do — but only when there's an engineering team waiting on the other side. Design without a builder is a Figma file gathering dust.",
        },
        {
            q: "What's the smallest project you'll take?",
            a: "Two weeks of work, single engineer. Below that, it's faster for you to do it yourselves and we'll happily review the PR.",
        },
        {
            q: "Do you offer fixed-bid projects?",
            a: "Rarely. Fixed bids usually mean either we overcharge to absorb risk, or we cut corners to absorb risk. Weekly billing keeps incentives aligned.",
        },
        {
            q: "Who owns the code?",
            a: "You do, end of story. We commit to your repo from day one and never hold IP hostage.",
        },
    ];

    return (
        <section className="section" id="faq">
            <div className="wrap">
                <SectionRule num="10" tag="FAQ" />
                <div className="faq__layout">
                    <div>
                        <h2 className="section-title" style={{ maxWidth: "14ch" }}>Questions we get most.</h2>
                        <p className="section-sub" style={{ maxWidth: "32ch" }}>
                            Didn&rsquo;t see yours? Hit us at <a href="#contact" style={{ color: "var(--color1)", borderBottom: "1px solid currentColor" }}>hello@vestvisuals.co</a>.
                        </p>
                    </div>
                    <div className="faqs">
                        {items.map((it, i) => (
                            <details className="faq" key={i}>
                                <summary className="faq__head">
                                    {it.q}
                                    <span className="ico"><Icon.Plus /></span>
                                </summary>
                                <div className="faq__body">{it.a}</div>
                            </details>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
