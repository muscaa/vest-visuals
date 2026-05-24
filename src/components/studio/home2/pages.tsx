"use client";

// pages.tsx — Home / About / Portfolio / Category / Locations / Contact.
// Ported from pages.jsx + app.jsx (AboutPage). Tweaks baked: masonry grid,
// 3 columns, full-bleed hero.

import { Fragment, useMemo, useState } from "react";
import {
    COPY, CATEGORIES, TEAM, TESTIMONIALS, LOCATIONS,
    type Lang,
} from "./data";
import { Icon } from "./icons";
import { Reveal } from "./reveal";
import { Hero } from "./hero";
import { TeamCard } from "./team-card";
import { Lightbox } from "./lightbox";

const GRID_COLS = 3;
const GRID_STYLE = "masonry";

type SetRoute = (r: string) => void;

// Render a multi-line title where line index 1 is highlighted.
function SplitTitle({ text, highlight }: { text: string; highlight: "ital" | "ital-teal" }) {
    return (
        <>
            {text.split("\n").map((l, i) => (
                <Fragment key={i}>
                    {i === 1 ? <span className={highlight}>{l}</span> : l}
                    {i === 0 ? <br /> : null}
                </Fragment>
            ))}
        </>
    );
}

// ============================================================
// HOME
// ============================================================
export function Home({ lang, setRoute }: { lang: Lang; setRoute: SetRoute }) {
    const c = COPY[lang];
    const cats = CATEGORIES;
    const team = TEAM;
    const ts = TESTIMONIALS;
    const locs = LOCATIONS;

    return (
        <div className="page">
            <Hero lang={lang} setRoute={setRoute} />

            {/* About — main bg, photo-led card */}
            <section className="section" id="about">
                <div className="container">
                    <div className="about-grid">
                        <div>
                            <Reveal><div className="kicker">{c.aboutKicker}</div></Reveal>
                            <Reveal delay={80}>
                                <h2 className="display" style={{ marginTop: "1rem", marginBottom: 0 }}>
                                    <SplitTitle text={c.aboutTitle} highlight="ital-teal" />
                                </h2>
                            </Reveal>
                        </div>
                        <div>
                            <Reveal delay={120}><p className="lead" style={{ margin: 0 }}>{c.aboutLead}</p></Reveal>
                            <Reveal delay={200}><p className="body" style={{ marginTop: "1.25rem", maxWidth: "56ch" }}>{c.aboutBody}</p></Reveal>
                        </div>
                    </div>

                    {/* team grid — spans full container */}
                    <div className="team-grid">
                        {team.map((m, i) => (
                            <Reveal delay={260 + i * 100} key={m.first}>
                                <TeamCard member={m} idx={i} total={team.length} lang={lang} />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Portfolio teaser — soft band */}
            <section className="section section-soft" id="work">
                <div className="container">
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "end" }}>
                        <div>
                            <Reveal><div className="kicker">{c.workKicker}</div></Reveal>
                            <Reveal delay={80}>
                                <h2 className="display" style={{ marginTop: "1rem", marginBottom: 0 }}>
                                    <SplitTitle text={c.workTitle} highlight="ital" />
                                </h2>
                            </Reveal>
                        </div>
                        <div>
                            <Reveal delay={120}><p className="lead" style={{ margin: 0 }}>{c.workSub}</p></Reveal>
                        </div>
                    </div>

                    <div className="work-list">
                        {cats.map((cat) => (
                            <WorkRow key={cat.id} cat={cat} lang={lang} setRoute={setRoute} />
                        ))}
                    </div>

                    <div style={{ marginTop: "2.5rem", display: "flex", justifyContent: "center" }}>
                        <button className="btn btn-ghost" onClick={() => setRoute("portfolio")}>
                            {lang === "ro" ? "Vezi întreg portofoliul" : "Browse the full portfolio"} <Icon.arrow />
                        </button>
                    </div>
                </div>
            </section>

            {/* Process — blue-tinted band (theme-aware) */}
            <section className="section section-tinted-blue" id="process">
                <div className="container">
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "end" }}>
                        <div>
                            <Reveal><div className="kicker">{c.processKicker}</div></Reveal>
                            <Reveal delay={80}>
                                <h2 className="display" style={{ marginTop: "1rem", marginBottom: 0 }}>
                                    {c.processTitle.replace(".", "")}
                                    <span className="ital">.</span>
                                </h2>
                            </Reveal>
                        </div>
                        <Reveal delay={120}><p className="lead" style={{ margin: 0 }}>{c.processBody}</p></Reveal>
                    </div>

                    <div className="process-grid">
                        {c.processSteps.map((s, i) => (
                            <Reveal key={s.k} delay={i * 80}>
                                <div className="process-card">
                                    <span className="step-no">{s.k}</span>
                                    <div className="t">{s.t}</div>
                                    <div className="d">{s.d}</div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials — mute neutral so the white cards pop */}
            <section className="section section-mute" id="testimonials">
                <div className="container">
                    <Reveal><div className="kicker">{c.tsKicker}</div></Reveal>
                    <Reveal delay={80}>
                        <h2 className="display" style={{ marginTop: "1rem", marginBottom: 0 }}>
                            {c.tsTitle.split("\n").map((l, i) => (
                                <Fragment key={i}>
                                    {i === 1 ? (
                                        <>{l.split(" ").map((w, j, arr) => (
                                            <Fragment key={j}>
                                                {j === arr.length - 1 ? <span className="ital-teal">{w}</span> : w}
                                                {j < arr.length - 1 ? " " : ""}
                                            </Fragment>
                                        ))}</>
                                    ) : l}
                                    {i === 0 ? <br /> : null}
                                </Fragment>
                            ))}
                        </h2>
                    </Reveal>

                    <div className="ts-grid">
                        {ts.map((t, i) => (
                            <Reveal key={t.name} delay={i * 60}>
                                <div className="ts-card">
                                    <div className="stars">★★★★★</div>
                                    <p className="quote">&ldquo;{t[lang]}&rdquo;</p>
                                    <div className="who">
                                        <img src={t.img} alt="" loading="lazy" />
                                        <div>
                                            <div className="n">{t.name}</div>
                                            <div className="d">{t.date}</div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Locations — teal-tinted, brand closer */}
            <section className="section section-tinted" id="locations-strip">
                <div className="container">
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "end" }}>
                        <div>
                            <Reveal><div className="kicker">{c.locKicker}</div></Reveal>
                            <Reveal delay={80}>
                                <h2 className="display" style={{ marginTop: "1rem", marginBottom: 0 }}>
                                    <SplitTitle text={c.locTitle} highlight="ital" />
                                </h2>
                            </Reveal>
                        </div>
                        <Reveal delay={120}>
                            <p className="lead" style={{ margin: 0 }}>
                                {lang === "ro"
                                    ? "Studio principal în Timișoara — dar lucrăm cu plăcere oriunde povestea ne cheamă."
                                    : "Main studio in Timișoara — but we happily travel wherever the story takes us."}
                            </p>
                        </Reveal>
                    </div>

                    <div className="loc-grid">
                        {locs.map((loc) => (
                            <div key={loc.slug}
                                className={`loc-cell ${loc.base ? "base" : ""}`}
                                onClick={() => setRoute("locations")}
                                style={{ cursor: "pointer" }}>
                                {loc.base && <span className="badge">{lang === "ro" ? "Bază · Studio" : "Home base · Studio"}</span>}
                                <span className="n">{loc.name}</span>
                                <span className="g">{loc.tag[lang]} · {loc.geo}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

// Shared work-row (home teaser + portfolio index)
function WorkRow({
    cat,
    lang,
    setRoute,
}: {
    cat: (typeof CATEGORIES)[number];
    lang: Lang;
    setRoute: SetRoute;
}) {
    return (
        <div
            className={`work-row ${cat.accent === "teal" ? "teal" : ""}`}
            onClick={() => setRoute(`portfolio/${cat.id}`)}
            role="button" tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setRoute(`portfolio/${cat.id}`)}>
            <span className="num">{cat.no}</span>
            <div className="name">
                {cat[lang].name.split(" ").map((w, idx, arr) => (
                    <Fragment key={idx}>
                        {idx === arr.length - 1 ? <span className="italize">{w}</span> : w}
                        {idx < arr.length - 1 ? " " : ""}
                    </Fragment>
                ))}
            </div>
            <div className="tag-text">{cat[lang].tag}</div>
            <div className="meta-right">
                <span>{cat[lang].count}</span>
                <Icon.arrow />
            </div>
            <div className="thumb"><img src={cat.cover} alt={cat[lang].name} loading="lazy" /></div>
        </div>
    );
}

// ============================================================
// ABOUT (standalone, richer than the home section)
// ============================================================
export function AboutPage({ lang }: { lang: Lang; setRoute: SetRoute }) {
    const c = COPY[lang];
    const team = TEAM;
    return (
        <div className="page">
            <section className="page-hero">
                <div className="container">
                    <div className="kicker">{c.aboutKicker}</div>
                    <h1 className="page-title" style={{ whiteSpace: "pre-line" }}>
                        <SplitTitle text={c.aboutTitle} highlight="ital-teal" />
                    </h1>
                    <p className="page-sub" style={{ maxWidth: "64ch" }}>{c.aboutLead}</p>
                </div>
            </section>

            <section className="section-tight">
                <div className="container">
                    <div style={{ maxWidth: "720px" }}>
                        <p className="body" style={{ marginTop: 0, fontSize: "1.05rem", lineHeight: 1.65 }}>{c.aboutBody}</p>
                        <div className="about-list">
                            <div className="row">
                                <span className="num">A1</span>
                                <span>{lang === "ro" ? "Sediu studio" : "Studio HQ"}</span>
                                <span className="v">Timișoara · RO</span>
                            </div>
                            <div className="row">
                                <span className="num">A2</span>
                                <span>{lang === "ro" ? "Activitate din" : "Active since"}</span>
                                <span className="v">2022</span>
                            </div>
                            <div className="row">
                                <span className="num">A3</span>
                                <span>{lang === "ro" ? "Echipa" : "Team"}</span>
                                <span className="v">2 {lang === "ro" ? "oameni" : "people"}</span>
                            </div>
                            <div className="row">
                                <span className="num">A4</span>
                                <span>{lang === "ro" ? "Termen mediu de livrare" : "Avg. delivery"}</span>
                                <span className="v">10 {lang === "ro" ? "zile" : "days"}</span>
                            </div>
                            <div className="row">
                                <span className="num">A5</span>
                                <span>{lang === "ro" ? "Echipament" : "Gear"}</span>
                                <span className="v">Sony · DJI · Profoto</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-tight section-soft">
                <div className="container">
                    <div className="kicker" style={{ marginBottom: "1rem" }}>{lang === "ro" ? "Echipa" : "The team"}</div>
                    <div className="team-grid" style={{ marginTop: "1.5rem" }}>
                        {team.map((m, i) => (
                            <TeamCard key={m.first} member={m} idx={i} total={team.length} lang={lang} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

// ============================================================
// PORTFOLIO INDEX
// ============================================================
export function PortfolioIndex({ lang, setRoute }: { lang: Lang; setRoute: SetRoute }) {
    const c = COPY[lang];
    const cats = CATEGORIES;
    return (
        <div className="page">
            <section className="page-hero">
                <div className="container">
                    <div className="kicker">02 · {c.nav.work}</div>
                    <h1 className="page-title">
                        {c.portfolioTitle.split("").map((ch, i) => (
                            <Fragment key={i}>{i === c.portfolioTitle.length - 1 ? <span className="ital">{ch}</span> : ch}</Fragment>
                        ))}
                    </h1>
                    <p className="page-sub">{c.portfolioSub}</p>
                </div>
            </section>

            <section className="section-tight">
                <div className="container">
                    <div className="work-list" style={{ marginTop: 0 }}>
                        {cats.map((cat) => (
                            <WorkRow key={cat.id} cat={cat} lang={lang} setRoute={setRoute} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

// ============================================================
// CATEGORY (masonry + lightbox)
// ============================================================
export function Category({ lang, slug, setRoute }: { lang: Lang; slug: string; setRoute: SetRoute }) {
    const c = COPY[lang];
    const cats = CATEGORIES;
    const cat = cats.find((x) => x.id === slug) || cats[0];
    const [activeFilter, setActiveFilter] = useState(slug);
    const [lbIdx, setLbIdx] = useState<number | null>(null);

    const photos = useMemo(() => {
        if (activeFilter === "all") {
            return cats.flatMap((x) => x.photos.map((p) => ({ src: p, catId: x.id })));
        }
        const f = cats.find((x) => x.id === activeFilter) || cats[0];
        return f.photos.map((p) => ({ src: p, catId: f.id }));
    }, [activeFilter, cats]);

    return (
        <div className="page">
            <section className="page-hero">
                <div className="container">
                    <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
                        <button onClick={() => setRoute("portfolio")}
                            className="mono-sm"
                            style={{ color: "var(--fg-mute)", textTransform: "uppercase", letterSpacing: ".08em", display: "inline-flex", alignItems: "center", gap: ".4rem" }}>
                            <Icon.chevL /> {c.portfolioTitle}
                        </button>
                        <span style={{ color: "var(--line-strong)" }}>·</span>
                        <span className="mono-sm" style={{ color: "var(--fg-mute)", textTransform: "uppercase", letterSpacing: ".08em" }}>{cat.no}</span>
                    </div>
                    <h1 className="page-title" style={{ marginTop: "1.25rem" }}>
                        {cat[lang].name.split(" ").map((w, i, arr) => (
                            <Fragment key={i}>
                                {i === arr.length - 1
                                    ? <span className={cat.accent === "teal" ? "ital-teal" : "ital"}>{w}</span>
                                    : w}
                                {i < arr.length - 1 ? " " : ""}
                            </Fragment>
                        ))}
                    </h1>
                    <p className="page-sub">{cat[lang].tag}. <span style={{ color: "var(--fg-mute)" }}>{cat[lang].count}.</span></p>
                </div>
            </section>

            <div className="container">
                <div className="filter-bar">
                    <span className="label">{c.galleryFilter}</span>
                    <button className={`filter-chip ${activeFilter === "all" ? "on" : ""}`} onClick={() => setActiveFilter("all")}>
                        {c.galleryAll} <span className="c">{cats.reduce((a, x) => a + x.photos.length, 0)}</span>
                    </button>
                    {cats.map((x) => (
                        <button key={x.id} className={`filter-chip ${activeFilter === x.id ? "on" : ""}`} onClick={() => setActiveFilter(x.id)}>
                            {x[lang].name} <span className="c">{x.photos.length}</span>
                        </button>
                    ))}
                </div>
            </div>

            <section className="section-tight" style={{ paddingTop: 0 }}>
                <div className="container">
                    <div className="masonry" data-cols={GRID_COLS} data-grid={GRID_STYLE}>
                        {photos.map((p, i) => (
                            <div key={p.src + i} className="m-item" onClick={() => setLbIdx(i)}>
                                <img src={p.src} alt="" loading="lazy" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {lbIdx !== null && (
                <Lightbox
                    photos={photos.map((p) => p.src)}
                    index={lbIdx}
                    onClose={() => setLbIdx(null)}
                    onNext={() => setLbIdx((i) => ((i ?? 0) + 1) % photos.length)}
                    onPrev={() => setLbIdx((i) => ((i ?? 0) - 1 + photos.length) % photos.length)}
                    lang={lang}
                />
            )}
        </div>
    );
}

// ============================================================
// LOCATIONS
// ============================================================
export function Locations({ lang, setRoute }: { lang: Lang; setRoute: SetRoute }) {
    const c = COPY[lang];
    const locs = LOCATIONS;
    return (
        <div className="page">
            <section className="page-hero">
                <div className="container">
                    <div className="kicker">05 · {c.nav.locations}</div>
                    <h1 className="page-title">
                        {c.locationsTitle.split(" ").map((w, i, arr) => (
                            <Fragment key={i}>
                                {i === arr.length - 1 ? <span className="ital">{w}</span> : w}
                                {i < arr.length - 1 ? " " : ""}
                            </Fragment>
                        ))}
                    </h1>
                    <p className="page-sub">{c.locationsSub}</p>
                </div>
            </section>

            <section className="section-tight">
                <div className="container">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1rem" }}>
                        {locs.map((loc) => (
                            <div key={loc.slug}
                                style={{ border: "1px solid var(--line)", borderRadius: "var(--radius)", overflow: "hidden", background: "var(--bg-soft)", display: "grid", gridTemplateRows: "auto 1fr" }}>
                                <div style={{ aspectRatio: "16/10", background: "var(--bg-mute)", overflow: "hidden" }}>
                                    <img src={loc.img} alt={loc.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(.92)" }} />
                                </div>
                                <div style={{ padding: "1.25rem 1.3rem 1.5rem", display: "grid", gap: ".5rem" }}>
                                    {loc.base && <span className="mono-sm" style={{ color: "var(--accent-2)", textTransform: "uppercase", letterSpacing: ".06em" }}>{lang === "ro" ? "Bază · Studio" : "Home base · Studio"}</span>}
                                    <h3 className="h3" style={{ margin: 0 }}>{loc.name}</h3>
                                    <p className="mono-sm" style={{ margin: 0, color: "var(--fg-mute)" }}>{loc.tag[lang]} · {loc.geo}</p>
                                    <a href="#contact" onClick={(e) => { e.preventDefault(); setRoute("contact"); }}
                                        style={{ marginTop: ".75rem", display: "inline-flex", alignItems: "center", gap: ".4rem", fontSize: ".9rem", color: "var(--accent)", fontWeight: 500 }}>
                                        {lang === "ro" ? "Solicită aici" : "Request here"} <Icon.arrow />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

// ============================================================
// CONTACT
// ============================================================
export function Contact({ lang, onSubmitted }: { lang: Lang; onSubmitted: () => void }) {
    const c = COPY[lang];
    const [proj, setProj] = useState("majorate");
    return (
        <div className="page">
            <section className="page-hero">
                <div className="container">
                    <div className="kicker">{c.contactKicker}</div>
                    <h1 className="page-title" style={{ whiteSpace: "pre-line" }}>
                        <SplitTitle text={c.contactTitle} highlight="ital-teal" />
                    </h1>
                    <p className="page-sub">{c.contactLead}</p>
                </div>
            </section>

            <section className="section-tight">
                <div className="container">
                    <div className="contact-grid">
                        <div className="contact-info">
                            <div className="block">
                                <span className="k">Email</span>
                                <a href="mailto:contact@vestvisuals.ro" className="v big">contact@vestvisuals.ro</a>
                            </div>
                            <div className="block">
                                <span className="k">{lang === "ro" ? "Telefon" : "Phone"}</span>
                                <a href="tel:+40700000000" className="v big">+40 700 000 000</a>
                            </div>
                            <div className="block">
                                <span className="k">Instagram</span>
                                <a href="https://instagram.com/vestvisuals.ro" className="v" target="_blank" rel="noreferrer">@vestvisuals.ro</a>
                            </div>
                            <div className="block">
                                <span className="k">{lang === "ro" ? "Studio" : "Studio"}</span>
                                <span className="v">Timișoara, România</span>
                                <span className="mono-sm" style={{ color: "var(--fg-mute)", marginTop: ".25rem" }}>45.7489°N · 21.2087°E</span>
                            </div>
                            <div className="block">
                                <span className="k">{lang === "ro" ? "Răspuns" : "Reply time"}</span>
                                <span className="v">{lang === "ro" ? "Sub 24h, garantat" : "Under 24h, guaranteed"}</span>
                            </div>
                        </div>

                        <form className="form" onSubmit={(e) => { e.preventDefault(); onSubmitted(); }}>
                            <div className="field-row">
                                <div className="field">
                                    <label>{c.formName}</label>
                                    <input type="text" required placeholder={lang === "ro" ? "Maria Popescu" : "Mary Smith"} />
                                </div>
                                <div className="field">
                                    <label>{c.formEmail}</label>
                                    <input type="email" required placeholder="maria@email.com" />
                                </div>
                            </div>
                            <div className="field-row">
                                <div className="field">
                                    <label>{c.formPhone}</label>
                                    <input type="tel" placeholder="+40 700 000 000" />
                                </div>
                                <div className="field">
                                    <label>{c.formDate}</label>
                                    <input type="date" />
                                </div>
                            </div>
                            <div className="field">
                                <label>{c.formType}</label>
                                <select value={proj} onChange={(e) => setProj(e.target.value)}>
                                    {CATEGORIES.map((x) => <option key={x.id} value={x.id}>{x[lang].name}</option>)}
                                    <option value="other">{lang === "ro" ? "Altceva" : "Something else"}</option>
                                </select>
                            </div>
                            <div className="field">
                                <label>{c.formMsg}</label>
                                <textarea rows={4} placeholder={lang === "ro" ? "Spune-ne câteva cuvinte despre proiect…" : "Tell us a bit about the project…"} />
                            </div>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: ".5rem", flexWrap: "wrap", gap: "1rem" }}>
                                <span className="mono-sm" style={{ color: "var(--fg-mute)" }}>{c.formNote}</span>
                                <button type="submit" className="btn btn-primary">{c.formSend} <Icon.arrow /></button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
