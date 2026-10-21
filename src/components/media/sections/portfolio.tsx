import { m } from "@shared/paraglide/messages";
import { cn } from "@shared/shadcn/utils";
import { Link } from "@tanstack/react-router";
import { findMediaService } from "../service";
import type { LinkOptions } from "@tanstack/react-router";
import type { RichProps } from "@/components/rich";
import type { MediaServiceId } from "../service";
import { Eyebrow } from "@/components/eyebrow";
import { Img } from "@/components/img";
import { TextH1, TextH2, TextP } from "@/components/typography";
import { Rich } from "@/components/rich";

type PortfolioEntryProps = LinkOptions & {
    name: React.ReactNode;
    description: string;
    image: string;
    alt: string;
    className?: string;
};

function PortfolioEntry({
    name,
    description,
    image,
    alt,
    className,
    ...props
}: PortfolioEntryProps) {
    return (
        <Link
            {...props}
            className={cn(
                "group/portfolio-entry relative flex flex-col justify-end gap-1 p-6 theme-dark",
                "rounded-2xl overflow-hidden transition-all bg-linear-to-b from-30% from-transparent to-black/80",
                className,
            )}
        >
            <Img
                src={image}
                alt={alt}
                className="absolute pointer-events-none -z-10 inset-0 size-full object-cover transition-all group-hover/portfolio-entry:scale-105 group-hover/portfolio-entry:brightness-75"
            />
            <TextH2 variant="foreground" size="lg-4">
                {name}
            </TextH2>
            <TextP className="mb-4">{description}</TextP>
        </Link>
    );
}

interface PortfolioItem {
    service: MediaServiceId;
    /** the portfolio category's tag, as set in the admin */
    category: string;
    /** the name with its accent word, from the messages */
    title: RichProps["message"];
    description: () => string;
    image: string;
    className: string;
}

// text is stored as message functions, called while rendering
const items: PortfolioItem[] = [
    {
        service: "wedding",
        category: "nunta",
        title: m.media_portfolio_wedding,
        description: m.media_portfolio_event_description,
        image: "https://s3.vestvisuals.ro/portfolio/b4dwo04rs8ta7na0zzbflpuv/medium",
        className: "order-1 sm:col-span-2",
    },
    {
        service: "christening",
        category: "botez",
        title: m.media_portfolio_christening,
        description: m.media_portfolio_event_description,
        image: "https://s3.vestvisuals.ro/portfolio/b4dwo04rs8ta7na0zzbflpuv/medium",
        className: "order-2",
    },
    {
        service: "18th-birthday",
        category: "majorat",
        title: m.media_portfolio_18th_birthday,
        description: m.media_portfolio_event_description,
        image: "https://s3.vestvisuals.ro/portfolio/b4dwo04rs8ta7na0zzbflpuv/medium",
        className: "order-3",
    },
    {
        service: "photo-session",
        category: "sedinta-foto",
        title: m.media_portfolio_photo_session,
        description: m.media_portfolio_photo_session_description,
        image: "https://s3.vestvisuals.ro/portfolio/l1xhekvxbakado1gh18v7ged/medium",
        className: "order-4",
    },
    {
        service: "automotive",
        category: "auto",
        title: m.media_portfolio_automotive,
        description: m.media_portfolio_automotive_description,
        image: "https://s3.vestvisuals.ro/portfolio/z34362mh88we0urk97td85ax/medium",
        className: "order-5",
    },
    {
        service: "real-estate",
        category: "imobiliare",
        title: m.media_portfolio_real_estate,
        description: m.media_portfolio_real_estate_description,
        image: "https://s3.vestvisuals.ro/portfolio/f64uxutmybs9iuc08j1cp73y/medium",
        className: "order-6",
    },
    {
        service: "business-promotion",
        category: "promovare-afaceri",
        title: m.media_portfolio_business_promotion,
        description: m.media_portfolio_business_promotion_description,
        image: "https://s3.vestvisuals.ro/portfolio/vznmbjtg6w9lltk0uyr5ex2e/medium",
        className: "order-7 lg:col-span-2",
    },
];

interface PortfolioSectionProps { }

export function PortfolioSection(props: PortfolioSectionProps) {
    return (
        <section
            id="portfolio"
            className="flex flex-col justify-center items-center px-6 py-16"
        >
            <div className="flex flex-col max-w-7xl w-full @container">
                <Eyebrow>{m.media_portfolio_eyebrow()}</Eyebrow>
                <div className="grid grid-cols-2 items-end gap-8 mb-16">
                    <TextH1 size="lg-2">
                        <Rich message={m.media_portfolio_title} />
                    </TextH1>
                    <TextP variant="muted" size="md-3">
                        {m.media_portfolio_description()}
                    </TextP>
                </div>
                <div
                    className="
                        grid gap-4
                        [--cols:1] sm:[--cols:2] lg:[--cols:3]
                        grid-cols-[repeat(var(--cols),minmax(0,1fr))]
                        auto-rows-[calc((100cqw-(var(--cols)-1)*1rem)/var(--cols)*3/4)]
                    "
                >
                    {
                        items.map((item) => {
                            const { name } = findMediaService(item.service);

                            return (
                                <PortfolioEntry
                                    key={item.category}
                                    to="/media/portfolio/$category"
                                    params={{ category: item.category }}
                                    name={<Rich message={item.title} />}
                                    description={item.description()}
                                    image={item.image}
                                    alt={m.media_portfolio_alt({ service: name() })}
                                    className={item.className}
                                />
                            );
                        })
                    }
                </div>
            </div>
        </section>
    );
}
