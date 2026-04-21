import { cn } from "@shared/shadcn/lib/utils";
import { Comparison } from "../comparison";
import { Img } from "../snippets";

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
            <Comparison
                c1={(
                    <Img
                        src="https://cdn0.vestvisuals.ro/assets/mw9i6zen7sd4tlxyl6d34c8o/large"
                        alt="Before"
                        className="size-full object-cover"
                    />
                )}
                c2={(
                    <Img
                        src="https://cdn0.vestvisuals.ro/assets/ikhrfkmpuq731hm81z4qfo5n/large"
                        alt="After"
                        className="size-full object-cover"
                    />
                )}
                className="size-128"
            />
        </section>
    );
}
