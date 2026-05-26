import { Button } from "@/components/ui/button";

interface Props {

}

export function HeroSection(props: Props) {
    return (
        <header id="hero" className="relative flex flex-col justify-center items-center px-6 pt-24 pb-18 border-b">
            <div className="grid-background" />
            <div className="grid grid-cols-2 gap-16 items-center max-w-7xl w-full">
                <div className="flex flex-col">
                    <p className="text-display text-balance mt-14">
                        We build software
                        <br />
                        that ships, <em>predictably.</em>
                    </p>
                    <p className="text-lead text-pretty max-w-[50ch] my-10 text-muted-foreground">
                        Vest Visuals is a small engineering studio. We design, build, and launch web apps, mobile apps, internal tools, and data products with senior teams — on fixed weekly sprints, no surprises.
                    </p>
                    <div className="flex gap-4">
                        <Button variant="default">
                            Book a discovery call
                        </Button>
                        <Button variant="outline">
                            See recent work
                        </Button>
                    </div>
                    <div className="flex gap-12 text-label font-mono text-muted-foreground mt-16">
                        <span><b>11</b> shipped products</span>
                        <span><b>4x</b> on-time delivery</span>
                        <span><b>NPS 72</b> last 12mo</span>
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
