"use client";

import { Main } from "@/components/main";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useRegistries } from "@/hooks/useRegistries";

export default function Page() {
    const { useRegistry } = useRegistries();
    const { data } = useRegistry("faq");

    return (
        <Main>
            <div className="flex flex-col justify-center items-center size-full p-8">
                <Accordion
                    // type="single"
                    // collapsible
                    className="w-full max-w-3xl"
                >
                    {
                        data && data.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger>{faq.title}</AccordionTrigger>
                                <AccordionContent className="flex flex-col text-balance">
                                    {
                                        faq.lines.map((line, index) => (
                                            <p key={index}>{line || "\u00A0"}</p>
                                        ))
                                    }
                                </AccordionContent>
                            </AccordionItem>
                        ))
                    }
                </Accordion>
            </div>
        </Main>
    );
}
