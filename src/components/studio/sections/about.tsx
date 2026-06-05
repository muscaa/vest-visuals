"use client";

import { Eyebrow } from "@/components/eyebrow";
import { TextH1, TextP } from "@/components/typography";

interface Props {

}

export function StudioAboutSection(props: Props) {
    return (
        <section id="about" className="flex flex-col justify-center items-center px-6 py-16">
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow num="01">
                    Studio
                </Eyebrow>
                <div className="grid grid-cols-2 items-end gap-8">
                    <TextH1 size="title">
                        O echipă de doi.
                        <br />
                        <i className="text-success">O singură viziune.</i>
                    </TextH1>
                    <TextP variant="muted" size="lead">
                        Suntem o echipă pasionată de fotografie și videografie, dedicată să transformăm momente obișnuite în amintiri vizuale memorabile. Credem în emoție, naturalețe și profesionalism. Lucrăm cu echipament profesional și cu obsesia de a livra fiecare proiect așa cum am vrea să primim noi unul — la timp, atent editat, fără compromisuri.
                    </TextP>
                </div>
            </div>
        </section>
    );
}
