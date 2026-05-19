"use client";

import { HeroCanvas } from "@/components/software/hero-canvas";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function HeroSection() {
    return (
        <section
            id="hero"
            className="relative flex flex-col justify-center items-center min-h-screen-no-nav"
        >
            <div className="absolute inset-0 -z-10 mask-radial-[80%_70%] mask-radial-at-[50%_60%] mask-radial-from-black mask-radial-from-40% mask-radial-to-transparent mask-radial-to-100%">
                <HeroCanvas />
            </div>
            <div className="flex flex-col justify-center items-center gap-12 max-w-6xl w-full text-center mt-32">
                <h1 className="text-balance tracking-tight font-medium text-8xl">
                    Software that feels
                    <br />
                    like it was <i className="text-primary">made</i> for you.
                </h1>
                <p className="p3 text-muted-foreground leading-snug text-pretty max-w-3xl">
                    We are a design-led product studio. We partner with founders and operators to turn ambitious ideas into software people genuinely want to use.
                </p>
                <div className="flex gap-4">
                    <Button variant="default">
                        Start a project
                    </Button>
                    <Button variant="outline">
                        See our work
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-12 max-w-8xl w-full border-t border-b py-8 my-24">
                {
                    [
                        {
                            name: "11 yrs",
                            desc: "In busines",
                        },
                        {
                            name: "42",
                            desc: "Products shipped",
                        },
                        {
                            name: "$180M+",
                            desc: "Raised by clients",
                        },
                        {
                            name: "96%",
                            desc: "Retention",
                        },
                    ].map((value, index) => (
                        <div key={index} className="flex flex-col gap-1">
                            <span className="p2 font-medium">{value.name}</span>
                            <span className="p6 text-muted-foreground font-mono uppercase tracking-widest">{value.desc}</span>
                        </div>
                    ))
                }
            </div>
        </section>
    );
}

function LogosSection() {
    return (
        <section
            id="logos"
            className="flex flex-col justify-center items-center gap-8 border-t border-b px-8 py-16"
        >
            <p className="p6 font-mono uppercase tracking-widest text-muted-foreground">Trusted by teams at</p>
            <div className="flex flex-wrap w-full justify-evenly">
                <span>Northwind</span>
                <span>Lumen</span>
                <span>Parallel</span>
                <span>Field Labs</span>
                <span>Orbital</span>
                <span>Meridian</span>
            </div>
        </section>
    );
}

function ServicesSection() {
    return (
        <section
            id="services"
            className="flex flex-col justify-center items-center"
        >
            <div className="flex flex-col justify-center items-center gap-4 max-w-6xl w-full my-32">
                <div className="grid grid-cols-2 items-end w-full">
                    <div className="flex flex-col gap-4">
                        <Badge variant="dot" size="sm">
                            Services
                        </Badge>
                        <h2 className="p0 text-balance tracking-tight font-medium">
                            What we <i className="text-primary">do</i>,
                            <br />
                            end to end.
                        </h2>
                    </div>
                    <p className="p4 text-muted-foreground leading-snug text-pretty max-w-3xl">
                        We embed with your team as a single, senior pod — design, engineering, and product decisions made in one room. No handoffs, no thrash.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default function Page() {
    return (
        <div className="flex flex-col min-h-screen-no-nav">
            <HeroSection />
            <LogosSection />
            <ServicesSection />
        </div>
    );
}
