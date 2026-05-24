// Top nav — route links, language toggle, theme toggle. Ported from ui.jsx.

import { COPY, type Lang } from "./data";
import { Icon } from "./icons";

type Theme = "light" | "dark";

export function Nav({
    route,
    setRoute,
    lang,
    setLang,
    theme,
    setTheme,
}: {
    route: string;
    setRoute: (r: string) => void;
    lang: Lang;
    setLang: (l: Lang) => void;
    theme: Theme;
    setTheme: (t: Theme) => void;
}) {
    const c = COPY[lang];
    const items = [
        { id: "home", label: c.nav.home },
        { id: "about", label: c.nav.about },
        { id: "portfolio", label: c.nav.work },
        { id: "locations", label: c.nav.locations },
        { id: "contact", label: c.nav.contact },
    ];
    const activeId = route.split("/")[0];
    return (
        <div className="nav-wrap">
            <div className="container">
                <nav className="nav">
                    <a className="brand" onClick={(e) => { e.preventDefault(); setRoute("home"); }} href="#">
                        <span className="brand-mark">V</span>
                        <span>Vest<span style={{ color: "var(--accent)" }}>·</span>Visuals</span>
                    </a>
                    <div className="nav-links">
                        {items.map((it) => (
                            <a key={it.id} href={`#${it.id}`}
                                className={`nav-link ${activeId === it.id ? "active" : ""}`}
                                onClick={(e) => { e.preventDefault(); setRoute(it.id); }}>
                                {it.label}
                            </a>
                        ))}
                    </div>
                    <div className="nav-utility">
                        <div className="lang-toggle" role="group" aria-label="Language">
                            <button className={lang === "ro" ? "on" : ""} onClick={() => setLang("ro")}>RO</button>
                            <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
                        </div>
                        <button className="icon-btn"
                            aria-label="Toggle theme"
                            onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                            {theme === "light" ? <Icon.moon /> : <Icon.sun />}
                        </button>
                        <button className="btn btn-primary btn-sm"
                            onClick={() => setRoute("contact")}>
                            {lang === "ro" ? "Începe" : "Start"}
                            <Icon.arrow />
                        </button>
                    </div>
                </nav>
            </div>
        </div>
    );
}
