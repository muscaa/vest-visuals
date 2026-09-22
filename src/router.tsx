import { createRouter } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { deLocalizeUrl, localizeUrl } from "@shared/paraglide/runtime";
import { routeTree } from "./routeTree.gen";
import { DefaultCatchBoundary } from "./components/DefaultCatchBoundary";
import { NotFound } from "./components/NotFound";

export function getRouter() {
    const queryClient = new QueryClient();

    const router = createRouter({
        routeTree,
        context: {
            queryClient,
        },
        rewrite: {
            input: ({ url }) => deLocalizeUrl(url),
            output: ({ url }) => localizeUrl(url),
        },
        defaultPreload: "intent",
        defaultErrorComponent: DefaultCatchBoundary,
        defaultNotFoundComponent: () => <NotFound />,
        scrollRestoration: true,
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
