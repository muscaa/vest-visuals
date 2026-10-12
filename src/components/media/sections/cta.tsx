import { Link } from "@tanstack/react-router";
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
                <Eyebrow align="center">
                    Saluta-ne
                </Eyebrow>
                <TextH1 size="lg-2" className="mb-8 text-center">
                    Ai ceva în minte?{" "}
                    <i className="text-primary">Hai să vorbim.</i>
                </TextH1>
                <TextP
                    variant="muted"
                    size="md-3"
                    className="max-w-[58ch] mb-16 text-center"
                >
                    Trimite-ne câteva detalii despre ce ai nevoie și primești
                    răspuns într-o zi lucrătoare.
                </TextP>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button
                        size="xl"
                        nativeButton={false}
                        render={<Link to="/media/contact" />}
                    >
                        Mergi la pagina de contact
                    </Button>
                    <Button size="xl" variant="link">
                        contact@vestvisuals.ro
                    </Button>
                </div>
            </div>
        </section>
    );
}
