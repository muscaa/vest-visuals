import { createFileRoute } from "@tanstack/react-router";
import { AlbumPage, albumHead } from "@/components/account/album";
import { albumMediaQuery, albumQuery } from "@/functions/albums";

/**
 * A client's album, at its root. Anyone with the link can see it, so it's outside the signed in part of the account
 * site; missing, locked and draft albums (for anyone but admins) are "not found", thrown by the server functions.
 */
export const Route = createFileRoute("/account/albums/$token/")({
    loader: ({ context, params }) => Promise.all([
        context.queryClient.query(albumQuery(params.token, [])),
        context.queryClient.infiniteQuery(albumMediaQuery(params.token, [])),
    ]),
    head: (context) => albumHead(context, context.params.token, context.loaderData?.[0]),
    component: RouteComponent,
});

function RouteComponent() {
    const { token } = Route.useParams();
    return <AlbumPage token={token} path={[]} />;
}
