"use client";

/* Vest Visuals — software landing.
   1:1 port of the Claude Design handoff (app.jsx). The TweaksPanel
   was a design-tool affordance; its defaults are baked in (royal
   palette = --color1, regular density, grid hero, all sections on).
   Real interactions kept: nav theme toggle, sticky-scroll state,
   smooth-scroll anchors, FAQ accordion, email capture, canvas hero. */

import {
    useEffect,
    useRef,
    useState,
    type ReactNode,
} from "react";
import { HeroCanvas, type HeroVariant } from "./hero-canvas";
import { ImageSlot } from "./image-slot";

const HERO_VARIANT: HeroVariant = "grid";

const SVC_ICONS: Record<string, ReactNode> = {
    web: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="3" y="4" width="18" height="14" rx="2" />
            <path d="M3 8h18M7 12h6" />
        </svg>
    ),
    mobile: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
            <path d="M11 18.5h2" />
        </svg>
    ),
    ai: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
            <circle cx="12" cy="12" r="3.5" />
        </svg>
    ),
    cloud: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M7 18a4 4 0 1 1 .8-7.9A6 6 0 0 1 19 12a4 4 0 0 1-.5 8H7Z" />
        </svg>
    ),
    mvp: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M4.5 14.5C4.5 9 8 4.5 14.5 4.5 19 4.5 19.5 5 19.5 9.5 19.5 16 15 19.5 9.5 19.5 5 19.5 4.5 19 4.5 14.5Z" />
            <path d="m9 15 1.5-3.5L14 10M9 15l-3 3M14 10l3-3" />
        </svg>
    ),
};

const SERVICES = [
    { key: "web", num: "01", title: "Custom web apps", desc: "Production-grade interfaces, design systems, and full-stack apps that grow with your business.", tags: ["React", "Next.js", "TypeScript", "tRPC"] },
    { key: "mobile", num: "02", title: "Mobile apps", desc: "Native-feeling iOS and Android experiences from one cross-platform codebase, shipped fast.", tags: ["React Native", "Expo", "Swift", "Kotlin"] },
    { key: "ai", num: "03", title: "AI & ML integration", desc: "Pragmatic AI features — RAG, agents, evals — wired into your product, not pasted on top.", tags: ["OpenAI", "Claude", "pgvector", "Modal"] },
    { key: "cloud", num: "04", title: "Cloud, DevOps & infra", desc: "Boring, reliable infrastructure. CI/CD, observability, IaC, and platform engineering done right.", tags: ["AWS", "Terraform", "Kubernetes", "GitHub Actions"] },
    { key: "mvp", num: "05", title: "MVPs for startups", desc: "From back-of-napkin to in users’ hands in weeks, not quarters. Validated, measurable, real.", tags: ["Sprints", "Prototyping", "Analytics", "Iteration"] },
    { key: "platform", num: "06", title: "Platform & API design", desc: "Internal tools and developer platforms that engineers actually want to use — fast, typed, documented.", tags: ["GraphQL", "REST", "SDKs", "OpenAPI"] },
];

const PROCESS = [
    { n: "01", title: "Discover", desc: "We map the problem, talk to your users, and pressure-test assumptions before a single line of code.", meta: "WEEK 1 — 2" },
    { n: "02", title: "Design", desc: "High-fidelity prototypes you can click. Real flows, real edge cases, real decisions.", meta: "WEEK 2 — 4" },
    { n: "03", title: "Build", desc: "Tight weekly cycles. You see working software every Friday. Roadmap is yours, momentum is ours.", meta: "WEEK 4 — 14" },
    { n: "04", title: "Ship & support", desc: "We launch with you, then stay on as a retained partner — measuring, improving, scaling.", meta: "ONGOING" },
];

