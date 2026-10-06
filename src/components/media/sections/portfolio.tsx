import { Eyebrow } from "@/components/eyebrow";
import { Img } from "@/components/img";
import { TextH1, TextH2, TextP } from "@/components/typography";
import { cn } from "@shared/shadcn/utils";
import { Link, LinkOptions } from "@tanstack/react-router";

type PortfolioEntryProps = LinkOptions & {
    name: React.ReactNode;
    description: string;
    image: string;
    className?: string;
};

function PortfolioEntry({ name, description, image, className, ...props }: PortfolioEntryProps) {
    return (
        <Link
            {...props}
            className={cn(
                "group/portfolio-entry relative flex flex-col justify-end gap-1 p-6 aspect-square theme-dark",
                "rounded-2xl overflow-hidden transition-all bg-linear-to-b from-30% from-transparent to-black/80",
                className,
            )}
        >
            <Img
                src={image}
                alt="" // TODO
                className="absolute pointer-events-none -z-10 inset-0 size-full object-cover transition-all group-hover/portfolio-entry:scale-105 group-hover/portfolio-entry:brightness-75"
            />
            <TextH2 variant="foreground" size="lg-4">
                {name}
            </TextH2>
            <TextP className="mb-4">
                {description}
            </TextP>
        </Link>
    );
}

interface PortfolioSectionProps {

}

export function PortfolioSection(props: PortfolioSectionProps) {
    return (
        <section id="portfolio" className="flex flex-col justify-center items-center px-6 py-16">
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow num="02">
                    Lucrari alese
                </Eyebrow>
                <div className="grid grid-cols-2 items-end gap-8 mb-16">
                    <TextH1 size="lg-2">
                        Vezi cu <i className="text-success">ochii tăi.</i>
                    </TextH1>
                    <TextP variant="muted" size="md-3">
                        Câteva proiecte recente de care suntem mândri. Calitate înainte de cantitate, de fiecare dată.
                    </TextP>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <PortfolioEntry
                        to="/media"
                        name={(
                            <>
                                <i className="text-chart-1">Majorate</i>
                            </>
                        )}
                        description="O seară pe care n-o uiți prea curând"
                        image="https://s3.vestvisuals.ro/portfolio/b4dwo04rs8ta7na0zzbflpuv/medium"
                        className="sm:aspect-auto sm:col-span-2"
                    />
                    <PortfolioEntry
                        to="/media"
                        name={(
                            <>
                                Ședințe <i className="text-success">Foto</i>
                            </>
                        )}
                        description="Portrete în lumină naturală"
                        image="https://s3.vestvisuals.ro/portfolio/l1xhekvxbakado1gh18v7ged/medium"
                    />
                    <PortfolioEntry
                        to="/media"
                        name={(
                            <>
                                <i className="text-chart-1">Automotive</i>
                            </>
                        )}
                        description="Mașini care arată ca-n reclame"
                        image="https://s3.vestvisuals.ro/portfolio/z34362mh88we0urk97td85ax/medium"
                    />
                    <PortfolioEntry
                        to="/media"
                        name={(
                            <>
                                <i className="text-success">Imobiliare</i>
                            </>
                        )}
                        description="Proprietăți care se vând repede"
                        image="https://s3.vestvisuals.ro/portfolio/f64uxutmybs9iuc08j1cp73y/medium"
                    />
                    <PortfolioEntry
                        to="/media"
                        name={(
                            <>
                                Promovare <i className="text-chart-1">Firme</i>
                            </>
                        )}
                        description="Conținut comercial cinematic"
                        image="https://s3.vestvisuals.ro/portfolio/vznmbjtg6w9lltk0uyr5ex2e/medium"
                    />
                </div>
            </div>
        </section>
    );
}
