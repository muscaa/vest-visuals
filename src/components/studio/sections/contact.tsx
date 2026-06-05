"use client";

import { Eyebrow } from "@/components/eyebrow";
import { TextH1, TextP } from "@/components/typography";

interface Props {

}

export function StudioContactSection(props: Props) {
    return (
        <section id="contact" className="flex flex-col justify-center items-center px-6 py-16">
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow num="06">
                    Contact
                </Eyebrow>
                <div className="grid grid-cols-2 items-end gap-8">
                    <TextH1 size="title">
                        Hai să facem ceva <i className="text-success">frumos</i> împreună.
                    </TextH1>
                    <TextP variant="muted" size="lead">
                    </TextP>
                </div>
            </div>
        </section>
    );
}
