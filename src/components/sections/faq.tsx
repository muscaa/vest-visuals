import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {

}

export function SectionFAQ(props: Props) {
    const data = Array.from({ length: 6 }).map((_, index) => ({
        title: `${index + 1}. Cate fotografii vom primi si in cat timp?`,
        lines: [
            "Cate fotografii vom primi si in cat timp",
        ],
    }));

    return (
        <section id="faq" className="flex flex-col justify-center items-center gap-8">
            <h1>FAQ</h1>
            <Accordion
                className="w-full max-w-6xl flex-row flex-wrap justify-center border-b-0"
            >
                {
                    data && data.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="grow last:border-b">
                            <AccordionTrigger  >{faq.title}</AccordionTrigger>
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
        </section>
    );
}
