import { SectionContact } from "../sections/contact";
import { SectionFAQ, SectionFAQProps } from "../sections/faq";
import { SectionOffers } from "../sections/offers";
import { SectionPreview, SectionPreviewProps } from "../sections/preview";

interface Props {
    preview: SectionPreviewProps;
    faq: SectionFAQProps;
}

export function ServicePage(props: Props) {
    return (
        <div className="flex flex-col justify-center items-center size-full">
            <SectionPreview {...props.preview} />
            <SectionOffers />
            <SectionFAQ {...props.faq} />
            <SectionContact />
        </div>
    );
}
