import {
    SectionPreview,
    SectionPreviewProps,
} from "../sections/preview";
import {
    SectionAbout,
    SectionAboutProps,
} from "@/components/sections/about";
import {
    SectionPortfolio,
    SectionPortfolioProps,
} from "../sections/portfolio";
import {
    SectionBenefits,
    SectionBenefitsProps,
} from "../sections/benefits";
import {
    SectionTeam,
    SectionTeamProps,
} from "@/components/sections/team";

interface Props {
    preview: SectionPreviewProps;
    about: SectionAboutProps;
    portfolio: SectionPortfolioProps;
    benefits: SectionBenefitsProps;
    team: SectionTeamProps;
}

export function HomePage(props: Props) {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen-no-nav">
            <SectionPreview {...props.preview} />
            <SectionAbout {...props.about} />
            <SectionPortfolio {...props.portfolio} />
            <SectionBenefits {...props.benefits} />
            <SectionTeam {...props.team} />
        </div>
    );
}
