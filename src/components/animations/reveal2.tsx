"use client";

import {
    useRef,
    useEffect,
} from "react";
import { animate } from "animejs";

interface Reveal2ComponentProps {
    ref: React.Ref<any>;
    className: string;
}

interface Reveal2Props {
    render: React.ComponentType<Reveal2ComponentProps>;
    direction?: "up" | "down" | "left" | "right" | "none";
    distance?: number;
    delay?: number;
    duration?: number;
}

export function Reveal2({ direction = "right", distance = 20, delay = 0, duration = 500, ...props }: Reveal2Props) {
    const ref = useRef<HTMLElement>(null);

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
        <props.render
            ref={ref}
            className="opacity-0 will-change-transform"
        />
    );
}
