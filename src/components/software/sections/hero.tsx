"use client";

import { ButtonLink } from "@/components/snippets";
import { TextH1, TextP, TextSpan } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { cn } from "@shared/shadcn/lib/utils";

interface Props {

}

export function HeroSection(props: Props) {
    return (
        <header id="hero" className="relative flex flex-col justify-center items-center px-6 pt-24 pb-18 border-b">
            <div className="grid-background" />
            <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-16 items-center max-w-7xl w-full">
                <div className="flex flex-col">
                    <TextH1 size="display" className="mt-14">
                        We build software
                        <br />
                        that ships, <em>predictably.</em>
                    </TextH1>
                    <TextP variant="muted" size="lead" className="max-w-[50ch] my-10">
                        Vest Visuals is a small engineering studio. We design, build, and launch web apps, mobile apps, internal tools, and data products with senior teams — on fixed weekly sprints, no surprises.
                    </TextP>
                    <div className="flex gap-4">
                        <ButtonLink to="/contact" variant="default">
                            Book a discovery call
                        </ButtonLink>
                        <ButtonLink href="#services" variant="outline">
                            See what we do
                        </ButtonLink>
                    </div>
                    {/* <div className="flex gap-12 mt-16">
                        <TextSpan variant="muted" size="label" font="mono2"><b>11</b> shipped products</TextSpan>
                        <TextSpan variant="muted" size="label" font="mono2"><b>4x</b> on-time delivery</TextSpan>
                        <TextSpan variant="muted" size="label" font="mono2"><b>NPS 72</b> last 12mo</TextSpan>
                    </div> */}
                </div>
                <div className="relative group/mockups bg-muted border rounded-2xl overflow-hidden w-full aspect-5/4">
                    <BrowserMock />
                    <PhoneMock />
                    <TerminalMock />
                </div>
            </div>
        </header>
    );
}

