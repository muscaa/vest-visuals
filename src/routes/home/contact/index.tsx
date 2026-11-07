import { createFileRoute } from "@tanstack/react-router";
import { m } from "@shared/paraglide/messages";
import { pageHead } from "@shared/seo";
import { Main } from "@/components/main";
import { ContactForm } from "@/components/forms/contact";

export const Route = createFileRoute("/home/contact/")({
    head: (context) => pageHead(context, { title: m.meta_contact_title(), description: m.meta_home_contact_description() }),
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <Main className="justify-center items-center px-6 py-16">
            <ContactForm />
        </Main>
    );
}
