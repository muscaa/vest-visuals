"use client";

/* Vest Visuals — software division home.
   1:1 port of the Claude Design handoff (vest-visuals-2 / app.jsx). The
   TweaksPanel was a design-tool affordance; its defaults are baked in
   (comfortable density, blue accent, logo micro-motion). Real interactions
   kept: nav theme toggle (persisted to localStorage), smooth-scroll anchors,
   FAQ accordion (native <details>), the animated hero devices, and the
   contact form. */

import { useEffect, useRef, useState } from "react";
import "./styles.css";
import { Nav } from "./nav";
import { Hero } from "./hero";
import { Services } from "./services";
import { Stats } from "./stats";
import { Projects } from "./projects";
import { Process } from "./process";
import { Stack } from "./stack";
import { About } from "./about";
import { Testimonials } from "./testimonials";
import { Pricing } from "./pricing";
import { FAQ } from "./faq";
import { Contact } from "./contact";
import { Footer } from "./footer";

type Theme = "light" | "dark";

export function SoftwareHome() {
    const rootRef = useRef<HTMLDivElement>(null);
    const [theme, setTheme] = useState<Theme>("light");

    // Hydrate the persisted theme on the client (default light).
    useEffect(() => {
        try {
            const t = localStorage.getItem("vv-theme");
            if (t === "light" || t === "dark") setTheme(t);
        } catch { /* ignore */ }
    }, []);

    useEffect(() => {
        try { localStorage.setItem("vv-theme", theme); } catch { /* ignore */ }
    }, [theme]);

    // Smooth-scroll for in-page anchor links, scoped to this landing.
    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;
        const onClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest<HTMLAnchorElement>('a[href^="#"]');
            if (!link || !root.contains(link)) return;
            const id = link.getAttribute("href")!.slice(1);
            if (!id) return;
            const elx = root.querySelector(`#${CSS.escape(id)}`);
            if (!elx) return;
            e.preventDefault();
            elx.scrollIntoView({ behavior: "smooth", block: "start" });
        };
        root.addEventListener("click", onClick);
        return () => root.removeEventListener("click", onClick);
    }, []);

    return (
        <div ref={rootRef} className="vv-home" data-theme={theme}>
            <Nav theme={theme} setTheme={setTheme} />
            <main>
                <Hero />
                <Services />
                <Stats />
                <Projects />
                <Process />
                <Stack />
                <About />
                <Testimonials />
                <Pricing />
                <FAQ />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}
