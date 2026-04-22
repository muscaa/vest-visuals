import { cn } from "@shared/shadcn/lib/utils";
import {
    SiFacebook,
    SiInstagram,
} from "@icons-pack/react-simple-icons";
import Linkedin from "@/components/svg/linkedin";
import { Img } from "@/components/snippets";
import { TeamMember } from "@type/registries/team-members";
import {
    CardContent,
    CardHeader,
} from "../ui/card";
import { TextLink } from "../ui/text-link";
import { Separator } from "../ui/separator";
import { InfoCard } from "../info-card";
import { Badge } from "../ui/badge";

interface MemberCardProps {
    member: TeamMember;
}

function MemberCard(props: MemberCardProps) {
    return (
        <InfoCard className={cn("w-sm")}>
            <Img
                src={props.member.image}
                alt={props.member.name}
            />
            <CardHeader>
                <div className="flex justify-between items-center">
                    <h3 className="font-mono h1">{props.member.name}</h3>
                    <div className="flex">
                        {
                            props.member.socials.instagram && (
                                <TextLink
                                    href={props.member.socials.instagram}
                                    target="_blank"
                                    variant="ghost"
                                    size="icon-responsive"
                                >
                                    <SiInstagram />
                                </TextLink>
                            )
                        }
                        {
                            props.member.socials.facebook && (
                                <TextLink
                                    href={props.member.socials.facebook}
                                    target="_blank"
                                    variant="ghost"
                                    size="icon-responsive"
                                >
                                    <SiFacebook />
                                </TextLink>
                            )
                        }
                        {
                            props.member.socials.linkedin && (
                                <TextLink
                                    href={props.member.socials.linkedin}
                                    target="_blank"
                                    variant="ghost"
                                    size="icon-responsive"
                                >
                                    <Linkedin />
                                </TextLink>
                            )
                        }
                    </div>
                </div>
                <TextLink
                    href={`mailto:${props.member.email}`}
                    target="_blank"
                    className="w-min"
                >
                    {props.member.email}
                </TextLink>
                <Separator />
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                {
                    props.member.roles.map((role, index) => (
                        <Badge
                            key={index}
                            variant="secondary"
                            size="md"
                            className="grow"
                        >
                            {role}
                        </Badge>
                    ))
                }
            </CardContent>
        </InfoCard>
    );
}

export interface SectionAboutProps {
    title: string;
    description: string;
    member1: TeamMember;
    member2: TeamMember;
    className?: string;
}

export function SectionAbout(props: SectionAboutProps) {
    return (
        <section
            id="about"
            className={cn("flex not-lg:flex-col justify-center not-lg:items-center gap-16 p-8 py-16 w-full", props.className)}
        >
            <div className="flex flex-col items-center gap-16 max-w-128 w-full">
                <div className="flex flex-col gap-4 text-justify">
                    <h2 className="font-mono my-8">{props.title}</h2>
                    <p>{props.description}</p>
                </div>
                <MemberCard
                    member={props.member2}
                />
            </div>
            <div className="flex flex-col items-center gap-16 max-w-128 w-full">
                <MemberCard
                    member={props.member1}
                />
                <div className="flex flex-col grow w-full min-h-4 bg-background2 rounded-2xl">
                    
                </div>
            </div>
        </section>
    );
}
