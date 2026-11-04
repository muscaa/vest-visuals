import { m } from "@shared/paraglide/messages";
import { asset } from "@shared/assets";
import { MemberCard } from "@/components/cards/member";
import { Eyebrow } from "@/components/eyebrow";
import { TextH1, TextP } from "@/components/typography";
import { Rich } from "@/components/rich";

interface AboutSectionProps {}

export function AboutSection(props: AboutSectionProps) {
    return (
        <section
            id="about"
            className="flex flex-col justify-center items-center px-6 py-16 bg-linear-to-br from-transparent to-muted"
        >
            <div className="flex flex-col max-w-7xl w-full">
                <Eyebrow>{m.media_about_eyebrow()}</Eyebrow>
                <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-8 mb-16">
                    <TextH1 size="lg-2">
                        <Rich message={m.media_about_title} />
                    </TextH1>
                    <TextP variant="muted" size="md-3">
                        {m.media_about_description()}
                    </TextP>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <MemberCard
                        image={asset("media-team-mihail", "medium")}
                        firstName="Mihail"
                        lastName="Musca"
                        role={m.media_member_photographer()}
                        email="mihail@vestvisuals.ro"
                        instagram="musca.mihail"
                    />
                    <MemberCard
                        image={asset("media-team-david", "medium")}
                        firstName="David"
                        lastName="Boștină"
                        role={m.media_member_videographer()}
                        email="david@vestvisuals.ro"
                        instagram="david.bostina"
                    />
                </div>
            </div>
        </section>
    );
}
