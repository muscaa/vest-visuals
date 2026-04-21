"use client";

import { cn } from "@shared/shadcn/lib/utils";
import {
    Gauge,
    Award,
    Network,
    Cog,
} from "lucide-react";
import { Icon } from "../snippets";

interface HighlightProps {
    title: string;
    description: string;
    icon: Icon;
}

function Highlight(props: HighlightProps) {
    return (
        <div className="flex items-center gap-2 theme-dark">
            <props.icon className="size-12" />
            <div className="flex flex-col">
                <h4>{props.title}</h4>
                <p>{props.description}</p>
            </div>
        </div>
    );
}

export interface SectionHighlightsProps {
    className?: string;
}

export function SectionHighlights(props: SectionHighlightsProps) {
    return (
        <section
            id="highlights"
            className={cn("flex flex-col justify-center items-center gap-8 p-8 w-full", props.className)}
        >
            <div className="flex justify-around items-center size-full gap-4 p-8 bg-primary rounded-2xl">
                <Highlight title="Livrare Rapida" description="oriunde in tara" icon={Gauge} />
                <Highlight title="Garantia Calitatii" description="produse de calitate" icon={Award} />
                <Highlight title="Producator" description="distribuitor direct" icon={Network} />
                <Highlight title="Propuneri" description="proiectate (3D)" icon={Cog} />
            </div>
        </section>
    );
}
