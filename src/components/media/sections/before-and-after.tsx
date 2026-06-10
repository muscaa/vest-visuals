"use client";

import { Comparison } from "@/components/comparison";
import { Eyebrow } from "@/components/eyebrow";
import { Img } from "@/components/img";
import { TextH1, TextP } from "@/components/typography";
import { useTranslations } from "next-intl";

interface Props {

}

export function MediaBeforeAndAfterSection(props: Props) {
    const t = useTranslations("Media.Page.home.before-and-after");

    return (
        <section id="before-and-after" className="flex flex-col justify-center items-center px-6 py-16 bg-linear-to-b from-primary/20 to-transparent">
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow num="03">
                    {t("eyebrow")}
                </Eyebrow>
                <div className="grid grid-cols-2 items-end gap-8 mb-16">
                    <TextH1 size="title">
                        {
                            t.rich("title", {
                                accent: (chunks) => (
                                    <i className="text-primary">{chunks}</i>
                                )
                            })
                        }
                    </TextH1>
                    <TextP variant="muted" size="lead">
                        {t("description")}
                    </TextP>
                </div>
                <Comparison
                    c1={(
                        <Img
                            src="https://cdn0.vestvisuals.ro/assets/yneoo6rvga4s61g1wilygf77/large"
                            alt="Before"
                            className="size-full object-cover"
                        />
                    )}
                    c2={(
                        <Img
                            src="https://cdn0.vestvisuals.ro/assets/xsxzhzldm3y0px8t1md9xc2w/large"
                            alt="After"
                            className="size-full object-cover"
                        />
                    )}
                    className="w-full aspect-video"
                />
            </div>
        </section>
    );
}
