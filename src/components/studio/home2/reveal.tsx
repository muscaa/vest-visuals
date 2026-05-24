"use client";

// Reveal-on-scroll wrapper. Ported from ui.jsx.

import { useEffect, useRef, type ReactNode } from "react";

export function Reveal({
    children,
    delay = 0,
    className = "",
    style,
}: {
    children: ReactNode;
    delay?: number;
    className?: string;
    style?: React.CSSProperties;
}) {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => {
                if (e.isIntersecting) {
                    setTimeout(() => e.target.classList.add("in"), delay);
                    io.unobserve(e.target);
                }
            }),
            { rootMargin: "-10% 0px -5% 0px" },
        );
        io.observe(el);
        return () => io.disconnect();
    }, [delay]);
    return <div ref={ref} className={`reveal ${className}`} style={style}>{children}</div>;
}
