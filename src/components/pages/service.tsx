import {
    SectionPreview,
    SectionPreviewProps,
} from "../sections/preview";
import {
    SectionPrice,
    SectionPriceProps,
} from "../sections/price";
import {
    SectionFAQ,
    SectionFAQProps,
} from "../sections/faq";
import { Separator } from "../ui/separator";

interface Props {
    preview: SectionPreviewProps;
    price: SectionPriceProps;
    faq: SectionFAQProps;
}

export function ServicePage(props: Props) {
    return (
        <div className="flex flex-col justify-center items-center size-full">
            <SectionPreview {...props.preview} />
            <SectionPrice {...props.price} />
            <Separator />
            <SectionFAQ {...props.faq} />
        </div>
    );
}
