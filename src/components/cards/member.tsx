import { IconMail } from "@tabler/icons-react";
import { SiInstagram } from "@icons-pack/react-simple-icons";
import { Img } from "../img";
import { TextH2, TextLink, TextSpan } from "../typography";
import { HoverCard } from "./hover";

interface MemberCardProps {
    image: string;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    instagram: string;
}

export function MemberCard(props: MemberCardProps) {
    return (
        <div className="group/member grid grid-cols-1 xs:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)] xs:max-lg:even:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)] xs:items-end">
            <div className="overflow-hidden rounded-4xl shadow-lg xs:max-lg:group-even/member:order-2">
                <Img
                    src={props.image}
                    alt={`${props.firstName} ${props.lastName}`}
                    className="w-full aspect-square object-cover transition-all duration-300 group-hover/member:scale-105"
                />
            </div>
            <HoverCard className="relative z-10 gap-3 px-6 not-xs:mx-4 not-xs:-mt-16 xs:-ml-16 xs:max-lg:group-even/member:ml-0 xs:max-lg:group-even/member:-mr-16 xs:mb-8 group-odd/member:group-hover/member:ring-primary group-even/member:group-hover/member:ring-success">
                <TextSpan variant="muted" size="sm-3" font="mono-1">
                    {props.role}
                </TextSpan>
                <TextH2 size="md-2">
                    {props.firstName}{" "}
                    <i className="transition-all text-muted-foreground group-odd/member:group-hover/member:text-primary group-even/member:group-hover/member:text-success">
                        {props.lastName}
                    </i>
                </TextH2>
                <div className="flex flex-col items-start gap-1 mt-2">
                    <TextLink
                        href={`mailto:${props.email}`}
                        variant="ghost"
                        className="inline-flex items-center gap-2"
                    >
                        <IconMail className="text-muted-foreground" />
                        {props.email}
                    </TextLink>
                    <TextLink
                        href={`https://www.instagram.com/${props.instagram}`}
                        target="_blank"
                        variant="ghost"
                        className="inline-flex items-center gap-2"
                    >
                        <SiInstagram className="text-muted-foreground" />
                        {props.instagram}
                    </TextLink>
                </div>
            </HoverCard>
        </div>
    );
}
