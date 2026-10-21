import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AlbumLayout } from "@/components/account/album";
import { Gallery } from "@/components/gallery/gallery";
import { albumMediaQuery, albumQuery } from "@/functions/albums";
import { useGalleryQuery } from "@/hooks/gallery";

/**
 * A client's album. Anyone with the link can see it, so it's outside the signed in part of the account site.
 * Missing and locked albums are "not found", thrown by the server functions.
 */
export const Route = createFileRoute("/account/albums/$id/")({
    loader: ({ context, params }) => Promise.all([
        context.queryClient.query(albumQuery(params.id)),
        context.queryClient.infiniteQuery(albumMediaQuery(params.id)),
    ]),
    component: RouteComponent,
});

function RouteComponent() {
    const { id } = Route.useParams();
    const { data: album } = useSuspenseQuery(albumQuery(id));
    const gallery = useGalleryQuery(albumMediaQuery(id));

    return (
        <AlbumLayout album={album}>
            <Gallery {...gallery} downloadable className="grow p-1 sm:p-1.5" />
        </AlbumLayout>
    );
}
