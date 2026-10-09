import { Comparison } from "@/components/comparison";
import { Eyebrow } from "@/components/eyebrow";
import { Img } from "@/components/img";
import { TextH1, TextP } from "@/components/typography";

interface BeforeAndAfterSectionProps {}

export function BeforeAndAfterSection(props: BeforeAndAfterSectionProps) {
    return (
        <section
            id="before-and-after"
            className="flex flex-col justify-center items-center px-6 py-16 bg-linear-to-b from-primary/20 to-transparent"
        >
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow>Editarea</Eyebrow>
                <div className="grid grid-cols-2 items-end gap-8 mb-16">
                    <TextH1 size="lg-2">
                        Același cadru.{" "}
                        <i className="text-primary">Cu totul altă senzație.</i>
                    </TextH1>
                    <TextP variant="muted" size="md-3">
                        Editarea bună e partea despre care nu vorbește nimeni,
                        dar pe care o observă toți. Trage de cursor și vezi cum
                        un cadru brut devine imaginea finală, totul stă în
                        culoare, contrast și atmosferă.
                    </TextP>
                </div>
                <Comparison
                    before={
                        <Img
                            src="https://cdn0.vestvisuals.ro/assets/yneoo6rvga4s61g1wilygf77/large"
                            alt="Before"
                            className="size-full object-cover"
                        />
                    }
                    after={
                        <Img
                            src="https://cdn0.vestvisuals.ro/assets/xsxzhzldm3y0px8t1md9xc2w/large"
                            alt="After"
                            className="size-full object-cover"
                        />
                    }
                    className="w-full aspect-video"
                />
            </div>
        </section>
    );
}
