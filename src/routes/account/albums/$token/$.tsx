import { createFileRoute } from "@tanstack/react-router";
import { AlbumPage } from "@/components/account/album";
import { albumMediaQuery, albumQuery } from "@/functions/albums";

/** A directory of a client's album, by the slugs on the way: `/albums/{token}/ceremonie/dans`. */
export const Route = createFileRoute("/account/albums/$token/$")({
    loader: ({ context, params }) => {
        const path = params._splat?.split("/").filter(Boolean) ?? [];
        return Promise.all([
            context.queryClient.query(albumQuery(params.token, path)),
            context.queryClient.infiniteQuery(albumMediaQuery(params.token, path)),
        ]);
    },
    component: RouteComponent,
});

function RouteComponent() {
    const { token, _splat } = Route.useParams();
    return <AlbumPage token={token} path={_splat?.split("/").filter(Boolean) ?? []} />;
}