const CASES = [
    { num: "01", client: "Northwind Robotics", sector: "INDUSTRIAL AI", title: "A fleet console pilots love", desc: "Designed and built the operator interface for a 4,000-unit autonomous warehouse fleet.", results: [["+38%", "throughput"], ["-62%", "incidents"]] },
    { num: "02", client: "Lumen Therapeutics", sector: "HEALTHCARE", title: "From spreadsheets to a real platform", desc: "Replaced a tangle of Excel and email with a HIPAA-grade clinical trial workspace.", results: [["3 mo.", "to launch"], ["$2.4M", "ARR yr 1"]] },
    { num: "03", client: "Parallel Finance", sector: "FINTECH", title: "Treasury that traders trust", desc: "A real-time treasury cockpit with role-based controls, audit logs, and sub-100ms latency.", results: [["<100ms", "p99"], ["SOC 2", "ready"]] },
    { num: "04", client: "Field Labs", sector: "CLIMATE", title: "Sensor data, made human", desc: "An offline-first mobile app for agronomists, syncing 14M soil readings a day.", results: [["14M/day", "readings"], ["Offline", "first"]] },
];

const STACK = [
    { label: "FRONTEND", items: ["React", "Next.js", "TypeScript", "Vue", "Svelte", "Tailwind", "Framer Motion"] },
    { label: "BACKEND", items: ["Node.js", "Go", "Python", "Rust", "PostgreSQL", "Redis", "gRPC"] },
    { label: "AI & DATA", items: ["Claude", "OpenAI", "LangChain", "pgvector", "Modal", "Replicate", "DBT"] },
    { label: "INFRA", items: ["AWS", "GCP", "Vercel", "Kubernetes", "Terraform", "GitHub Actions", "Datadog"] },
];

const TESTS = [
    { quote: "Vest shipped in six weeks what our last vendor couldn’t in nine months. The bar they set internally became our bar.", name: "Maya Okafor", role: "CTO, Northwind Robotics", initials: "MO" },
    { quote: "They’re the rare team that takes design and engineering seriously — in the same room, on the same Slack thread, every day.", name: "Daniel Reyes", role: "Head of Product, Lumen", initials: "DR" },
    { quote: "We hired them for an MVP. Eighteen months later they’re still our partner because nobody else operates at this level.", name: "Priya Shah", role: "Founder & CEO, Parallel", initials: "PS" },
];

const FAQS = [
    { q: "How are engagements structured?", a: "Most projects start with a two-week paid discovery sprint to align on scope, design, and architecture. From there we move into fixed-scope build phases (typically 6–14 weeks) or a retained team model billed monthly. No long lock-ins, no minimum-bench commitments." },
    { q: "What does a typical team look like?", a: "A senior product designer, two to three engineers (one of whom is a tech lead), and a delivery lead who owns scope, demos, and weekly comms. We deliberately stay small — we’d rather ship faster with fewer, better people." },
    { q: "Do you work with non-technical founders?", a: "Often. We treat the founder as the product owner and translate vision into technical decisions you can stand behind. You’ll always understand what we’re building and why." },
    { q: "Will we own the code?", a: "Yes — everything we build lives in your GitHub org, with documentation, runbooks, and CI/CD set up from day one. You can take the codebase in-house at any point and we’ll help with the handoff." },
    { q: "What are your rates?", a: "Engagements typically run $40k–$120k/month depending on team size and shape. We’ll share a detailed proposal after the first discovery call — fixed-price options available for well-defined scopes." },
    { q: "Are you taking new work in 2026?", a: "Yes. We onboard 1–2 new clients per quarter to keep quality high. The next available start is in roughly 4 weeks; longer for complex regulated builds." },
];

const NAV_LINKS = [
    { id: "services", label: "Services" },
    { id: "work", label: "Work" },
    { id: "process", label: "Process" },
    { id: "stack", label: "Stack" },
    { id: "faq", label: "FAQ" },
];

function ThemeToggle({
    dark,
    onToggle,
}: {
    dark: boolean;
    onToggle: () => void;
}) {
    return (
        <button
            className="theme-toggle"
            onClick={onToggle}
            aria-label="Toggle theme"
        >
            {dark ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
            ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
                </svg>
            )}
        </button>
    );
}

