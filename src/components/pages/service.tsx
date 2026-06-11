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
import { Main } from "../main";

interface Props {
    preview: SectionPreviewProps;
    price: SectionPriceProps;
    faq: SectionFAQProps;
}

export function ServicePage(props: Props) {
    return (
        <Main className="justify-center items-center">
            <SectionPreview {...props.preview} />
            <SectionPrice {...props.price} />
            <Separator />
            <SectionFAQ {...props.faq} />
        </Main>
    );
}
