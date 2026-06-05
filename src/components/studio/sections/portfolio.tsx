"use client";

import { Eyebrow } from "@/components/eyebrow";
import { TextH1, TextP } from "@/components/typography";

interface Props {

}

export function StudioPortfolioSection(props: Props) {
    return (
        <section id="portfolio" className="flex flex-col justify-center items-center px-6 py-16">
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow num="02">
                    Lucrări
                </Eyebrow>
                <div className="grid grid-cols-2 items-end gap-8">
                    <TextH1 size="title">
                        Cinci categorii.
                        <br />
                        <i className="text-primary">O obsesie pentru lumină.</i>
                    </TextH1>
                    <TextP variant="muted" size="lead">
                        Selecții recente, alese pentru ritm și atmosferă, nu doar volum.
                    </TextP>
                </div>
            </div>
        </section>
    );
}
