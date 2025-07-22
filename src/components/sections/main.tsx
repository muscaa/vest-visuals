import {
    useEffect,
    useRef,
} from "react";
import Image from "next/image";
import {
    ButtonLink,
} from "@/components/snippets";
import { Reveal } from "@/components/animations/reveal";

function SectionMain() {
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            imageRef.current?.classList.add("scale-120");
        });

        return () => {
            clearTimeout(timeout);
        };
    }, [imageRef]);

    return (
        <section id="main" className="relative w-full h-[calc(100vh-4rem)] p-2">
            <div className="absolute size-[calc(100%-1rem)] overflow-hidden">
                <Reveal direction="none" className="size-full">
                    <Image
                        ref={imageRef}
                        src="/image0.png"
                        alt="Image"
                        width={1024}
                        height={684}
                        className="size-full object-cover object-center transition-all duration-10000 ease-linear"
                    />
                </Reveal>
            </div>
            <div
                className="
                    absolute flex flex-col size-[calc(100%-1rem)]
                    justify-evenly items-center p-2 theme-dark
                    bg-gradient-to-b from-transparent to-black/30
                "
            >
                <div></div>
                <div className="flex flex-col justify-center items-center gap-4">
                    <Reveal delay={500} duration={1000}>
                        <h1 className="font-medium text-center">FOTO & VIDEO</h1>
                    </Reveal>
                    <Reveal delay={800} duration={1000} direction="left">
                        <h2 className="font-light text-center italic text-foreground32">TIMISOARA | ARAD | ORADEA</h2>
                    </Reveal>
                </div>
                <Reveal delay={1800} duration={1000} direction="up">
                    <ButtonLink href="#about" variant="neutral" size="lg" className="theme-light">AFLA MAI MULTE</ButtonLink>
                </Reveal>
            </div>
        </section>
    );
}