function Nav({
    dark,
    scrolled,
    onToggleTheme,
}: {
    dark: boolean;
    scrolled: boolean;
    onToggleTheme: () => void;
}) {
    return (
        <nav className={`nav${scrolled ? " is-scrolled" : ""}`}>
            <div className="nav-inner">
                <a href="#top" className="brand">
                    <span className="brand-mark" />
                    <span>Vest Visuals</span>
                </a>
                <div className="nav-links">
                    {NAV_LINKS.map((l) => (
                        <a key={l.id} href={`#${l.id}`} className="nav-link">
                            {l.label}
                        </a>
                    ))}
                </div>
                <div className="nav-cta">
                    <ThemeToggle dark={dark} onToggle={onToggleTheme} />
                    <a href="#contact" className="btn btn-primary btn-sm">
                        Start a project <span className="arr">→</span>
                    </a>
                </div>
            </div>
        </nav>
    );
}

function Hero({ dark }: { dark: boolean }) {
    const accent = dark ? "#8AA5F0" : "#4B71D8";
    return (
        <header className="hero" id="top">
            <div className="hero-canvas-wrap">
                <HeroCanvas variant={HERO_VARIANT} accent={accent} dark={dark} />
            </div>
            <div className="hero-inner">
                <div className="hero-badge">
                    <span className="dot" />
                    <span>Booking Q3 2026 — 2 spots</span>
                </div>
                <h1>
                    Software that feels
                    <br />
                    like it was <em>made</em> for you.
                </h1>
                <p className="hero-sub">
                    Vest Visuals is a design-led product studio. We partner
                    with founders and operators to turn ambitious ideas into
                    software people genuinely want to use.
                </p>
                <div className="hero-ctas">
                    <a href="#contact" className="btn btn-primary">
                        Start a project <span className="arr">→</span>
                    </a>
                    <a href="#work" className="btn btn-ghost">
                        See our work
                    </a>
                </div>
                <div className="hero-meta">
                    <div className="stat">
                        <span className="stat-n">11 yrs</span>
                        <span className="stat-l">In business</span>
                    </div>
                    <div className="stat">
                        <span className="stat-n">42</span>
                        <span className="stat-l">Products shipped</span>
                    </div>
                    <div className="stat">
                        <span className="stat-n">$180M+</span>
                        <span className="stat-l">Raised by clients</span>
                    </div>
                    <div className="stat">
                        <span className="stat-n">96%</span>
                        <span className="stat-l">Retention</span>
                    </div>
                </div>
            </div>
        </header>
    );
}

