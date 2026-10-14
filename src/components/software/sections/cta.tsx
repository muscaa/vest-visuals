import { m } from "@shared/paraglide/messages";
import { Link } from "@tanstack/react-router";
import MessageSent1 from "@/components/illustrations/message-sent-1.svg?react";
import { Eyebrow } from "@/components/eyebrow";
import { TextH1, TextP } from "@/components/typography";
import { Button } from "@/components/ui/button";

interface CTASectionProps { }

export function CTASection(props: CTASectionProps) {
    return (
        <section
            id="cta"
            className="flex flex-col justify-center items-center px-6 py-16"
        >
            <div className="flex flex-col items-center max-w-7xl w-full">
                <Eyebrow align="center" className="w-full">
                    {m.common_contact()}
                </Eyebrow>
                <MessageSent1 aria-hidden className="size-56 mb-4" />
                <TextH1 size="lg-3" className="mb-6 text-center max-w-[18ch]">
                    {m.software_cta_title()}
                </TextH1>
                <TextP variant="muted" size="md-3" className="max-w-[52ch] mb-12 text-center">
                    {m.software_cta_description()}
                </TextP>
                <div className="flex flex-wrap justify-center items-center gap-4">
                    <Button
                        size="xl"
                        nativeButton={false}
                        render={<Link to="/software/contact" />}
                    >
                        {m.common_contact_us()}
                    </Button>
                    <Button
                        size="xl"
                        variant="link"
                        nativeButton={false}
                        render={<a href="mailto:contact@vestvisuals.ro" />}
                    >
                        contact@vestvisuals.ro
                    </Button>
                </div>
            </div>
        </section>
    );
}
