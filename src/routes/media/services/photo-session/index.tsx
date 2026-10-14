import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/media/service";
import { photoSession } from "@/i18n/media/services/photo-session";

const images = [
    "https://s3.vestvisuals.ro/portfolio/tp2e4xpmgdo71mx3q8ixtt0f/large",
    "https://s3.vestvisuals.ro/portfolio/e0mfa97uwfitoopg8une8aln/large",
    "https://s3.vestvisuals.ro/portfolio/zyq8z6ozp08dnoj2nwx9bgoj/large",
    "https://s3.vestvisuals.ro/portfolio/usn63kkxhhwngq4wtcra6zf5/large",
    "https://s3.vestvisuals.ro/portfolio/wmuz934kgdav1wu4mqa3e2he/large",
    "https://s3.vestvisuals.ro/portfolio/scxshfgur7e7j4ndoxbprb7x/large",
    "https://s3.vestvisuals.ro/portfolio/bwkb2xnt4aiduxqkahyw72om/large",
];

export const Route = createFileRoute("/media/services/photo-session/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <ServicePage service="photo-session" images={images} content={photoSession} />;
}