function Logos() {
    return (
        <section className="logos">
            <div className="container">
                <div className="logos-label">Trusted by teams at</div>
                <div className="logos-grid">
                    <div className="logo-cell">Northwind</div>
                    <div className="logo-cell">
                        <span className="serif">Lumen</span>
                    </div>
                    <div className="logo-cell">
                        <span className="mono">PARALLEL/</span>
                    </div>
                    <div className="logo-cell">Field Labs</div>
                    <div className="logo-cell">Orbital</div>
                    <div className="logo-cell">
                        <span className="serif">Meridian</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Services() {
    return (
        <section className="section" id="services">
            <div className="container">
                <div className="section-head">
                    <div>
                        <span className="eyebrow">Services</span>
                        <h2 className="section-title">
                            What we <em>do</em>, end to end.
                        </h2>
                    </div>
                    <p className="section-lead">
                        We embed with your team as a single, senior pod —
                        design, engineering, and product decisions made in one
                        room. No handoffs, no thrash.
                    </p>
                </div>
                <div className="services-grid">
                    {SERVICES.map((s) => (
                        <div className="service" key={s.key}>
                            <div className="service-head">
                                <span className="service-num">
                                    {s.num} / 06
                                </span>
                                <span className="service-icon">
                                    {SVC_ICONS[s.key] || SVC_ICONS.web}
                                </span>
                            </div>
                            <h3>{s.title}</h3>
                            <p>{s.desc}</p>
                            <div className="service-tags">
                                {s.tags.map((t) => (
                                    <span className="tag" key={t}>
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Cases() {
    return (
        <section className="section" id="work">
            <div className="container">
                <div className="section-head">
                    <div>
                        <span className="eyebrow">Selected work</span>
                        <h2 className="section-title">
                            A few things we&rsquo;ve <em>shipped</em>.
                        </h2>
                    </div>
                    <p className="section-lead">
                        We can&rsquo;t show all of it — much lives behind NDAs
                        — but here&rsquo;s a slice of the work we&rsquo;re
                        proudest of from the last 18 months.
                    </p>
                </div>
                <div className="cases-grid">
                    {CASES.map((c) => (
                        <article className="case" key={c.num}>
                            <div className="case-img">
                                <ImageSlot
                                    placeholder={`${c.client} — drop a screenshot`}
                                />
                            </div>
                            <div className="case-meta">
                                <span>
                                    {c.num} · {c.client}
                                </span>
                                <span>{c.sector}</span>
                            </div>
                            <h3>{c.title}</h3>
                            <p>{c.desc}</p>
                            <div className="results">
                                {c.results.map(([nn, l]) => (
                                    <div key={l}>
                                        <b>{nn}</b> · {l}
                                    </div>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Process() {
    return (
        <section className="section" id="process">
            <div className="container">
                <div className="section-head">
                    <div>
                        <span className="eyebrow">Process</span>
                        <h2 className="section-title">
                            A small team, moving in <em>tight</em> cycles.
                        </h2>
                    </div>
                    <p className="section-lead">
                        One pod, four phases, weekly demos. You&rsquo;ll never
                        wonder what we&rsquo;re working on or what comes next.
                    </p>
                </div>
                <div className="process-list">
                    {PROCESS.map((p) => (
                        <div className="process-row" key={p.n}>
                            <div className="process-num">{p.n}</div>
                            <h4>{p.title}</h4>
                            <p className="desc">{p.desc}</p>
                            <div className="meta">{p.meta}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Stack() {
    return (
        <section className="section" id="stack">
            <div className="container">
                <div className="stack">
                    <div className="stack-side">
                        <span className="eyebrow">Stack</span>
                        <h2
                            className="section-title"
                            style={{ fontSize: "clamp(32px, 3.5vw, 48px)" }}
                        >
                            Tools we <em>reach</em> for.
                        </h2>
                        <p
                            className="section-lead"
                            style={{ marginTop: 16 }}
                        >
                            We&rsquo;re unromantic about technology. The stack
                            serves the product — never the other way around.
                        </p>
                    </div>
                    <div className="stack-categories">
                        {STACK.map((cat) => (
                            <div className="stack-cat" key={cat.label}>
                                <div className="stack-cat-label">
                                    {cat.label}
                                </div>
                                <div className="stack-items">
                                    {cat.items.map((it) => (
                                        <span className="stack-item" key={it}>
                                            {it}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function Testimonials() {
    return (
        <section className="section" id="testimonials">
            <div className="container">
                <div className="section-head">
                    <div>
                        <span className="eyebrow">Testimonials</span>
                        <h2 className="section-title">
                            What partners <em>say</em>.
                        </h2>
                    </div>
                    <p className="section-lead">
                        We measure ourselves by long relationships and what
                        gets shipped — not awards.
                    </p>
                </div>
                <div className="tests-grid">
                    {TESTS.map((t, i) => (
                        <div className="test" key={i}>
                            <p className="test-quote">{t.quote}</p>
                            <div className="test-author">
                                <div className="test-avatar">
                                    {t.initials}
                                </div>
                                <div>
                                    <div className="test-name">{t.name}</div>
                                    <div className="test-role">{t.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function FAQ() {
    const [open, setOpen] = useState(0);
    return (
        <section className="section" id="faq">
            <div className="container">
                <div className="section-head">
                    <div>
                        <span className="eyebrow">FAQ</span>
                        <h2 className="section-title">
                            Common <em>questions</em>.
                        </h2>
                    </div>
                    <p className="section-lead">
                        Don&rsquo;t see what you&rsquo;re looking for? Drop us
                        a note — happy to talk shop.
                    </p>
                </div>
                <div className="faq-grid">
                    {FAQS.map((f, i) => (
                        <div
                            className={`faq-item${open === i ? " is-open" : ""}`}
                            key={i}
                        >
                            <button
                                className="faq-q"
                                onClick={() =>
                                    setOpen(open === i ? -1 : i)
                                }
                            >
                                <span>{f.q}</span>
                                <span className="faq-toggle">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 5v14M5 12h14" />
                                    </svg>
                                </span>
                            </button>
                            <div className="faq-a">
                                <div className="faq-a-inner">
                                    <div>{f.a}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function CTA() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.includes("@")) return;
        setSent(true);
    };
    return (
        <section className="section cta" id="contact">
            <div className="cta-inner container">
                <span className="eyebrow">Get in touch</span>
                <h2>
                    Have a project in mind?
                    <br />
                    Let&rsquo;s <em>talk</em>.
                </h2>
                <p>
                    Tell us a little about what you&rsquo;re building. We reply
                    within one business day, always from a human.
                </p>
                {sent ? (
                    <div
                        className="btn btn-primary"
                        style={{ cursor: "default" }}
                    >
                        Thanks — we&rsquo;ll be in touch ✓
                    </div>
                ) : (
                    <form className="cta-form" onSubmit={submit}>
                        <input
                            type="email"
                            placeholder="you@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn btn-primary">
                            Send <span className="arr">→</span>
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <div className="brand">
                            <span className="brand-mark" />
                            <span>Vest Visuals</span>
                        </div>
                        <p className="footer-tag">
                            A design-led product studio. We build software
                            that feels considered, fast, and unmistakably
                            yours.
                        </p>
                    </div>
                    <div className="footer-col">
                        <h5>Studio</h5>
                        <ul>
                            <li><a href="#services">Services</a></li>
                            <li><a href="#work">Work</a></li>
                            <li><a href="#process">Process</a></li>
                            <li><a href="#stack">Stack</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h5>Company</h5>
                        <ul>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Journal</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h5>Elsewhere</h5>
                        <ul>
                            <li><a href="#">GitHub</a></li>
                            <li><a href="#">LinkedIn</a></li>
                            <li><a href="#">Read.cv</a></li>
                            <li><a href="#">Email</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bot">
                    <span>© 2026 VEST VISUALS LLC · BROOKLYN / LISBON</span>
                    <span>v3.2.0 · BUILT WITH CARE</span>
                </div>
            </div>
        </footer>
    );
}

export function SoftwareLanding() {
    const [dark, setDark] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const sentinelRef = useRef<HTMLDivElement>(null);

    // Sticky-nav scrolled state — robust to whichever ancestor scrolls.
    useEffect(() => {
        const el = sentinelRef.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([e]) => setScrolled(!e.isIntersecting),
            { threshold: 0, rootMargin: "-8px 0px 0px 0px" },
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    // Smooth-scroll for in-page anchor links.
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
        <div
            ref={rootRef}
            className="vv-soft"
            data-theme={dark ? "dark" : "light"}
            data-density="regular"
        >
            <div ref={sentinelRef} aria-hidden style={{ position: "absolute", top: 0, height: 1, width: 1 }} />
            <Nav
                dark={dark}
                scrolled={scrolled}
                onToggleTheme={() => setDark((d) => !d)}
            />
            <main>
                <Hero dark={dark} />
                <Logos />
                <Services />
                <Cases />
                <Process />
                <Stack />
                <Testimonials />
                <FAQ />
                <CTA />
            </main>
            <Footer />
        </div>
    );
}
