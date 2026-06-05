"use client";

import { Eyebrow } from "@/components/eyebrow";
import { ButtonLink } from "@/components/snippets";
import { TextH1, TextP } from "@/components/typography";

interface Props {

}

export function StudioContactSection(props: Props) {
    return (
        <section id="contact" className="flex flex-col justify-center items-center px-6 py-16">
            <div className="flex flex-col items-center max-w-7xl w-full">
                <Eyebrow num="06" className="max-w-[58ch] w-full">
                    Contact
                </Eyebrow>
                <TextH1 size="title" className="mb-8 text-center">
                    Hai să facem ceva <i className="text-success">frumos</i> împreună.
                </TextH1>
                <TextP variant="muted" size="lead" className="max-w-[58ch] mb-16 text-center">
                    Spune-ne ce servicii cauți și îți răspundem într-o zi lucrătoare. Dacă suntem potriviți, stabilim un apel scurt; dacă nu, te îndrumăm bucuroși spre cineva care e.
                </TextP>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ButtonLink to="/contact" size="lg">
                        Mergi la pagina de contact
                    </ButtonLink>
                    <ButtonLink href="mailto:contact@vestvisuals.ro" size="lg" variant="link">
                        contact@vestvisuals.ro
                    </ButtonLink>
                </div>
            </div>
        </section>
    );
}
