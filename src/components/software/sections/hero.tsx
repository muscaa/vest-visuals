import { Link } from "@tanstack/react-router";
import Workflow1 from "@/components/illustrations/workflow-1.svg?react";
import { TextH1, TextP } from "@/components/typography";
import { Button } from "@/components/ui/button";

interface HeroSectionProps { }

export function HeroSection(props: HeroSectionProps) {
    return (
        <section
            id="hero"
            className="relative flex flex-col justify-center items-center px-6 pt-24 pb-18 bg-linear-to-b from-transparent to-muted"
        >
            <div className="grid-background" />
            <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] items-center gap-16 max-w-7xl w-full">
                <div className="flex flex-col">
                    <TextH1 size="lg-3" className="max-w-[16ch]">
                        Software construit pentru succes pe termen lung
                    </TextH1>
                    <TextP variant="muted" size="md-3" className="max-w-[50ch] my-10">
                        Construim aplicații adaptate felului în care lucrează
                        afacerea ta. Înțelegem întâi problema, apoi scriem cod,
                        și rămânem alături și după lansare.
                    </TextP>
                    <div className="flex flex-wrap gap-4">
                        <Button size="xl">Spune-ne ce ai nevoie</Button>
                        <Button
                            size="xl"
                            variant="outline"
                            nativeButton={false}
                            render={<Link to="/software" hash="servicii" />}
                        >
                            Ce facem
                        </Button>
                    </div>
                </div>
                <Workflow1 className="w-full max-w-md h-auto justify-self-center" />
            </div>
        </section>
    );
}
