import { InfoCard } from "../info-card";
import {
    Video,
    CircleCheckBig,
} from "lucide-react";
import { Button } from "../ui/button";

interface OffersCardProps {

}

function OffersCard(props: OffersCardProps) {
    return (
        <InfoCard>
            <Video className="text-primary size-16 mb-2" />
            <h3 className="mb-6 text-primary font-bold">VIDEOGRAFIE 4K</h3>
            <div className="flex items-end w-full my-4">
                <h1>700</h1>
                <h2 className="font-light">€</h2>
            </div>
            <div className="flex flex-col gap-4 w-full my-6 font-light">
                {
                    [
                        "fdgsnj sodfgj sondgf osdfj oksd lkjalk gjalkg jlk",
                        "sdfg ojasg jsdfojh sdiogfj okjg oks klgj klsj klk slkdfgj",
                        "dgfh ojoag oapofg ois jpgs jpoj gofpids jgspo s",
                        "dfghjiojsdf opskdgfpo",
                        "dfghogkjsdpo hksd kopihgj pk phosk pok",
                        "fsdgjjh joidsfk opsdgfk p",
                    ].map((value, index) => (
                        <div key={index}>
                            <CircleCheckBig className="text-primary float-left mr-2" />
                            <p>{value}</p>
                        </div>
                    ))
                }
            </div>
            <Button variant="default" size="xl" className="mt-6 w-full">
                Rezerva Videograful
            </Button>
        </InfoCard>
    );
}

interface Props {

}

export function SectionOffers(props: Props) {
    return (
        <section id="testimonials" className="flex justify-center items-center gap-8 px-2 py-16">
            <OffersCard>
            </OffersCard>
            <OffersCard>
            </OffersCard>
            <OffersCard>
            </OffersCard>
        </section>
    );
}
