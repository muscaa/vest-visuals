import { m } from "@shared/paraglide/messages";
import { IconArrowUpRight } from "@tabler/icons-react";
import { Eyebrow } from "@/components/eyebrow";
import { Img } from "@/components/img";
import { TextH1, TextH2, TextP, TextSpan } from "@/components/typography";
import { Button } from "@/components/ui/button";

// the description is a message function, called while rendering
interface Project {
    name: string;
    description: () => string;
    image: string;
    url: string;
}

const projects: Project[] = [
    {
        name: "Aerionic",
        description: m.software_project_aerionic,
        image: "/portfolio/aerionic.webp",
        url: "https://aerionic.co.uk",
    },
];

function ProjectEntry({ project }: { project: Project }) {
    return (
        <article className="group/project grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] items-center gap-10 lg:gap-16">
            <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="overflow-hidden rounded-lg border shadow-sm"
            >
                <Img
                    src={project.image}
                    alt={m.software_portfolio_screenshot({ name: project.name })}
                    className="w-full aspect-16/10 object-cover object-top transition-all duration-300 group-hover/project:scale-102"
                />
            </a>
            <div className="flex flex-col items-start">
                <TextH2 size="md-1" className="mb-4">
                    {project.name}
                </TextH2>
                <TextP variant="muted" className="mb-8">
                    {project.description()}
                </TextP>
                <Button
                    variant="outline"
                    nativeButton={false}
                    render={<a href={project.url} target="_blank" rel="noopener noreferrer" />}
                >
                    {m.software_portfolio_view()}
                    <IconArrowUpRight data-icon="inline-end" />
                </Button>
            </div>
        </article>
    );
}

interface PortfolioSectionProps { }

export function PortfolioSection(props: PortfolioSectionProps) {
    return (
        <section
            id="portofoliu"
            className="flex flex-col justify-center items-center px-6 py-16 bg-muted"
        >
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow>{m.common_portfolio()}</Eyebrow>
                <TextH1 className="mb-4 max-w-[20ch]">{m.software_portfolio_title()}</TextH1>
                <TextP variant="muted" size="md-3" className="max-w-[56ch] mb-14">
                    {m.software_portfolio_description()}
                </TextP>
                <div className="flex flex-col gap-8">
                    {
                        projects.map((project) => (
                            <ProjectEntry key={project.name} project={project} />
                        ))
                    }
                </div>
            </div>
        </section>
    );
}
