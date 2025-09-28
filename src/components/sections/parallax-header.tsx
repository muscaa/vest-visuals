import { ButtonLink } from "@/components/snippets";
import { Reveal } from "@/components/animations/reveal";
import { Navbar } from "@/components/navbar";
import { ParallaxLayers } from "@/components/parallax";
import { useRegistries } from "@/hooks/useRegistries";
import { useMemo } from "react";

interface Props {
    setMore: (value: boolean) => void;
}

export function SectionParallaxHeader(props: Props) {
    const { useRegistry } = useRegistries();
    const { data } = useRegistry("parallax");
    const layers = useMemo(() => {
        if (!data) return undefined;

        const now = Math.floor(Date.now() / 1000);
        const index = now % data.length;
        return data[index].layers;
    }, [data]);

    return (
        <>
            <div className="relative min-h-screen w-screen h-screen">
                <ParallaxLayers
                    interact={true}
                    options={{
                        yFactor: 0,
                    }}
                    layers={layers ?? []}
                />
                <div
                    className="
                        absolute flex flex-col size-full
                        justify-evenly items-center p-2 theme-dark
                        bg-gradient-to-b from-transparent to-black/30
                    "
                >
                    <div className="flex flex-col justify-center items-center gap-4">
                        <Reveal delay={500} duration={1000}>
                            <h1 className="font-medium text-center">FOTO & VIDEO</h1>
                        </Reveal>
                        <Reveal delay={800} duration={1000} direction="left">
                            <h2 className="font-light text-center italic text-foreground32">TIMISOARA | ARAD | ORADEA</h2>
                        </Reveal>
                    </div>
                    <Reveal delay={1300} duration={1000} direction="up">
                        <ButtonLink
                            href="/?more"
                            variant="neutral"
                            size="lg"
                            className="theme-light"
                            onClick={() => props.setMore(true)}
                        >
                            AFLA MAI MULTE
                        </ButtonLink>
                    </Reveal>
                </div>
            </div>
            <Navbar />
        </>
    );
}
