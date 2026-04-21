import { cn } from "@shared/shadcn/lib/utils";
import { Comparison } from "../comparison";
import { Img } from "../snippets";

export interface SectionBeforeAndAfterProps {
    title: string;
    className?: string;
}

export function SectionBeforeAndAfter(props: SectionBeforeAndAfterProps) {
    return (
        <section
            id="about"
            className={cn("flex not-lg:flex-col justify-center items-center gap-16 p-8 lg:py-32 w-full bg-background3", props.className)}
        >
            <div className="flex flex-col gap-4 max-w-128 text-justify">
                <h2 className="font-mono mb-8 not-lg:text-center">{props.title}</h2>
                <p>
                    Post-producția este etapa în care viziunea noastră prinde cu adevărat viață. Nu ne rezumăm doar la a „tăia” cadre sau la a aplica un filtru standard; noi modelăm materia primă pentru a crea o poveste vizuală coerentă și de impact. Prin procese meticuloase de color grading, corecție audio și montaj dinamic, transformăm fiecare cadru brut într-o piesă de portofoliu.
                </p>
                <p>
                    Folosim tehnologie de ultimă oră pentru a ne asigura că produsul final are acea estetică cinematică pe care o cauți. Atenția noastră la detalii se reflectă în fluiditatea tranzițiilor și în modul în care sunetul completează imaginea, oferind o experiență senzorială completă. Fie că este vorba despre un eveniment privat, un spot publicitar sau un proiect creativ, tratăm fiecare pixel cu respectul cuvenit. Rezultatul? Un material rafinat, echilibrat și gata să impresioneze orice audiență, păstrând în același timp autenticitatea momentelor surprinse.
                </p>
            </div>
            <Comparison
                c1={(
                    <Img
                        src="https://cdn0.vestvisuals.ro/assets/mw9i6zen7sd4tlxyl6d34c8o/large"
                        alt="Before"
                        className="size-full object-cover"
                    />
                )}
                c2={(
                    <Img
                        src="https://cdn0.vestvisuals.ro/assets/ikhrfkmpuq731hm81z4qfo5n/large"
                        alt="After"
                        className="size-full object-cover"
                    />
                )}
                className="min-w-128 max-w-192 w-full h-128"
            />
        </section>
    );
}
