import { InfoCard } from "../info-card";
import { cn } from "@shared/shadcn/lib/utils";
import { ButtonLink, Icon } from "../snippets";
import { CONTACT } from "@shared/i18n";

interface ExtraCardProps {
    title: string;
    price: string;
    currency: string;
}

function ExtraCard(props: ExtraCardProps) {
    return (
        <InfoCard
            className="flex justify-between w-xs sm:w-sm p-4 border-l-4 border-l-primary"
        >
            <span>{props.title}</span>
            <div className="items-end">
                <span className="font-extrabold tabular-nums">{props.price}</span>
                <span className="font-light">{props.currency}</span>
            </div>
        </InfoCard>
    );
}

interface OfferCardProps {
    icon: Icon;
    title: string;
    price: string;
    currency: string;
    features: [description: string, icon?: Icon][];
    button: string;
    highlight?: string;
    accent?: boolean;
}

function OfferCard(props: OfferCardProps) {
    return (
        <InfoCard
            className="flex flex-col w-xs sm:w-sm"
            extraClassName={props.accent ? "ring-2 ring-primary" : ""}
        >
            {
                props.highlight && (
                    <span className={`absolute left-1/2 -translate-x-1/2 -top-2.5 h-5 p5 px-3 bg-primary text-primary-foreground`}>
                        {props.highlight}
                    </span>
                )
            }
            <div className="flex flex-col justify-center items-center gap-2 mb-10">
                <props.icon className="text-primary size-16" />
                <h3 className="text-primary font-bold font-mono text-center">{props.title}</h3>
            </div>
            <div className="flex items-end w-full my-4">
                <span className="h1 tabular-nums">{props.price}</span>
                <span className="p2 font-light">{props.currency}</span>
            </div>
            <div className="flex flex-col gap-4 w-full my-6 font-light">
                {
                    props.features.map(([description, Icon], index) => (
                        <div key={index}>
                            {
                                Icon && (
                                    <Icon className="text-primary float-left mr-2" />
                                ) || (
                                    <span className="text-primary float-left mr-2 size-6" />
                                )
                            }
                            <p>{description}</p>
                        </div>
                    ))
                }
            </div>
            <ButtonLink
                href={CONTACT()}
                variant={props.accent ? "default" : "secondary"}
                size="lg"
                className="mt-6 w-full"
            >
                {props.button}
            </ButtonLink>
        </InfoCard>
    );
}

export interface SectionPriceProps {
    title: string;
    offers: OfferCardProps[];
    extra?: {
        title: string;
        offers: ExtraCardProps[];
    };
    className?: string;
}

export function SectionPrice(props: SectionPriceProps) {
    return (
        <section
            id="price"
            className={cn("flex flex-col justify-center items-center gap-8 p-8 w-full", props.className)}
        >
            <h2 className="font-mono text-center my-8">{props.title}</h2>
            <div className="flex flex-wrap max-w-8xl w-full justify-center gap-8">
                {
                    props.offers.map((offer, index) => (
                        <OfferCard
                            key={index}
                            {...offer}
                        />
                    ))
                }
            </div>
            {
                props.extra && (
                    <>
                        <h3 className="font-mono text-center">{props.extra.title}</h3>
                        <div className="flex flex-wrap max-w-8xl w-full justify-center gap-4">
                            {
                                props.extra.offers.map((offer, index) => (
                                    <ExtraCard
                                        key={index}
                                        {...offer}
                                    />
                                ))
                            }
                        </div>
                    </>
                )
            }
        </section>
    );
}
