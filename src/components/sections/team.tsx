import {
    SiFacebook,
    SiInstagram,
} from "@icons-pack/react-simple-icons";
import Linkedin from "@/components/svg/linkedin";
import { ButtonLink, IconLink } from "@/components/snippets";
import { Separator } from "@/components/ui/separator";
import { TextLink } from "@/components/ui/text-link";
import { Img } from "@/components/snippets";
import { TeamMember } from "@type/registries/team-members";
import { useRegistries } from "@/hooks/useRegistries";
import { cn } from "@shared/shadcn/lib/utils";

function Member(props: TeamMember) {
    return (
        <div className="flex not-md:flex-col p-8 justify-center items-center w-full">
            <div className="relative flex flex-col gap-4 shrink-0">
                <Img
                    src={props.image}
                    alt={props.name}
                    width={512}
                    height={512}
                    className="size-64 sm:size-96 border-4 border-primary"
                />
                <div className="md:absolute md:top-8 md:right-8 md:translate-x-full flex not-md:flex-col justify-center items-center pl-8 md:pl-16 pr-8 py-2 bg-primary theme-dark">
                    <span className="font-mono text-center h1 md:mr-8">{props.name}</span>
                    <div className="flex">
                        <ButtonLink
                            href="#"
                            size="icon-lg"
                            className=""
                        >
                            <SiInstagram />
                        </ButtonLink>
                        <ButtonLink
                            href="#"
                            size="icon-lg"
                            className=""
                        >
                            <SiFacebook />
                        </ButtonLink>
                        <ButtonLink
                            href="#"
                            size="icon-lg"
                            className=""
                        >
                            <Linkedin />
                        </ButtonLink>
                    </div>
                </div>
            </div>
            <div className="grow md:h-96 p-8 md:pt-32 bg-primary/10">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mollis tellus vitae
                    vestibulum porta. Aliquam tempor gravida feugiat. Nulla ex mi, tincidunt eget ante
                    consectetur, iaculis sagittis turpis. Donec mattis bibendum tellus eu fermentum.
                    Curabitur et lacus ullamcorper ex aliquam congue. In fringilla rutrum lectus, et
                    faucibus tortor placerat et.
                </p>
            </div>
            {/* <div className="flex flex-col justify-center items-center gap-1">
                <h2>{props.name}</h2>
                <div className="flex flex-wrap justify-center items-center gap-2">
                    {
                        props.roles.map((role, index) => (
                            <div key={index} className="flex h-6 items-center gap-2">
                                <h4 className="text-muted-foreground">{role}</h4>
                                {
                                    index < props.roles.length - 1 && (
                                        <Separator orientation="vertical" />
                                    )
                                }
                            </div>
                        ))
                    }
                </div>
                <TextLink href={`mailto:${props.email}`} className="h4">
                    {props.email}
                </TextLink>
            </div>
            <div className="flex items-center justify-center gap-4">
                {props.socials.instagram && <IconLink href={props.socials.instagram} icon={SiInstagram} />}
                {props.socials.facebook && <IconLink href={props.socials.facebook} icon={SiFacebook} />}
                {props.socials.linkedin && <IconLink href={props.socials.linkedin} icon={Linkedin} />}
            </div> */}
        </div>
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
            <div className="flex flex-col max-w-6xl w-full justify-center gap-8">
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
