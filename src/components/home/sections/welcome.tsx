import { m } from "@shared/paraglide/messages";
import { Link } from "@tanstack/react-router";
import { IconArrowDown } from "@tabler/icons-react";
import { getHeadline } from "./hero";
import DiscussionWhiteBoard from "@/components/illustrations/discussion-white-board.svg?react";
import { TextH1, TextP } from "@/components/typography";
import { Button } from "@/components/ui/button";

interface WelcomeSectionProps {}

export function WelcomeSection(props: WelcomeSectionProps) {
    return (
        <section
            id="bun-venit"
            className="flex flex-col justify-center items-center px-6 py-24 md:py-32 bg-linear-to-b from-transparent to-muted"
        >
            <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] items-center gap-12 max-w-7xl w-full">
                <div className="flex flex-col items-start">
                    <TextH1 size="lg-2" className="mb-8">
                        {m.home_welcome_title()}
                    </TextH1>
                    <TextP variant="muted" size="md-3" className="max-w-[48ch] mb-12">
                        {m.home_welcome_description({ headline: getHeadline() })}
                    </TextP>
                    <Button
                        size="xl"
                        nativeButton={false}
                        render={<Link to="/home" hash="domenii" />}
                    >
                        {m.home_welcome_cta()}
                        <IconArrowDown data-icon="inline-end" />
                    </Button>
                </div>
                <DiscussionWhiteBoard
                    role="img"
                    aria-label={m.home_welcome_illustration()}
                    className="w-full max-w-md h-auto justify-self-center"
                />
            </div>
        </section>
    );
}
