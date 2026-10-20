import { m } from "@shared/paraglide/messages";
import { createFileRoute } from "@tanstack/react-router";
import { TextH1, TextP } from "@/components/typography";

export const Route = createFileRoute("/account/_dashboard/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <main className="flex flex-col gap-2 px-6 pb-10 md:px-10">
            <TextH1 size="md-1">{m.account_welcome_title()}</TextH1>
            <TextP variant="muted" size="md-4" className="max-w-[60ch]">
                {m.account_welcome_description()}
            </TextP>
        </main>
    );
}
