"use client";

import { cn } from "@shared/shadcn/lib/utils";
import { InfoCard } from "../info-card";
import { Icon } from "../snippets";
import {
    CardHeader,
    CardContent,
} from "../ui/card";

interface PerkCardProps {
    icon: Icon;
    title: string;
    description: string;
}

function PerkCard(props: PerkCardProps) {
    return (
        <InfoCard className="w-xs sm:w-sm">
            <CardHeader className="place-items-center my-4">
                <props.icon className="size-16" />
                <h3 className="font-bold font-mono text-center">{props.title}</h3>
            </CardHeader>
            <CardContent>
                <p className="text-center text-muted-foreground">{props.description}</p>
            </CardContent>
        </InfoCard>
    );
}

export interface SectionBenefitsProps {
    title: string;
    perks: PerkCardProps[];
    className?: string;
}

export function SectionBenefits(props: SectionBenefitsProps) {
    return (
        <section
            id="benefits"
            className={cn("flex flex-col justify-center items-center gap-8 p-8 w-full", props.className)}
        >
            <h2 className="font-mono text-center my-8">{props.title}</h2>
            <div className="flex flex-wrap max-w-8xl w-full justify-center gap-4">
                {
                    props.perks.map((perk, index) => (
                        <PerkCard
                            key={index}
                            {...perk}
                        />
                    ))
                }
            </div>
        </section>
    );
}
