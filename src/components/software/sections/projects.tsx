import { TextH1, TextSpan } from "@/components/typography";
import { Separator } from "@/components/ui/separator";

interface Props {

}

export function SoftwareProjectsSection(props: Props) {
    return (
        <div className="flex flex-col justify-center items-center px-6 py-16">
            <div className="flex flex-col max-w-7xl w-full">
                <div className="flex items-center gap-4 mb-10">
                    <TextSpan variant="muted" size="label" font="mono1">03</TextSpan>
                    <Separator className="shrink" />
                    <TextSpan variant="muted" size="label" font="mono1">Work</TextSpan>
                </div>
                <TextH1 className="mb-14">
                    Three years, three problems
                    <br />
                    we kept thinking about.
                </TextH1>
                <div className="flex grow h-50 bg-black/20">

                </div>
            </div>
        </div>
    );
}
