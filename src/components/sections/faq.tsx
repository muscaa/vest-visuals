import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@shared/shadcn/lib/utils";

type FAQ = [question: string, answer: React.ReactNode];

export interface SectionFAQProps {
    title: string;
    qna: FAQ[];
    className?: string;
}

export function SectionFAQ(props: SectionFAQProps) {
    return (
        <section
            id="faq"
            className={cn("flex flex-col justify-center items-center gap-8 p-8 w-full", props.className)}
        >
            <h2 className="font-mono">{props.title}</h2>
            <Accordion className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2">
                {
                    props.qna.map(([question, answer], index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="md:nth-last-2:odd:border-b-0 md:last:odd:col-span-2">
                            <AccordionTrigger>{question}</AccordionTrigger>
                            <AccordionContent className="flex flex-col text-balance">
                                {answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))
                }
            </Accordion>
        </section>
    );
}
