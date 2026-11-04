import { m } from "@shared/paraglide/messages";
import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@shared/seo";
import { findMediaService } from "@/components/media/service";
import { findPortfolioItem } from "@/components/media/sections/portfolio";
import { Gallery } from "@/components/gallery/gallery";
import { Main } from "@/components/main";
import { portfolioQuery } from "@/functions/portfolio";
import { useGalleryQuery } from "@/hooks/gallery";

/** One category's portfolio, by its tag. Unknown tags are "not found", thrown by the server function. */
export const Route = createFileRoute("/media/portfolio/$category/")({
    loader: ({ context, params }) => context.queryClient.infiniteQuery(portfolioQuery(params.category)),
    head: (context) => {
        const item = findPortfolioItem(context.params.category);
        return pageHead(context, {
            title: item ? m.meta_media_portfolio_title({ service: findMediaService(item.service).name() }) : m.common_portfolio(),
            description: m.meta_media_portfolio_description(),
            photo: item?.image,
        });
    },
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
