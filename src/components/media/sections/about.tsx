import { MemberCard } from "@/components/cards/member";
import { Eyebrow } from "@/components/eyebrow";
import { TextH1, TextP } from "@/components/typography";

interface AboutSectionProps {

}

export function AboutSection(props: AboutSectionProps) {
    return (
        <section id="about" className="flex flex-col justify-center items-center px-6 py-16 bg-linear-to-br from-transparent to-muted">
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow num="01">
                    Cine suntem
                </Eyebrow>
                <div className="grid grid-cols-2 items-end gap-8 mb-16">
                    <TextH1 size="lg-2">
                        Studio mic, <i className="text-primary">atenție maximă.</i>
                    </TextH1>
                    <TextP variant="muted" size="md-3">
                        Am pornit Vest Visuals pentru că iubim ce facem și suntem pretențioși cu felul în care iese. De la primul mesaj până la galeria finală, vorbești cu oamenii care chiar stau în spatele aparatului și al editării. Luăm proiectele cărora le putem da toată atenția, așa că filmarea ta nu se simte nici pe fugă, nici banală.
                    </TextP>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <MemberCard
                        image="https://cdn0.vestvisuals.ro/assets/xsxzhzldm3y0px8t1md9xc2w/medium"
                        firstName="Mihail"
                        lastName="Musca"
                        role="Fotograf principal & editor"
                        skills={[
                            "foto",
                            "edit foto",
                            "edit video",
                        ]}
                        email="mihail@vestvisuals.ro"
                        instagram="musca.mihail"
                    />
                    <MemberCard
                        image="https://cdn0.vestvisuals.ro/assets/mw9i6zen7sd4tlxyl6d34c8o/medium"
                        firstName="David"
                        lastName="Boștină"
                        role="Videograf principal & colorist"
                        skills={[
                            "video",
                            "foto",
                            "edit video",
                        ]}
                        email="david@vestvisuals.ro"
                        instagram="david.bostina"
                    />
                </div>
            </div>
        </section>
    );
}
