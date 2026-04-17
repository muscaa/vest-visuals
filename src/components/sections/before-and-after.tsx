import { cn } from "@shared/shadcn/lib/utils";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";

export interface SectionBeforeAndAfterProps {
    title: string;
    className?: string;
}

export function SectionBeforeAndAfter(props: SectionBeforeAndAfterProps) {
    return (
        <section
            id="about"
            className={cn("flex flex-col justify-center items-center text-center gap-8 p-8 w-full", props.className)}
        >
            <h2 className="font-mono my-8">{props.title}</h2>
            <ResizablePanelGroup
                orientation="horizontal"
                className="size-64"
            >
                <ResizablePanel className="bg-red-400 h-64">One</ResizablePanel>
                <ResizableHandle withHandle className="" />
                <ResizablePanel className="bg-blue-400">Two</ResizablePanel>
            </ResizablePanelGroup>
        </section>
    );
}
