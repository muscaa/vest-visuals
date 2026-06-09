"use client";

import { Eyebrow } from "@/components/eyebrow";
import { Img } from "@/components/img";
import { InfoCard } from "@/components/info-card";
import { TextH1, TextH2, TextLink, TextP, TextSpan } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SiInstagram } from "@icons-pack/react-simple-icons";
import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";

interface MemberCardProps {
    image: string;
    firstName: string;
    lastName: string;
    description: string;
    role: string;
    skills: string[];
    email: string;
    instagram: string;
}

function MemberCard(props: MemberCardProps) {
    return (
        <InfoCard className="group/member grid grid-cols-1 xs:grid-cols-[0.8fr_1.2fr] p-0 gap-0 odd:hover:ring-primary even:hover:ring-success">
            <Img
                src={props.image}
                alt="Member Image"
                className="w-full not-xs:aspect-8/7 xs:h-full object-cover transition-all group-hover/member:scale-105"
            />
            <div className="flex flex-col p-8 gap-2">
                <TextH2 size="h1">
                    {props.firstName}
                    {" "}
                    <i className="transition-all text-muted-foreground group-odd/member:group-hover/member:text-primary group-even/member:group-hover/member:text-success">{props.lastName}</i>
                </TextH2>
                <TextSpan variant="muted" size="label" font="mono1">
                    {props.role}
                </TextSpan>
                <TextP variant="muted" className="text-pretty my-4">
                    {props.description}
                </TextP>
                <div className="flex flex-wrap gap-2">
                    {
                        props.skills.map((value, index) => (
                            <Badge key={index} variant="outline" className="font-mono uppercase">
                                {value}
                            </Badge>
                        ))
                    }
                </div>
                <Separator className="mt-10 mb-2" />
                <TextLink href={`mailto:${props.email}`} variant="ghost" className="inline-flex items-center gap-1">
                    <Mail className="text-muted-foreground" />
                    {props.email}
                </TextLink>
                <TextLink href={`https://www.instagram.com/${props.instagram}`} variant="ghost" className="inline-flex items-center gap-1">
                    <SiInstagram className="text-muted-foreground" />
                    {props.instagram}
                </TextLink>
            </div>
        </InfoCard>
    );
}

interface Props {

}

export function StudioAboutSection(props: Props) {
    const t = useTranslations("Studio.Page.home.about");

    return (
        <section id="about" className="flex flex-col justify-center items-center px-6 py-16 bg-linear-to-br from-transparent to-muted">
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow num="01">
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <MemberCard
                        image="https://cdn0.vestvisuals.ro/assets/xsxzhzldm3y0px8t1md9xc2w/medium"
                        firstName="Mihail"
                        lastName="Musca"
                        description={t("description-1")}
                        role="Fotograf principal & editor"
                        skills={[
                            "foto",
                            "edit foto",
                            "edit video",
                        ]}
                        email="mihail@vestvisuals.ro"
                        instagram="musca.mihail"
                    />
                    <MemberCard
                        image="https://cdn0.vestvisuals.ro/assets/mw9i6zen7sd4tlxyl6d34c8o/medium"
                        firstName="David"
                        lastName="Boștină"
                        description={t("description-2")}
                        role="Videograf principal & colorist"
                        skills={[
                            "video",
                            "foto",
                            "edit video",
                        ]}
                        email="david@vestvisuals.ro"
                        instagram="david.bostina"
                    />
                </div>
            </div>
        </section>
    );
}
