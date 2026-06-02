import { TextH1, TextP, TextSpan } from "@/components/typography";
import { Separator } from "@/components/ui/separator";

interface Props {

}

export function TestimonialsSection(props: Props) {
    return (
        <div className="flex flex-col justify-center items-center px-6 py-16">
            <div className="flex flex-col max-w-7xl w-full">
                <div className="flex items-center gap-4 mb-10">
                    <TextSpan variant="muted" size="label" font="mono1">03</TextSpan>
                    <Separator className="shrink" />
                    <TextSpan variant="muted" size="label" font="mono1">Clients</TextSpan>
                </div>
                <TextH1 className="mb-4">In their words.</TextH1>
                <TextP variant="muted" size="lead" className="max-w-[56ch] mb-14">
                    Things our clients said in the post-launch retrospective. Names and titles are real.
                </TextP>
                <div className="flex grow h-50 bg-black/20">

                </div>
            </div>
        </div>
    );
}
