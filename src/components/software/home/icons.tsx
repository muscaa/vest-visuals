// Icons — small, line-style, currentColor.

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export const Icon = {
    Sun: (p: IconProps) => (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
        </svg>
    ),
    Moon: (p: IconProps) => (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
            <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
        </svg>
    ),
    Arrow: (p: IconProps) => (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
            <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
    ),
    Plus: (p: IconProps) => (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}>
            <path d="M12 5v14M5 12h14" />
        </svg>
    ),
    Check: (p: IconProps) => (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
            <path d="M4 12.5l5 5L20 6.5" />
        </svg>
    ),
    Dot: (p: IconProps) => (
        <svg viewBox="0 0 8 8" width="6" height="6" {...p}><circle cx="4" cy="4" r="3" fill="currentColor" /></svg>
    ),
    // Service icons — geometric, line
    Code: (p: IconProps) => (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
            <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 4l-4 16" />
        </svg>
    ),
    Phone: (p: IconProps) => (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
            <rect x="6" y="3" width="12" height="18" rx="2" /><path d="M11 18h2" />
        </svg>
    ),
    Chart: (p: IconProps) => (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
            <path d="M4 20h16M7 16V9M12 16V5M17 16v-7" />
        </svg>
    ),
    Grid: (p: IconProps) => (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
            <rect x="4" y="4" width="7" height="7" rx="1" />
            <rect x="13" y="4" width="7" height="7" rx="1" />
            <rect x="4" y="13" width="7" height="7" rx="1" />
            <rect x="13" y="13" width="7" height="7" rx="1" />
        </svg>
    ),
    Spark: (p: IconProps) => (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
            <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
            <path d="M19 18l.6 1.6L21 20l-1.4.4L19 22l-.6-1.6L17 20l1.4-.4z" />
        </svg>
    ),
    Bolt: (p: IconProps) => (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
            <path d="M13 3L4 14h6l-1 7 9-11h-6z" />
        </svg>
    ),
    Cart: (p: IconProps) => (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
            <path d="M3 4h2l2.4 11.4a2 2 0 002 1.6h7.6a2 2 0 002-1.6L20 7H6" />
            <circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" />
        </svg>
    ),
    Layers: (p: IconProps) => (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
            <path d="M12 3l9 5-9 5-9-5 9-5z" />
            <path d="M3 13l9 5 9-5" />
        </svg>
    ),
};
