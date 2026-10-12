import Contact3 from "@/components/illustrations/contact-3.svg?react";
import { Eyebrow } from "@/components/eyebrow";
import { TextH2, TextP } from "@/components/typography";
import { Button } from "@/components/ui/button";

const email = "contact@vestvisuals.ro";

interface ContactSectionProps {}

export function ContactSection(props: ContactSectionProps) {
    return (
        <section
            id="contact"
            className="flex flex-col justify-center items-center px-6 py-16"
        >
            <div className="flex flex-col items-center max-w-7xl w-full">
                <Eyebrow align="center" className="w-full">
                    Contact
                </Eyebrow>
                <Contact3 aria-hidden className="size-56 mb-4" />
                <TextH2 size="lg-3" className="mb-6 text-center max-w-[20ch]">
                    Hai să vorbim despre proiectul tău
                </TextH2>
                <TextP variant="muted" size="md-3" className="max-w-[52ch] mb-12 text-center">
                    Spune-ne ce ai în minte și te punem în legătură cu echipa
                    potrivită. Răspundem de obicei într-o zi lucrătoare.
                </TextP>
                <div className="flex flex-wrap justify-center items-center gap-4">
                    <Button size="xl">Contactează-ne</Button>
                    <Button
                        size="xl"
                        variant="link"
                        nativeButton={false}
                        render={<a href={`mailto:${email}`} />}
                    >
                        {email}
                    </Button>
                </div>
            </div>
        </section>
    );
}
