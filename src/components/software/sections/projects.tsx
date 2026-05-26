import { Separator } from "@/components/ui/separator";

interface Props {

}

export function ProjectsSection(props: Props) {
    return (
        <div className="flex flex-col justify-center items-center px-6 py-16">
            <div className="flex flex-col max-w-7xl w-full">
                <div className="flex items-center gap-4 text-label font-mono uppercase text-muted-foreground mb-10">
                    <span>03</span>
                    <Separator className="shrink" />
                    <span>Work</span>
                </div>
                <p className="text-h1 text-balance mb-14">
                    Three years, three problems
                    <br />
                    we kept thinking about.
                </p>
                <div className="flex grow h-50 bg-black/20">

                </div>
            </div>
        </div>
    );
}
