import { SectionContact } from "../sections/contact";
import { SectionFAQ, SectionFAQProps } from "../sections/faq";
import { SectionOffers } from "../sections/offers";
import { SectionPreview } from "../sections/preview";

interface Props {
    faq: SectionFAQProps;
}

export function ServicePage(props: Props) {
    return (
        <div className="flex flex-col justify-center items-center size-full">
            <SectionPreview />
            <SectionOffers />
            <SectionFAQ {...props.faq} />
            <SectionContact />
        </div>
    );
}
