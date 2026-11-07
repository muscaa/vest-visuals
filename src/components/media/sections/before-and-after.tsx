import { m } from "@shared/paraglide/messages";
import { asset } from "@shared/assets";
import { Comparison } from "@/components/comparison";
import { Eyebrow } from "@/components/eyebrow";
import { Img } from "@/components/img";
import { TextH1, TextP } from "@/components/typography";
import { Rich } from "@/components/rich";

interface BeforeAndAfterSectionProps {}

export function BeforeAndAfterSection(props: BeforeAndAfterSectionProps) {
    return (
        <section
            id="before-and-after"
            className="flex flex-col justify-center items-center px-6 py-16 bg-linear-to-b from-primary/20 to-transparent"
        >
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow>{m.media_editing_eyebrow()}</Eyebrow>
                <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-8 mb-16">
                    <TextH1 size="lg-2">
                        <Rich message={m.media_editing_title} />
                    </TextH1>
                    <TextP variant="muted" size="md-3">
                        {m.media_editing_description()}
                    </TextP>
                </div>
                <Comparison
                    before={
                        <Img
                            src={asset("media-editing-before", "large")}
                            alt={m.media_editing_before()}
                            className="size-full object-cover"
                        />
                    }
                    after={
                        <Img
                            src={asset("media-editing-after", "large")}
                            alt={m.media_editing_after()}
                            className="size-full object-cover"
                        />
                    }
                    className="w-full aspect-video"
                />
            </div>
        </section>
    );
}
