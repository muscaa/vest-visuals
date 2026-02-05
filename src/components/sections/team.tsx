import {
    SiFacebook,
    SiInstagram,
} from "@icons-pack/react-simple-icons";
import Linkedin from "@/components/svg/linkedin";
import { Img } from "@/components/snippets";
import { TeamMember } from "@type/registries/team-members";
import { useRegistries } from "@/hooks/useRegistries";
import { cn } from "@shared/shadcn/lib/utils";
import {
    Card,
    CardContent,
    CardHeader,
} from "../ui/card";
import { TextLink } from "../ui/text-link";
import { Separator } from "../ui/separator";

function Member(props: TeamMember) {
    return (
        <Card className="shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 w-xs sm:w-sm">
            <Img
                src={props.image}
                alt={props.name}
            />
            <CardHeader>
                <div className="flex justify-between items-center">
                    <h3 className="font-mono h1">{props.name}</h3>
                    <div className="flex">
                        {
                            props.socials.instagram && (
                                <TextLink
                                    href={props.socials.instagram}
                                    variant="ghost"
                                    size="icon-responsive"
                                >
                                    <SiInstagram />
                                </TextLink>
                            )
                        }
                        {
                            props.socials.facebook && (
                                <TextLink
                                    href={props.socials.facebook}
                                    variant="ghost"
                                    size="icon-responsive"
                                >
                                    <SiFacebook />
                                </TextLink>
                            )
                        }
                        {
                            props.socials.linkedin && (
                                <TextLink
                                    href={props.socials.linkedin}
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
                    href={`mailto:${props.email}`}
                    className="w-min"
                >
                    {props.email}
                </TextLink>
                <Separator />
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <span className="text-muted-foreground">{props.roles.join(" | ")}</span>
            </CardContent>
        </Card>
    );
}

export interface SectionTeamProps {
    className?: string;
}

export function SectionTeam(props: SectionTeamProps) {
    const { useRegistry } = useRegistries();
    const { data } = useRegistry("team_members");

    return (
        <section
            id="team"
            className={cn("flex flex-col justify-center items-center gap-8 p-8 w-full", props.className)}
        >
            <h2 className="font-mono text-center">Echipa</h2>
            <div className="flex flex-wrap max-w-6xl w-full justify-evenly gap-8">
                {
                    data && data.map((member, index) => (
                        <Member
                            key={index}
                            {...member}
                        />
                    ))
                }
            </div>
        </section>
    );
}
