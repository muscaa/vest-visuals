"use client";

import { Main } from "@/components/main";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function Page() {
    const questions = {
        "Product Information":
            <>
                <p>
                    Our flagship product combines cutting-edge technology with sleek
                    design. Built with premium materials, it offers unparalleled
                    performance and reliability.
                </p>
                <p>
                    Key features include advanced processing capabilities, and an
                    intuitive user interface designed for both beginners and experts.
                </p>
            </>,
        "Shipping Details":
            <>
                <p>
                    We offer worldwide shipping through trusted courier partners.
                    Standard delivery takes 3-5 business days, while express shipping
                    ensures delivery within 1-2 business days.
                </p>
                <p>
                    All orders are carefully packaged and fully insured. Track your
                    shipment in real-time through our dedicated tracking portal.
                </p>
            </>,
        "Return Policy":
            <>
                <p>
                    We stand behind our products with a comprehensive 30-day return
                    policy. If you&apos;re not completely satisfied, simply return the
                    item in its original condition.
                </p>
                <p>
                    Our hassle-free return process includes free return shipping and
                    full refunds processed within 48 hours of receiving the returned
                    item.
                </p>
            </>,
    };

    return (
        <Main>
            <div className="flex flex-col justify-center items-center size-full p-8">
                <Accordion
                    type="single"
                    collapsible
                    className="w-full max-w-3xl"
                >
                    {
                        Object.entries(questions).map(([question, answer], index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger>{question}</AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    {answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))
                    }
                </Accordion>
            </div>
        </Main>
    );
}
