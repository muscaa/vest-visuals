import { m } from "@shared/paraglide/messages";
import { Link } from "@tanstack/react-router";
import { cn } from "@shared/shadcn/utils";
import type { LinkOptions } from "@tanstack/react-router";
import { Eyebrow } from "@/components/eyebrow";
import { Img } from "@/components/img";
import { TextH2, TextH3, TextP, TextSpan } from "@/components/typography";

// text is stored as message functions, called while rendering
interface WorkItem {
    id: string;
    title: () => string;
    division: string;
    image: string;
    alt: () => string;
    /** which part of the image stays visible when cropped */
    position?: string;
    link: LinkOptions;
}

const work: WorkItem[] = [
    {
        id: "wedding",
        title: m.home_work_wedding,
        division: "Media",
        image: "https://s3.vestvisuals.ro/portfolio/b4dwo04rs8ta7na0zzbflpuv/medium",
        alt: m.home_work_wedding_alt,
        link: { to: "/media/services/wedding" },
    },
    {
        id: "aerionic",
        title: () => "Aerionic",
        division: "Software",
        image: "/portfolio/aerionic.webp",
        alt: m.home_work_aerionic_alt,
        position: "object-left",
        link: { to: "/software", hash: "portofoliu" },
    },
    {
        id: "automotive",
        title: m.home_work_automotive,
        division: "Media",
        image: "https://s3.vestvisuals.ro/portfolio/z34362mh88we0urk97td85ax/medium",
        alt: m.home_work_automotive_alt,
        link: { to: "/media/services/automotive" },
    },
    {
        id: "business-promotion",
        title: m.home_work_business,
        division: "Media",
        image: "https://s3.vestvisuals.ro/portfolio/vznmbjtg6w9lltk0uyr5ex2e/medium",
        alt: m.home_work_business_alt,
        link: { to: "/media/services/business-promotion" },
    },
];

interface WorkSectionProps {}

export function WorkSection(props: WorkSectionProps) {
    return (
        <section
            id="lucrari"
            className="flex flex-col justify-center items-center px-6 py-16"
        >
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow>{m.home_work_eyebrow()}</Eyebrow>
                <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-8 mb-16">
                    <TextH2 size="lg-3">{m.home_work_title()}</TextH2>
                    <TextP variant="muted" size="md-3">
                        {m.home_work_description()}
                    </TextP>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {work.map((item) => (
                        <Link
                            key={item.id}
                            {...item.link}
                            className="group/work flex flex-col gap-3"
                        >
                            <div className="overflow-hidden rounded-2xl shadow-md">
                                <Img
                                    src={item.image}
                                    alt={item.alt()}
                                    className={cn("w-full aspect-4/5 object-cover transition-all duration-300 group-hover/work:scale-105", item.position)}
                                />
                            </div>
                            <div className="flex flex-col">
                                <TextSpan variant="muted" size="sm-3" font="mono-1">
                                    {item.division}
                                </TextSpan>
                                <TextH3 size="md-3" className="transition-colors group-hover/work:text-primary">
                                    {item.title()}
                                </TextH3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
