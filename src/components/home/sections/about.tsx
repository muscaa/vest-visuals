import WorkingTogether from "@/components/illustrations/working-together.svg?react";
import { Eyebrow } from "@/components/eyebrow";
import { TextH2, TextP, TextSpan } from "@/components/typography";
import { Separator } from "@/components/ui/separator";

const facts = [
    { value: "2025", label: "Activi din" },
    { value: "10+", label: "Proiecte livrate" },
    { value: "2+", label: "Țări cu clienți" },
    { value: "24h", label: "Timp de răspuns" },
];

interface AboutSectionProps {}

export function AboutSection(props: AboutSectionProps) {
    return (
        <section
            id="despre"
            className="flex flex-col justify-center items-center px-6 py-16 bg-linear-to-b from-muted to-transparent"
        >
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow>Despre noi</Eyebrow>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] items-center gap-8 md:gap-16">
                    <WorkingTogether aria-hidden className="size-72 justify-self-center" />
                    <div className="flex flex-col gap-6">
                        <TextH2 size="lg-3">Mai multe domenii, aceleași standarde.</TextH2>
                        <TextP variant="muted" size="md-3" className="max-w-[52ch]">
                            Vest Visuals a pornit în Timișoara cu mai multe domenii
                            deodată și lucrează cu clienți din România și din toată
                            Europa. Oricare ar fi proiectul, îl tratăm la fel:
                            înțelegem întâi ce ai nevoie, lucrăm atent și rămânem
                            alături și după predare.
                        </TextP>
                    </div>
                </div>
                <Separator className="my-12" />
                <dl className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
                    {facts.map((fact) => (
                        <div key={fact.label} className="flex flex-col-reverse gap-2">
                            <TextSpan render={<dt />} variant="muted" size="sm-3" font="mono-1">
                                {fact.label}
                            </TextSpan>
                            <TextSpan render={<dd />} size="lg-4">
                                {fact.value}
                            </TextSpan>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
