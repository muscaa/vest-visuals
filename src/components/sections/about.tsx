import { Reveal } from "@/components/animations/reveal";

export function SectionAbout() {
    return (
        <section id="about" className="flex flex-col justify-center items-center gap-4 p-2">
            <Reveal delay={200}>
                <h1>Cine suntem noi?</h1>
            </Reveal>
            <div className="flex flex-col justify-center items-center gap-2">
                <Reveal delay={400}>
                    <h4>oameni</h4>
                </Reveal>
            </div>
        </section>
    );
}
