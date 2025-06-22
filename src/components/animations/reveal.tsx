"use client";

import {
    useRef,
    useEffect
} from "react";
import { animate } from "animejs";

interface RevealProps {
    children: React.ReactNode;
    className?: string;
    direction?: "up" | "down" | "left" | "right" | "none";
    distance?: number;
    delay?: number;
    duration?: number;
}

export function Reveal({ direction = "right", distance = 20, delay = 0, duration = 500, ...props }: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let translate = {};

                    switch (direction) {
                        case "up":
                            translate = { translateY: [distance, 0] };
                            break;
                        case "down":
                            translate = { translateY: [-distance, 0] };
                            break;
                        case "left":
                            translate = { translateX: [distance, 0] };
                            break;
                        case "right":
                            translate = { translateX: [-distance, 0] };
                            break;
                    }

                    animate(element, {
                        opacity: [0, 1],
                        easing: "easeOutQuad",
                        delay,
                        duration,
                        ...translate,
                    });

                    observer.unobserve(element);
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [delay, direction, distance, duration]);

    return (
        <div ref={ref} className={`opacity-0 will-change-transform ${props.className}`}>
            {props.children}
        </div>
    );
}
