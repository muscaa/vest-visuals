import { composeRewrites, createRouter } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { routeTree } from "./routeTree.gen";
import { CatchBoundary, NotFound } from "./components/errors";
import { pageScrollSelector } from "./components/layout/scroll";
import { rewriteBridges, rewriteParaglide } from "./rewrites";

export function getRouter() {
    const queryClient = new QueryClient();

    const router = createRouter({
        routeTree,
        defaultPreload: "intent",
        scrollRestoration: true,
        // the pages scroll in the layouts' div, not the window
        scrollToTopSelectors: [pageScrollSelector],
        defaultErrorComponent: CatchBoundary,
        defaultNotFoundComponent: () => <NotFound />,
        context: {
            queryClient,
        },
        rewrite: composeRewrites([rewriteParaglide, rewriteBridges]),
    });

    setupRouterSsrQueryIntegration({
        router,
        queryClient: queryClient,
    });

    return router;
}

declare module "@tanstack/react-router" {
    interface Register {
        router: ReturnType<typeof getRouter>;
    }
}
