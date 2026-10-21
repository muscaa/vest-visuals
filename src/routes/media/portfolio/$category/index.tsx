import { m } from "@shared/paraglide/messages";
import { createFileRoute } from "@tanstack/react-router";
import { Gallery } from "@/components/gallery/gallery";
import { Main } from "@/components/main";
import { portfolioQuery } from "@/functions/portfolio";
import { useGalleryQuery } from "@/hooks/gallery";

/** One category's portfolio, by its tag. Unknown tags are "not found", thrown by the server function. */
export const Route = createFileRoute("/media/portfolio/$category/")({
    loader: ({ context, params }) => context.queryClient.infiniteQuery(portfolioQuery(params.category)),
    component: RouteComponent,
});

/** Only the photos and videos, endlessly; the navbar and footer come from the layout. */
function RouteComponent() {
    const { category } = Route.useParams();
    const gallery = useGalleryQuery(portfolioQuery(category));

    return (
        <Main>
            <h1 className="sr-only">{m.common_portfolio()}</h1>
            <Gallery {...gallery} className="grow p-1 sm:p-1.5" />
        </Main>
    );
}
