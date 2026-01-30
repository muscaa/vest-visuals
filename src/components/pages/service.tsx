import { SectionOffers } from "../sections/offers";

interface Props {

}

export function ServicePage(props: Props) {
    return (
        <div className="flex flex-col justify-center items-center size-full p-8">
            <SectionOffers />
        </div>
    );
}
