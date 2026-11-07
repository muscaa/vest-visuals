import { createFileRoute } from "@tanstack/react-router";
import { m } from "@shared/paraglide/messages";
import { pageHead } from "@shared/seo";
import { Main } from "@/components/main";
import { ContactForm } from "@/components/forms/contact";

export const Route = createFileRoute("/media/contact/")({
    head: (context) => pageHead(context, { title: m.meta_contact_title(), description: m.meta_media_contact_description() }),
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <Main className="justify-center items-center px-6 py-16">
            <ContactForm division="media" />
        </Main>
    );
}
