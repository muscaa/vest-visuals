"use client";

/* Vest Visuals — studio redesign (home2).
   1:1 port of the Claude Design handoff (vest-visuals-redesign / app.jsx):
   a bilingual (RO/EN), light/dark, hash-routed clickable prototype —
   home, about, portfolio index, category gallery + lightbox, locations,
   contact. The floating TweaksPanel was a design-tool affordance; its
   defaults are baked in (light theme, RO, density 1, masonry / 3 cols,
   full-bleed hero). Theme + language toggles live in the nav. */

import { useEffect, useState } from "react";
import "./styles.css";
import { type Lang } from "./data";
import { Nav } from "./nav";
import { Footer } from "./footer";
import { Toast } from "./lightbox";
import {
    Home, AboutPage, PortfolioIndex, Category, Locations, Contact,
} from "./pages";

type Theme = "light" | "dark";

export function StudioHome2() {
    const [route, setRoute] = useState("home");
    const [theme, setTheme] = useState<Theme>("light");
    const [lang, setLang] = useState<Lang>("ro");
    const [toast, setToast] = useState<string | null>(null);

    // sync hash <-> route (client only — avoids SSR hydration mismatch)
    useEffect(() => {
        const fromHash = () => location.hash.replace(/^#/, "") || "home";
        setRoute(fromHash());
        const onHash = () => setRoute(fromHash());
        window.addEventListener("hashchange", onHash);
        return () => window.removeEventListener("hashchange", onHash);
    }, []);

    useEffect(() => {
        if (location.hash.replace(/^#/, "") !== route) {
            location.hash = route;
        }
        window.scrollTo({ top: 0, behavior: "auto" });
    }, [route]);

    const parts = route.split("/");
    let pageEl: React.ReactNode;
    if (parts[0] === "about") {
        pageEl = <AboutPage lang={lang} setRoute={setRoute} />;
    } else if (parts[0] === "portfolio" && parts[1]) {
        pageEl = <Category lang={lang} slug={parts[1]} setRoute={setRoute} />;
    } else if (parts[0] === "portfolio") {
        pageEl = <PortfolioIndex lang={lang} setRoute={setRoute} />;
    } else if (parts[0] === "locations") {
        pageEl = <Locations lang={lang} setRoute={setRoute} />;
    } else if (parts[0] === "contact") {
        pageEl = (
            <Contact
                lang={lang}
                onSubmitted={() => setToast(lang === "ro" ? "Cerere trimisă! Răspundem în 24h." : "Sent! We’ll reply within 24h.")}
            />
        );
    } else {
        pageEl = <Home lang={lang} setRoute={setRoute} />;
    }

    return (
        <div className="vv-studio" data-theme={theme}>
            <Nav route={route} setRoute={setRoute} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />
            <main key={route}>{pageEl}</main>
            <Footer lang={lang} setRoute={setRoute} />
            {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
        </div>
    );
}
