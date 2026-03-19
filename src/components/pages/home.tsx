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
import { Separator } from "../ui/separator";
import { Link } from "@shared/i18n";
import {
    SiWhatsapp,
    SiWhatsappHex,
} from "@icons-pack/react-simple-icons";
import { Reveal2 } from "../animations/reveal2";
import { cn } from "@shared/shadcn/lib/utils";

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
            <Separator />
            <SectionPortfolio {...props.portfolio} />
            <SectionBenefits {...props.benefits} className="bg-primary/20 dark:bg-primary/10" />
            <SectionTeam {...props.team} />
            <Reveal2
                direction="left"
                render={(props) => (
                    <Link
                        ref={props.ref}
                        href="https://wa.me/40723971618"
                        target="_blank"
                        className={cn(props.className, "fixed right-4 md:right-8 bottom-8 z-50 size-14 rounded-full flex justify-center items-center theme-dark shadow-sm")}
                        style={{
                            backgroundColor: SiWhatsappHex,
                        }}
                    >
                        <SiWhatsapp className="size-8" />
                    </Link>
                )}
            />
        </div>
    );
}
