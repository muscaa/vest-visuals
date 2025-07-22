import Image from "next/image";
import {
    SiFacebook,
    SiInstagram,
} from "@icons-pack/react-simple-icons";
import Linkedin from "@/components/svg/linkedin";
import {
    IconLink,
    Icon
} from "@/components/snippets";
import { Separator } from "@/components/ui/separator";
import { Reveal } from "@/components/animations/reveal";
import { TextLink } from "@/components/ui/text-link";

function Member(props: { name: string, image: string, roles: string[], email: string, socials: { [key: string]: Icon } }) {
    return (
        <div className="flex flex-col p-8 justify-center items-center gap-4">
            <Reveal duration={1000}>
                <Image
                    src={props.image}
                    alt={props.name}
                    width={512}
                    height={512}
                    className="size-64 sm:size-96 xl:size-128 rounded-full"
                />
            </Reveal>
            <div className="flex flex-col justify-center items-center gap-1">
                <Reveal delay={300}>
                    <h2>{props.name}</h2>
                </Reveal>
                <Reveal delay={500}>
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
                </Reveal>
                <Reveal delay={700}>
                    <TextLink href={`mailto:${props.email}`} className="h4">
                        {props.email}
                    </TextLink>
                </Reveal>
            </div>
            <Reveal delay={900}>
                <div className="flex items-center justify-center gap-4">
                    {
                        Object.entries(props.socials).map(([key, icon], index) => (
                            <IconLink key={index} href={key} icon={icon} />
                        ))
                    }
                </div>
            </Reveal>
        </div>
    );
}

export function SectionTeam() {
    return (
        <section id="team" className="flex flex-col justify-center items-center px-2 py-8">
            <Reveal delay={200}>
                <h1>Cunoaste echipa</h1>
            </Reveal>
            <div className="flex flex-wrap w-full max-w-8xl justify-evenly gap-8">
                <Member
                    name="David"
                    image="/members/david.jpg"
                    roles={[
                        "videograf",
                        "fotograf",
                        "editor video"
                    ]}
                    email="david@vestvisuals.ro"
                    socials={{
                        "https://www.instagram.com/david.bostina/": SiInstagram,
                        "https://www.facebook.com/david.bostina": SiFacebook,
                    }}
                />
                <Member
                    name="Mihail"
                    image="/members/mihail.jpg"
                    roles={[
                        "fotograf",
                        "editor foto",
                        "editor video"
                    ]}
                    email="mihail@vestvisuals.ro"
                    socials={{
                        "https://www.instagram.com/musca.mihail/": SiInstagram,
                        "https://www.facebook.com/mihailmusca": SiFacebook,
                        "https://www.linkedin.com/in/muscaa/": Linkedin,
                    }}
                />
            </div>
        </section>
    );
}
