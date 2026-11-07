import { m } from "@shared/paraglide/messages";
import { Link } from "@tanstack/react-router";
import { Eyebrow } from "@/components/eyebrow";
import { TextH1, TextP } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Rich } from "@/components/rich";

interface CTASectionProps { }

export function CTASection(props: CTASectionProps) {
    return (
        <section
            id="cta"
            className="flex flex-col justify-center items-center px-6 py-16"
        >
            <div className="flex flex-col items-center max-w-7xl w-full">
                <Eyebrow align="center">
                    {m.media_cta_eyebrow()}
                </Eyebrow>
                <TextH1 size="lg-2" className="mb-8 text-center">
                    <Rich message={m.media_cta_title} />
                </TextH1>
                <TextP
                    variant="muted"
                    size="md-3"
                    className="max-w-[58ch] mb-16 text-center"
                >
                    {m.media_cta_description()}
                </TextP>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button
                        size="xl"
                        nativeButton={false}
                        render={<Link to="/media/contact" />}
                    >
                        {m.media_cta_contact_page()}
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
