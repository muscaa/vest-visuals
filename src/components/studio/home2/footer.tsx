// Footer — follows theme. Ported from ui.jsx.

import { COPY, CATEGORIES, type Lang } from "./data";

export function Footer({
    lang,
    setRoute,
}: {
    lang: Lang;
    setRoute: (r: string) => void;
}) {
    const c = COPY[lang];
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-cta">
                    <h2>
                        {lang === "ro" ? (
                            <>Hai să facem ceva <span className="em">frumos</span> împreună.</>
                        ) : (
                            <>Let’s make something <span className="em">good</span> together.</>
                        )}
                    </h2>
                    <a href="#contact" onClick={(e) => { e.preventDefault(); setRoute("contact"); }}
                        className="cta-link">
                        {c.footerCta}
                        <span className="arrow-big">→</span>
                    </a>
                </div>
                <div className="footer-grid">
                    <div className="footer-col">
                        <h4>Studio</h4>
                        <p style={{ maxWidth: "32ch", lineHeight: 1.55, fontSize: ".95rem", color: "var(--fg-soft)" }}>
                            {lang === "ro"
                                ? "Vest Visuals — studio foto-video în Timișoara. Lucrăm cu pasiune, livrăm la timp."
                                : "Vest Visuals — photo-video studio in Timișoara. We work with passion and deliver on time."}
                        </p>
                        <p style={{ color: "var(--fg-mute)", fontFamily: "var(--font-mono)", fontSize: ".72rem", marginTop: "1rem", letterSpacing: ".04em" }}>
                            45.7489°N · 21.2087°E
                        </p>
                    </div>
                    <div className="footer-col">
                        <h4>{lang === "ro" ? "Navigare" : "Navigate"}</h4>
                        <a href="#home" onClick={(e) => { e.preventDefault(); setRoute("home"); }}>{c.nav.home}</a>
                        <a href="#about" onClick={(e) => { e.preventDefault(); setRoute("about"); }}>{c.nav.about}</a>
                        <a href="#portfolio" onClick={(e) => { e.preventDefault(); setRoute("portfolio"); }}>{c.nav.work}</a>
                        <a href="#locations" onClick={(e) => { e.preventDefault(); setRoute("locations"); }}>{c.nav.locations}</a>
                        <a href="#contact" onClick={(e) => { e.preventDefault(); setRoute("contact"); }}>{c.nav.contact}</a>
                    </div>
                    <div className="footer-col">
                        <h4>{lang === "ro" ? "Categorii" : "Categories"}</h4>
                        {CATEGORIES.map((cat) => (
                            <a key={cat.id} href={`#portfolio/${cat.id}`}
                                onClick={(e) => { e.preventDefault(); setRoute(`portfolio/${cat.id}`); }}>
                                {cat[lang].name}
                            </a>
                        ))}
                    </div>
                    <div className="footer-col">
                        <h4>{lang === "ro" ? "Contact" : "Get in touch"}</h4>
                        <a href="mailto:contact@vestvisuals.ro">contact@vestvisuals.ro</a>
                        <a href="tel:+40700000000">+40 700 000 000</a>
                        <a href="https://instagram.com/vestvisuals.ro" target="_blank" rel="noreferrer">@vestvisuals.ro</a>
                        <p style={{ color: "var(--fg-mute)", fontFamily: "var(--font-mono)", fontSize: ".72rem", marginTop: "1rem", letterSpacing: ".04em", textTransform: "uppercase" }}>
                            Mon–Sun · 09:00–22:00
                        </p>
                    </div>
                </div>

                <div className="footer-mark" aria-hidden="true">VEST · VISUALS</div>

                <div className="footer-bottom">
                    <span>© 2026 VEST VISUALS · MADE IN TIMIȘOARA</span>
                    <span>{lang === "ro" ? "Termeni · Confidențialitate" : "Terms · Privacy"}</span>
                </div>
            </div>
        </footer>
    );
}
