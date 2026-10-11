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
                    Contact
                </Eyebrow>
                <MessageSent1 className="size-56 mb-4" />
                <TextH1 size="lg-3" className="mb-6 text-center max-w-[18ch]">
                    Spune-ne ce construiești
                </TextH1>
                <TextP variant="muted" size="md-3" className="max-w-[52ch] mb-12 text-center">
                    Descrie-ne proiectul tău, îl analizăm și revenim cât mai
                    repede, de obicei într-o zi lucrătoare.
                </TextP>
                <div className="flex flex-wrap justify-center items-center gap-4">
                    <Button size="xl">Contactează-ne</Button>
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