function BrowserMock() {
    const heights = [62, 78, 45, 90, 70, 58, 84, 52, 76, 88, 64, 72];

    return (
        <div className="absolute z-1 top-[10%] left-[9%] w-[75%] h-[70%] animate-floatA flex flex-col bg-background shadow-lg group-hover/mockups:shadow-xl transition-all rounded-lg overflow-hidden border">
            <div className="flex items-center p-2 pl-3 gap-1 bg-muted border-b">
                {
                    Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="flex shrink-0 size-2 bg-border rounded-full" />
                    ))
                }
                <TextSpan variant="muted" size="label" className="bg-background rounded-sm grow px-2 py-1 ml-2 border border-border overflow-hidden whitespace-nowrap text-ellipsis">www.vestvisuals.ro/dashboard</TextSpan>
            </div>
            <div className="flex grow">
                <div className="flex flex-col p-2 gap-1.5 bg-muted border-r">
                    <div className="flex w-12 h-4 shrink-0 rounded-xs bg-linear-to-r from-primary to-success mb-1" />
                    <div className="flex w-12 h-2 shrink-0 rounded-xs bg-secondary" />
                    <div className="flex w-12 h-2 shrink-0 rounded-xs bg-primary/50" />
                    <div className="flex w-12 h-2 shrink-0 rounded-xs bg-secondary" />
                    <div className="flex w-12 h-2 shrink-0 rounded-xs bg-secondary" />
                    <div className="flex w-12 h-2 shrink-0 rounded-xs bg-secondary" />
                </div>
                <div className="flex flex-col grow p-3 gap-3">
                    <div className="grid grid-cols-4 gap-1.5">
                        {
                            [
                                {
                                    label: "Profit",
                                    text: "$48.2k",
                                    accent: "+12%",
                                },
                                {
                                    label: "Sessions",
                                    text: "12,408",
                                    accent: "+4.1%",
                                },
                                {
                                    label: "Avg Ping",
                                    text: "184ms",
                                    accent: "-22%",
                                },
                                {
                                    label: "Errors",
                                    text: "0.04%",
                                    accent: "flat",
                                },
                            ].map((value, index) => (
                                <div key={index} className={`flex flex-col gap-0.5 p-2 border rounded-sm overflow-hidden whitespace-nowrap text-ellipsis ${index == 1 ? "bg-primary/10 border-primary/50" : "bg-muted"}`}>
                                    <TextSpan variant="muted" size="xs" font="mono1">{value.label}</TextSpan>
                                    <TextSpan size="label" font="mono2" className="font-medium">{value.text}</TextSpan>
                                    <TextSpan size="xs" font="mono2" className={index == 0 || index == 2 ? "text-success" : index == 1 ? "text-primary" : "text-muted-foreground"}>{value.accent}</TextSpan>
                                </div>
                            ))
                        }
                    </div>
                    <div className="flex items-end grow gap-1 p-2 bg-muted border rounded-sm">
                        {
                            heights.map((height, index) => (
                                <div key={index} className={`flex w-full rounded-xs ${index == 7 ? "bg-success" : "bg-primary/50"}`} style={{ height: `${height}%` }} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

function PhoneMock() {
    return (
        <div className="absolute z-2 top-[35%] right-[3%] w-[21%] aspect-1/2 rotate-4 animate-floatB bg-black rounded-2xl p-1.5">
            <div className="flex flex-col size-full p-1 gap-2 bg-background rounded-xl overflow-hidden">
                <div className="flex justify-between items-center mt-2">
                    <TextSpan size="xs" font="mono2">09:41</TextSpan>
                    <TextSpan size="xs" font="mono2">80%</TextSpan>
                </div>
                <div className="flex flex-col p-2 gap-1 bg-linear-to-br from-primary to-success from-30% theme-dark rounded-md">
                    <TextSpan size="xs" font="mono2" className="overflow-hidden whitespace-nowrap text-ellipsis">This Week</TextSpan>
                    <TextSpan size="label" font="mono2" className="font-medium overflow-hidden whitespace-nowrap text-ellipsis">5 sales</TextSpan>
                </div>
                {
                    [
                        {
                            title: "Sprint 14 demo",
                            description: "Fri · 4pm",
                        },
                        {
                            title: "Design review",
                            description: "Tue · 2pm",
                        },
                        {
                            title: "Eval harness",
                            description: "Wed · 10am",
                        },
                        {
                            title: "Migration plan",
                            description: "Thu · 11am",
                        },
                    ].map((value, index) => (
                        <div key={index} className="flex items-center grow shrink-0 gap-1 px-2 py-1 border bg-muted last:bg-primary/10 last:border-primary/50 group/task rounded-md overflow-hidden">
                            <span className="flex shrink-0 size-2 rounded-xs group-odd/task:bg-primary group-even/task:bg-success" />
                            <div className="flex flex-col">
                                <TextSpan size="xs" className="overflow-hidden whitespace-nowrap text-ellipsis">{value.title}</TextSpan>
                                <TextSpan variant="muted" size="xs" font="mono2" className="overflow-hidden whitespace-nowrap text-ellipsis">{value.description}</TextSpan>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

function TerminalMock() {
    return (
        <div className="absolute z-3 bottom-[10%] left-[2%] w-[40%] -rotate-3 animate-floatC flex flex-col theme-dark bg-background rounded-lg overflow-hidden border">
            <div className="flex items-center p-2 pl-3 gap-1 bg-secondary border-b">
                <div className="flex shrink-0 size-2 bg-destructive rounded-full" />
                <div className="flex shrink-0 size-2 bg-warning rounded-full" />
                <div className="flex shrink-0 size-2 bg-success rounded-full" />
                <TextSpan variant="muted" size="label" className="grow px-2 ml-1 overflow-hidden whitespace-nowrap text-ellipsis">docker@root - zsh</TextSpan>
            </div>
            <div className="flex flex-col px-3 py-2">
                {
                    [
                        {
                            text: "$ npm run build",
                        },
                        {
                            text: "→ Creating an optimized production build...",
                            className: "text-primary",
                        },
                        {
                            text: "✓ Compiled successfully in 10.3s",
                            className: "text-success",
                        },
                        {
                            text: "✓ Finished TypeScript in 14.9s",
                            className: "text-success",
                        },
                        {
                            text: "→ Generating sitemaps...",
                            className: "text-primary",
                        },
                        {
                            text: "✓ Done!",
                            className: "text-success",
                        },
                        {
                            text: "$",
                            blink: true,
                        },
                    ].map((value, index) => (
                        <TextSpan key={index} size="label" font="mono2" className={cn("overflow-hidden whitespace-nowrap text-ellipsis inline-flex", value.className)}>
                            {value.text}
                            {
                                value.blink && (
                                    <span className="flex shrink-0 w-1.5 h-3 ml-2.5 bg-foreground animate-caret-blink" />
                                )
                            }
                        </TextSpan>
                    ))
                }
            </div>
        </div>
    );
}
