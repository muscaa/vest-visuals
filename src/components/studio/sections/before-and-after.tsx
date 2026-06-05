"use client";

import { Eyebrow } from "@/components/eyebrow";
import { TextH1, TextP } from "@/components/typography";

interface Props {

}

export function StudioBeforeAndAfterSection(props: Props) {
    return (
        <section id="before-and-after" className="flex flex-col justify-center items-center px-6 py-16">
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow num="03">
                    Post-producție
                </Eyebrow>
                <div className="grid grid-cols-2 items-end gap-8">
                    <TextH1 size="title">
                        Înainte. <i className="text-primary">După.</i>
                    </TextH1>
                    <TextP variant="muted" size="lead">
                        Aceeași imagine, două lumi. Trage de cursor și vezi ce face grading-ul nostru — contrast, culoare, atmosferă. Aici prinde viziunea cu adevărat viață.
                    </TextP>
                </div>
            </div>
        </section>
    );
}
