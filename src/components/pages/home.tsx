import {
    SectionPreview,
    SectionPreviewProps,
} from "../sections/preview";
import {
    SectionAbout,
    // SectionAboutProps,
} from "@/components/sections/about";
import {
    SectionTeam,
    SectionTeamProps,
} from "@/components/sections/team";

interface Props {
    preview: SectionPreviewProps;
    // about: SectionAboutProps;
    team: SectionTeamProps;
}

export function HomePage(props: Props) {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen-no-nav">
            <SectionPreview {...props.preview} />
            <SectionAbout />
            <SectionTeam {...props.team} />
        </div>
    );
}
