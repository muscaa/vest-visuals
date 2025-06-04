"use client";

import { Main } from "@/components/main";
import {
    useState,
    useEffect
} from "react";
import Image from "next/image";

function Category(props: { name: string, selected: boolean, hovered: boolean, onEnter?: () => void, onLeave?: () => void }) {
    return (
        <div
            onMouseEnter={props.onEnter}
            onMouseLeave={props.onLeave}
            className={`${props.selected ? "sm:w-[400%] not-sm:h-[400%]" : "sm:w-full not-sm:h-full"}
                sm:h-full not-sm:w-full transition-all ${props.hovered ? "ease-out" : "ease-in-out"} duration-700 overflow-hidden`}
        >
            <div
                className={`${props.selected ? "" : "blur-xs saturate-0"}
                    relative size-full transition-all ease-in-out duration-700`}
            >
                <Image src="/image0.png" alt="Image" width={1024} height={684} className="absolute size-full object-cover object-center" />
            </div>
        </div>
    );
}

function SectionCategories() {
    const [category, setCategory] = useState(0);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const interval = hovered ? undefined : setInterval(() => {
            setCategory((prev) => {
                return (prev + 1) % 4;
            });
        }, 3000);

        return () => {
            clearInterval(interval);
        };
    }, [hovered]);

    return (
        <section className="flex not-sm:flex-col w-full h-[calc(100vh-5rem)] gap-1">
            <Category
                name="Evenimente"
                selected={category == 0}
                hovered={hovered}
                onEnter={() => {
                    setHovered(true);
                    setCategory(0);
                }}
                onLeave={() => {
                    setHovered(false);
                }}
            />
            <Category
                name="Studio"
                selected={category == 1}
                hovered={hovered}
                onEnter={() => {
                    setHovered(true);
                    setCategory(1);
                }}
                onLeave={() => {
                    setHovered(false);
                }}
            />
            <Category
                name="Automotive"
                selected={category == 2}
                hovered={hovered}
                onEnter={() => {
                    setHovered(true);
                    setCategory(2);
                }}
                onLeave={() => {
                    setHovered(false);
                }}
            />
            <Category
                name="Corporate & Commercial"
                selected={category == 3}
                hovered={hovered}
                onEnter={() => {
                    setHovered(true);
                    setCategory(3);
                }}
                onLeave={() => {
                    setHovered(false);
                }}
            />
        </section>
    );
}

export default function Home() {
    return (
        <Main>
            <div className="flex flex-col items-center justify-center size-full gap-2 p-2">
                <SectionCategories />
                <div className="w-full h-128 bg-green-400">

                </div>
            </div>
        </Main>
    );
}
