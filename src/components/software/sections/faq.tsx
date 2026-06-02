import { TextH1, TextLink, TextP, TextSpan } from "@/components/typography";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

interface Props {

}

export function FAQSection(props: Props) {
    const items = [
        {
            q: "How quickly can you start?",
            a: "Most engagements start within 2–3 weeks of our discovery call. We keep one slot open for unblockers — if you're stuck and need help this week, ask.",
        },
        {
            q: "Do you sign NDAs?",
            a: "Yes, mutual NDA at the start of the discovery call. We don't talk publicly about any project unless the client asks us to.",
        },
        {
            q: "Will you work with our existing team?",
            a: "Yes, this is most of what we do. We pair with your engineers, run code review on both sides, and avoid building parallel kingdoms.",
        },
        {
            q: "What's your team based?",
            a: "San Francisco and Lisbon. We cover working hours from ~07:00 PT to ~18:00 PT.",
        },
        {
            q: "Do you do design without engineering?",
            a: "We do — but only when there's an engineering team waiting on the other side. Design without a builder is a Figma file gathering dust.",
        },
        {
            q: "What's the smallest project you'll take?",
            a: "Two weeks of work, single engineer. Below that, it's faster for you to do it yourselves and we'll happily review the PR.",
        },
        {
            q: "Do you offer fixed-bid projects?",
            a: "Rarely. Fixed bids usually mean either we overcharge to absorb risk, or we cut corners to absorb risk. Weekly billing keeps incentives aligned.",
        },
        {
            q: "Who owns the code?",
            a: "You do, end of story. We commit to your repo from day one and never hold IP hostage.",
        },
    ];

    return (
        <section id="faq" className="flex flex-col justify-center items-center px-6 py-16">
            <div className="flex flex-col max-w-7xl w-full">
                <div className="flex items-center gap-4 mb-10">
                    <TextSpan variant="muted" size="label" font="mono1">04</TextSpan>
                    <Separator className="shrink" />
                    <TextSpan variant="muted" size="label" font="mono1">FAQ</TextSpan>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] md:gap-16">
                    <div className="flex flex-col">
                        <TextH1 className="mb-4 max-w-[14ch]">Questions we get most.</TextH1>
                        <TextP variant="muted" size="lead" className="max-w-[32ch] mb-14">
                            Didn't see yours? Hit us at <TextLink href="mailto:contact@vestvisuals.ro">contact@vestvisuals.ro</TextLink>
                        </TextP>
                    </div>
                    <Accordion>
                        {
                            items.map(({ q, a }, index) => (
                                <AccordionItem key={index} value={`item-${index}`}>
                                    <AccordionTrigger>{q}</AccordionTrigger>
                                    <AccordionContent className="flex flex-col text-balance">
                                        {a}
                                    </AccordionContent>
                                </AccordionItem>
                            ))
                        }
                    </Accordion>
                </div>
            </div>
        </section>
    );
}
