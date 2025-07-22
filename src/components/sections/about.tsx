import { Reveal } from "@/components/animations/reveal";

export function SectionAbout() {
    return (
        <section id="about" className="flex flex-col justify-center items-center gap-8 px-2 py-16 bg-background2">
            <Reveal delay={200}>
                <h1>Cine suntem noi?</h1>
            </Reveal>
            <Reveal delay={400}>
                <h4 className="max-w-4xl text-center">
                    Suntem o echipă pasionată de fotografie și videografie,
                    dedicată să transformăm momentele speciale în amintiri
                    de neuitat. Cu o abordare creativă și atenție la detalii,
                    spunem povești vizuale autentice, indiferent că este vorba
                    de o nuntă, un eveniment corporate sau ceva personal.
                    Credem în emoție, naturalețe și profesionalism.
                </h4>
            </Reveal>
        </section>
    );
}
