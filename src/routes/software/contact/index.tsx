import { createFileRoute } from "@tanstack/react-router";
import { Main } from "@/components/main";
import { ContactForm } from "@/components/forms/contact";

export const Route = createFileRoute("/software/contact/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <Main className="justify-center items-center px-6 py-16">
            <ContactForm division="software" />
        </Main>
    );
}
