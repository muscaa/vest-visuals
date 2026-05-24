"use client";

// Hero — full-bleed photo with rotating images + overlaid editorial type.
// Ported from pages.jsx (the baked default variant is "fullbleed").

import { useEffect, useState } from "react";
import { COPY, LIVE, type Lang, type CopyShape } from "./data";
import { Icon } from "./icons";

const IMAGES = [LIVE.hero1, LIVE.hero2, LIVE.hero3, LIVE.hero4, LIVE.hero5];

export function Hero({
    lang,
    setRoute,
}: {
    lang: Lang;
    setRoute: (r: string) => void;
}) {
    const c = COPY[lang];
    const [idx, setIdx] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setIdx((i) => (i + 1) % IMAGES.length), 5500);
        return () => clearInterval(t);
    }, []);

    const title = c.heroTitle; // ["We capture", "emotion,", "not just", "images."]

    return (
        <section className="hero" data-variant="fullbleed">
            <div className="hero-media">
                {IMAGES.map((src, i) => (
                    <img key={i} src={src} alt="" className={i === idx ? "on" : ""} loading={i === 0 ? "eager" : "lazy"} />
                ))}
            </div>
            <div className="hero-scrim" />

            <div className="container hero-grid">
                <div className="hero-top">
                    <span className="hero-eyebrow"><span className="pulse" /> {c.heroEyebrow}</span>
                    <span className="hero-counter">VV · {new Date().getFullYear()}</span>
                </div>

                <div className="hero-main">
                    <h1 className="hero-title">
                        {title[0]} <span className="em">{title[1]}</span><br />
                        {title[2]} <span className="em-blue">{title[3]}</span>
                    </h1>
                    <p className="hero-sub">{c.heroSub}</p>
                    <div className="hero-actions">
                        <button className="btn on-dark btn-primary" onClick={() => setRoute("portfolio")}>{c.heroCta1} <Icon.arrow /></button>
                        <button className="btn on-dark" onClick={() => setRoute("contact")}>{c.heroCta2}</button>
                    </div>
                </div>

                <HeroBottom lang={lang} idx={idx} total={IMAGES.length} c={c} />
            </div>
        </section>
    );
}

function HeroBottom({
    lang,
    idx,
    total,
    c,
}: {
    lang: Lang;
    idx: number;
    total: number;
    c: CopyShape;
}) {
    return (
        <div className="hero-bottom">
            <div className="hero-stats">
                <div><span className="v">3+</span>{lang === "ro" ? "ani · echipa" : "years · team"}</div>
                <div><span className="v">160+</span>{lang === "ro" ? "proiecte livrate" : "projects delivered"}</div>
                <div><span className="v">5</span>{lang === "ro" ? "categorii foto-video" : "photo-video categories"}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: ".85rem", alignItems: "flex-end" }}>
                <span className="mono-sm" style={{ color: "inherit", opacity: .7 }}>
                    {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
                <span className="hero-scroll">
                    <span className="bar" /> {c.heroScroll}
                </span>
            </div>
        </div>
    );
}
