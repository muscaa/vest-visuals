import { TextH1, TextP, TextSpan } from "@/components/typography";
import { Button } from "@/components/ui/button";

interface Props {

}

export function HeroSection(props: Props) {
    return (
        <header id="hero" className="relative flex flex-col justify-center items-center px-6 pt-24 pb-18 border-b">
            <div className="grid-background" />
            <div className="grid grid-cols-2 gap-16 items-center max-w-7xl w-full">
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
                        <Button variant="default">
                            Book a discovery call
                        </Button>
                        <Button variant="outline">
                            See recent work
                        </Button>
                    </div>
                    <div className="flex gap-12 mt-16">
                        <TextSpan variant="muted" size="label" font="mono2"><b>11</b> shipped products</TextSpan>
                        <TextSpan variant="muted" size="label" font="mono2"><b>4x</b> on-time delivery</TextSpan>
                        <TextSpan variant="muted" size="label" font="mono2"><b>NPS 72</b> last 12mo</TextSpan>
                    </div>
                </div>
                <div className="bg-black/20 size-full">
                    {/* TODO */}
                </div>
            </div>
            <div className="flex max-w-7xl w-full h-20 mt-16 bg-black/20">
                {/* TODO */}
            </div>
        </header>
    );
}
