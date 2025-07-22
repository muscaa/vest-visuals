import Image from "next/image";
import { ButtonLink } from "@/components/snippets";
import { Reveal } from "@/components/animations/reveal";
import { Navbar } from "@/components/navbar";
import { ParallaxLayers } from "@/components/parallax";
import { IconProps } from "@/components/snippets";

function ImageBackground(props: IconProps) {
    return (
        <Image
            src="/background.png"
            alt="Background"
            width={6000}
            height={4000}
            className={props.className}
        />
    );
}

function ImageCar(props: IconProps) {
    return (
        <Image
            src="/car.png"
            alt="Car"
            width={6000}
            height={4000}
            className={props.className}
        />
    );
}

interface Props {
    setMore: (value: boolean) => void;
}

export function SectionParallaxHeader(props: Props) {
    return (
        <>
            <div className="relative min-h-screen w-screen h-screen">
                <ParallaxLayers
                    interact={true}
                    options={{
                        yFactor: 0,
                    }}
                    layers={[
                        {
                            icon: ImageBackground,
                            offset: 15,
                            width: 6000,
                            height: 4000,
                            scale: 105,
                        },
                        {
                            icon: ImageCar,
                            offset: 25,
                            width: 6000,
                            height: 4000,
                            scale: 105,
                        },
                    ]}
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
