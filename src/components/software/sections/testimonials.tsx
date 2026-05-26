import { Separator } from "@/components/ui/separator";

interface Props {

}

export function TestimonialsSection(props: Props) {
    return (
        <div className="flex flex-col justify-center items-center px-6 py-16">
            <div className="flex flex-col max-w-7xl w-full">
                <div className="flex items-center gap-4 text-label font-mono uppercase text-muted-foreground mb-10">
                    <span>04</span>
                    <Separator className="shrink" />
                    <span>Clients</span>
                </div>
                <p className="text-h1 text-balance mb-4">In their words.</p>
                <p className="text-muted-foreground text-pretty max-w-[56ch] mb-14">
                    Things our clients said in the post-launch retrospective. Names and titles are real.
                </p>
                <div className="flex grow h-50 bg-black/20">

                </div>
            </div>
        </div>
    );
}
