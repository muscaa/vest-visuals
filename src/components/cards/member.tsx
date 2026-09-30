import { Img } from "../img";
import { TextH2, TextLink, TextSpan } from "../typography";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { HoverCard } from "./hover";
import { IconMail } from "@tabler/icons-react";
import { SiInstagram } from "@icons-pack/react-simple-icons";

interface MemberCardProps {
    image: string;
    firstName: string;
    lastName: string;
    role: string;
    skills: string[];
    email: string;
    instagram: string;
}

export function MemberCard(props: MemberCardProps) {
    return (
        <HoverCard className="group/member grid grid-cols-1 xs:grid-cols-[0.8fr_1.2fr] p-0 gap-0 odd:hover:ring-primary even:hover:ring-success">
            <Img
                src={props.image}
                alt={`${props.firstName} ${props.lastName} Member Image`}
                className="w-full not-xs:aspect-8/7 xs:h-full object-cover transition-all group-hover/member:scale-105"
            />
            <div className="flex flex-col p-8 gap-2">
                <TextH2 size="md-1">
                    {props.firstName}
                    {" "}
                    <i className="transition-all text-muted-foreground group-odd/member:group-hover/member:text-primary group-even/member:group-hover/member:text-success">
                        {props.lastName}
                    </i>
                </TextH2>
                <TextSpan variant="muted" size="sm-3" font="mono-1">
                    {props.role}
                </TextSpan>
                <div className="flex flex-wrap gap-2 my-4">
                    {
                        props.skills.map((value, index) => (
                            <Badge key={index} variant="outline" className="font-mono uppercase">
                                {value}
                            </Badge>
                        ))
                    }
                </div>
                <Separator className="my-2" />
                <TextLink href={`mailto:${props.email}`} variant="ghost" className="inline-flex items-center gap-1">
                    <IconMail className="text-muted-foreground" />
                    {props.email}
                </TextLink>
                <TextLink href={`https://www.instagram.com/${props.instagram}`} variant="ghost" className="inline-flex items-center gap-1">
                    <SiInstagram className="text-muted-foreground" />
                    {props.instagram}
                </TextLink>
            </div>
        </HoverCard>
    );
}
