// Stack — what we use, what we don't.

import { SectionRule } from "./section-rule";

export function Stack() {
    const weUse = [
        { name: "TypeScript", note: "primary lang" },
        { name: "React + Next.js", note: "web" },
        { name: "Swift / Kotlin", note: "native" },
        { name: "PostgreSQL", note: "always" },
        { name: "Tailwind", note: "design layer" },
        { name: "tRPC + Zod", note: "contracts" },
        { name: "Vercel / Fly.io", note: "infra" },
        { name: "Prisma", note: "ORM" },
        { name: "Sanity / Strapi", note: "content" },
        { name: "Stripe", note: "payments" },
        { name: "Anthropic / OpenAI", note: "models" },
        { name: "pgvector + Modal", note: "retrieval" },
    ];

    const weSkip = [
        { name: "MongoDB for new apps", note: "use Postgres" },
        { name: "Microservices < 50 devs", note: "premature" },
        { name: "GraphQL when tRPC fits", note: "extra layer" },
        { name: "Kubernetes from day one", note: "use PaaS" },
        { name: "Custom auth", note: "use providers" },
        { name: "Redux for everything", note: "use server state" },
    ];

    return (
        <section className="section" id="stack">
            <div className="wrap">
                <SectionRule num="06" tag="Stack" />
                <h2 className="section-title">Boring tech, picked on purpose.</h2>
                <p className="section-sub">
                    We default to the simplest stack that does the job for ten years. Tools should compound, not collect.
                </p>
                <div className="stack">
                    <div className="stack__col">
                        <div className="stack__title">
                            <h3>What we reach for</h3>
                            <span>{weUse.length} tools</span>
                        </div>
                        <ul className="stack__list">
                            {weUse.map((t) => (
                                <li className="stack__item" key={t.name}>
                                    <span>{t.name}</span>
                                    <span className="stack__item-mono">{t.note}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="stack__col">
                        <div className="stack__title">
                            <h3>What we usually skip</h3>
                            <span>{weSkip.length} opinions</span>
                        </div>
                        <ul className="stack__list" style={{ gridTemplateColumns: "1fr" }}>
                            {weSkip.map((t) => (
                                <li className="stack__item" key={t.name} style={{ justifyContent: "space-between" }}>
                                    <span style={{ textDecoration: "line-through", color: "var(--fg-mute)" }}>{t.name}</span>
                                    <span className="stack__item-mono" style={{ color: "var(--color1)" }}>→ {t.note}</span>
                                </li>
                            ))}
                        </ul>

                        <div style={{
                            marginTop: 24,
                            padding: 14,
                            border: "1px dashed var(--line)",
                            borderRadius: 8,
                            fontSize: 13.5,
                            color: "var(--fg-mute)",
                        }}>
                            We do all of these <em>when they&rsquo;re the right answer</em>.
                            The list is about defaults, not dogma.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
