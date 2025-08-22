"use client";

import {
    useState,
    useEffect
} from "react";

type WindowSize = {
    width: number;
    height: number;
} | null;

export function useWindowSize() {
    const [windowSize, setWindowSize] = useState<WindowSize>(null);
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return windowSize;
}
