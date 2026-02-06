import { cn } from "@shared/shadcn/lib/utils";

export interface SectionAboutProps {
    title: string;
    description: string;
    className?: string;
}

export function SectionAbout(props: SectionAboutProps) {
    return (
        <section
            id="about"
            className={cn("flex flex-col justify-center items-center text-center gap-8 p-8 w-full", props.className)}
        >
            <h2 className="font-mono my-8">{props.title}</h2>
            <p className="max-w-4xl">{props.description}</p>
        </section>
    );
}
