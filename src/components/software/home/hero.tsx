"use client";

// Hero — animated logo + tagline + floating device annotations.

import { useEffect, useState } from "react";
import { Icon } from "./icons";

const TECHS = [
    "TypeScript", "React", "Next.js", "Swift", "Kotlin", "Rust",
    "Python", "PostgreSQL", "Tailwind", "Figma", "D3.js", "WebGL",
    "tRPC", "Prisma", "Vercel", "OpenAI", "Anthropic", "LangChain",
];

export function Hero() {
    return (
        <section className="hero" id="top">
            <div className="hero__grid" />
            <div className="wrap hero__inner">
                <div>
                    <span className="hero__eyebrow">
                        <span className="pulse" />
                        <span>booking_q4_2026 → 2 slots left</span>
                    </span>

                    <h1 className="hero__h1">
                        We build software<br />
                        that ships, <em>predictably</em>.
                    </h1>

                    <p className="hero__sub">
                        Vest Visuals is a small engineering studio. We design, build, and
                        launch web apps, mobile apps, internal tools, and data products
                        with senior teams &mdash; on fixed weekly sprints, no surprises.
                    </p>

                    <div className="hero__cta">
                        <a href="#contact" className="btn btn--primary btn--arrow">
                            Book a discovery call <Icon.Arrow />
                        </a>
                        <a href="#work" className="btn btn--ghost">
                            See recent work
                        </a>
                    </div>

                    <div className="hero__meta">
                        <span><b>11</b> shipped products</span>
                        <span><b>4&times;</b> on-time delivery</span>
                        <span><b>NPS 72</b> last 12mo</span>
                    </div>
                </div>

                <HeroPanel />
            </div>

            <div className="wrap" style={{ marginTop: "calc(40px * var(--density))" }}>
                <div className="marquee">
                    <div className="marquee__track">
                        {[...TECHS, ...TECHS].map((t, i) => (
                            <span className="marquee__item" key={i}>
                                <Icon.Dot /> {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function HeroPanel() {
    return (
        <div className="hero__panel">
            <div className="hero__stage">
                <BrowserMock />
                <TerminalMock />
                <PhoneMock />
            </div>
        </div>
    );
}

// ----- Browser ---------------------------------------------------
function BrowserMock() {
    const heights = [62, 78, 45, 90, 70, 58, 84, 52, 76, 88, 64, 72];
    const [active, setActive] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setActive((a) => (a + 1) % 4), 1600);
        return () => clearInterval(id);
    }, []);
    const tiles = [
        { lbl: "MRR", v: "$48.2k", d: "+12%", c: "var(--color2)" },
        { lbl: "Sessions", v: "12,408", d: "+4.1%", c: "var(--color1)" },
        { lbl: "p95 ttfb", v: "184ms", d: "−22%", c: "var(--color2)" },
        { lbl: "Errors", v: "0.04%", d: "flat", c: "var(--color5)" },
    ];
    return (
        <div className="hpm hpm--browser">
            <div className="hpm__bar">
                <span className="tl" /><span className="tl" /><span className="tl" />
                <span className="hpm__url">app.vest-visuals.studio/dashboard</span>
                <span className="hpm__act" />
            </div>
            <div className="hpm-browser__body">
                <aside className="hpm-browser__side">
                    <span className="hpm-browser__brand" />
                    {[0, 1, 2, 3, 4].map((i) => (
                        <span key={i} className={"hpm-browser__sb" + (i === 1 ? " is-on" : "")} />
                    ))}
                </aside>
                <main className="hpm-browser__main">
                    <div className="hpm-browser__tiles">
                        {tiles.map((t, i) => (
                            <div key={i} className={"hpm-tile" + (i === active ? " is-on" : "")}>
                                <span className="hpm-tile__lbl">{t.lbl}</span>
                                <span className="hpm-tile__v">{t.v}</span>
                                <span className="hpm-tile__d" style={{ color: t.c }}>{t.d}</span>
                            </div>
                        ))}
                    </div>
                    <div className="hpm-browser__chart">
                        <div className="hpm-chart">
                            {heights.map((h, i) => (
                                <span
                                    key={i}
                                    className="hpm-chart__bar"
                                    style={{
                                        height: `${h}%`,
                                        background: i === 7
                                            ? "var(--color2)"
                                            : "color-mix(in oklab, var(--color1) 65%, var(--bg-mute))",
                                        animationDelay: `${i * 0.12}s`,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

// ----- Terminal --------------------------------------------------
function TerminalMock() {
    const script = [
        { k: "prompt", text: "$ vv deploy production" },
        { k: "log", text: "→ resolving 14 packages" },
        { k: "ok", text: "✓ tests  412 / 412" },
        { k: "ok", text: "✓ types  0 errors" },
        { k: "log", text: "→ migrating database" },
        { k: "ok", text: "✓ shipped in 42.1s" },
    ];
    const [step, setStep] = useState(1);
    useEffect(() => {
        const id = setInterval(() => {
            setStep((s) => (s >= script.length + 3 ? 1 : s + 1));
        }, 900);
        return () => clearInterval(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const shown = Math.min(step, script.length);

    return (
        <div className="hpm hpm--terminal">
            <div className="hpm__bar hpm__bar--dark">
                <span className="tl tl--r" /><span className="tl tl--y" /><span className="tl tl--g" />
                <span className="hpm__url hpm__url--dark">vv@studio — zsh</span>
            </div>
            <div className="hpm-term__body">
                {script.slice(0, shown).map((l, i) => (
                    <div key={i} className={"hpm-term__line hpm-term__line--" + l.k}>
                        {l.text}
                    </div>
                ))}
                {shown < script.length && (
                    <div className="hpm-term__line hpm-term__line--caret">
                        <span className="caret" />
                    </div>
                )}
                {shown >= script.length && (
                    <div className="hpm-term__line hpm-term__line--prompt">
                        $ <span className="caret" />
                    </div>
                )}
            </div>
        </div>
    );
}

// ----- Phone -----------------------------------------------------
function PhoneMock() {
    const [tick, setTick] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setTick((t) => t + 1), 1400);
        return () => clearInterval(id);
    }, []);
    const items = [
        { t: "Sprint 14 demo", s: "Fri · 4pm", c: "var(--color1)" },
        { t: "Design review", s: "Tue · 2pm", c: "var(--color2)" },
        { t: "Eval harness", s: "Wed · 10am", c: "var(--color1)" },
        { t: "Migration plan", s: "Thu · 11am", c: "var(--color2)" },
    ];
    const active = tick % items.length;
    return (
        <div className="hpm hpm--phone">
            <div className="hpm-phone__frame">
                <div className="hpm-phone__notch" />
                <div className="hpm-phone__screen">
                    <div className="hpm-phone__top">
                        <span className="hpm-phone__time">9:41</span>
                        <span className="hpm-phone__bars">
                            <span /><span /><span />
                        </span>
                    </div>
                    <div className="hpm-phone__hero">
                        <span className="hpm-phone__hero-lbl">THIS WEEK</span>
                        <span className="hpm-phone__hero-v">3.2 ships</span>
                    </div>
                    <div className="hpm-phone__list">
                        {items.map((it, i) => (
                            <div key={i} className={"hpm-phone__item" + (i === active ? " is-on" : "")}>
                                <span className="hpm-phone__sq" style={{ background: it.c }} />
                                <span className="hpm-phone__item-c">
                                    <span className="hpm-phone__item-t">{it.t}</span>
                                    <span className="hpm-phone__item-s">{it.s}</span>
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="hpm-phone__tab">
                        <span className="hpm-phone__dot is-on" />
                        <span className="hpm-phone__dot" />
                        <span className="hpm-phone__dot" />
                    </div>
                </div>
            </div>
        </div>
    );
}
