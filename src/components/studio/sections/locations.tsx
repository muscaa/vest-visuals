"use client";

import { Eyebrow } from "@/components/eyebrow";
import { TextH1, TextP } from "@/components/typography";

interface Props {

}

export function StudioLocationsSection(props: Props) {
    return (
        <section id="locations" className="flex flex-col justify-center items-center px-6 py-16 bg-linear-to-b from-transparent to-success/20">
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow num="05">
                    Locații
                </Eyebrow>
                <div className="grid grid-cols-2 items-end gap-8">
                    <TextH1 size="title">
                        Lucrăm din Timișoara.
                        <br />
                        <i className="text-primary">Venim oriunde.</i>
                    </TextH1>
                    <TextP variant="muted" size="lead">
                        Studio principal în Timișoara — dar lucrăm cu plăcere oriunde povestea ne cheamă.
                    </TextP>
                </div>
            </div>
        </section>
    );
}
