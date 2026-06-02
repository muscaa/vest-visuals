"use client";

import { TextH1, TextP, TextSpan } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

function HeroPanel() {
    return (
        <div className="hero__panel">
            <div className="hero__stage">
                <BrowserMock2 />
                <TerminalMock2 />
                <PhoneMock2 />
            </div>
        </div>
    );
}

// ----- Browser ---------------------------------------------------
function BrowserMock2() {
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
function TerminalMock2() {
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
function PhoneMock2() {
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

interface Props {

}

export function HeroSection(props: Props) {
    return (
        <header id="hero" className="relative flex flex-col justify-center items-center px-6 pt-24 pb-18 border-b">
            <div className="grid-background" />
            <div className="grid grid-cols-2 gap-16 items-center max-w-7xl w-full">
                <div className="flex flex-col">
                    <TextH1 size="display" className="mt-14">
                        We build software
                        <br />
                        that ships, <em>predictably.</em>
                    </TextH1>
                    <TextP variant="muted" size="lead" className="max-w-[50ch] my-10">
                        Vest Visuals is a small engineering studio. We design, build, and launch web apps, mobile apps, internal tools, and data products with senior teams — on fixed weekly sprints, no surprises.
                    </TextP>
                    <div className="flex gap-4">
                        <Button variant="default">
                            Book a discovery call
                        </Button>
                        <Button variant="outline">
                            See recent work
                        </Button>
                    </div>
                    <div className="flex gap-12 mt-16">
                        <TextSpan variant="muted" size="label" font="mono2"><b>11</b> shipped products</TextSpan>
                        <TextSpan variant="muted" size="label" font="mono2"><b>4x</b> on-time delivery</TextSpan>
                        <TextSpan variant="muted" size="label" font="mono2"><b>NPS 72</b> last 12mo</TextSpan>
                    </div>
                </div>
                <div className="relative bg-black/20 w-full aspect-5/4">
                    <BrowserMock />
                    <PhoneMock />
                    <TerminalMock />
                </div>
            </div>
            <div className="flex max-w-7xl w-full h-20 mt-16 bg-black/20">
                {/* TODO */}
            </div>
        </header>
    );
}

function BrowserMock() {
    return (
        <div className="absolute z-1 top-[10%] left-[9%] w-[70%] h-[70%] bg-blue-400 animate-floatA">
        </div>
    );
}

function PhoneMock() {
    return (
        <div className="absolute z-2 top-[35%] right-[3%] w-[21%] aspect-1/2 rotate-4 bg-green-400 animate-floatB">
        </div>
    );
}

function TerminalMock() {
    return (
        <div className="absolute z-3 bottom-[10%] left-[2%] w-[40%] h-[30%] -rotate-3 bg-red-400 animate-floatC">
        </div>
    );
}
