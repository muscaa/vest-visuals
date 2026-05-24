"use client";

// Animated stats counters.

import { useEffect, useRef, useState } from "react";

export function Stats() {
    const stats = [
        { v: 11, suffix: "", label: "Products shipped", sub: "since 2019" },
        { v: 96, suffix: "%", label: "On-time delivery", sub: "last 24 months" },
        { v: 72, suffix: "", label: "NPS score", sub: "client survey" },
        { v: 5.2, suffix: "y", label: "Avg. client tenure", sub: "we stay long" },
    ];

    return (
        <section className="section section--tight" id="stats">
            <div className="wrap">
                <div className="stats">
                    {stats.map((s, i) => (
                        <Stat key={i} {...s} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function Stat({
    v,
    suffix,
    label,
    sub,
}: {
    v: number;
    suffix: string;
    label: string;
    sub: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [val, setVal] = useState(0);
    useEffect(() => {
        let started = false;
        const start = () => {
            if (started) return;
            started = true;
            const dur = 1400;
            const t0 = performance.now();
            const tick = (t: number) => {
                const k = Math.min(1, (t - t0) / dur);
                const e = 1 - Math.pow(1 - k, 3);
                setVal(v * e);
                if (k < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        };
        const rect = ref.current && ref.current.getBoundingClientRect();
        if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
            start();
        }
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => { if (e.isIntersecting) start(); });
        }, { threshold: 0.2 });
        if (ref.current) io.observe(ref.current);
        return () => io.disconnect();
    }, [v]);

    const display = Number.isInteger(v) ? Math.round(val) : val.toFixed(1);
    return (
        <div className="stat" ref={ref}>
            <div className="stat__big">
                {display}<small>{suffix}</small>
            </div>
            <div className="stat__label">{label} &nbsp;·&nbsp; <span style={{ textTransform: "none", color: "var(--fg-faint)" }}>{sub}</span></div>
        </div>
    );
}
