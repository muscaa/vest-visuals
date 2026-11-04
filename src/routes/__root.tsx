import { getLocale } from "@shared/paraglide/runtime";
import {
    HeadContent,
    Link,
    Scripts,
    createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import * as React from "react";
import { createIsomorphicFn } from "@tanstack/react-start";
import { envPublic } from "@server/env";
import { business } from "@shared/business";
import type { QueryClient } from "@tanstack/react-query";
import { CatchBoundary, NotFound } from "@/components/errors";
import mainCss from "@/styles/main.css?url";
import { ThemeProvider } from "@/components/theme/provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { CookieConsent } from "@/components/cookie-consent";

interface RouterContext {
    queryClient: QueryClient;
}

const getEnvScript = createIsomorphicFn()
    .server(() => envPublic)
    .client(() => window.__ENV__);

export const Route = createRootRouteWithContext<RouterContext>()({
    beforeLoad: async () => {
        // Other redirect strategies are possible; see
        // https://github.com/TanStack/router/tree/main/examples/react/i18n-paraglide#offline-redirect
        if (typeof document !== "undefined") {
            document.documentElement.setAttribute("lang", getLocale());
        }
    },
    // what every page has; each page adds its own title, description and card (see pageHead in @shared/seo)
    head: () => ({
        meta: [
            { charSet: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            // pages without a head of their own, like "not found"
            { title: business.name },
            { name: "application-name", content: business.name },
            { name: "apple-mobile-web-app-title", content: business.name },
        ],
        links: [
            { rel: "stylesheet", href: mainCss },
            // the .ico for older browsers, the svg for the rest; Android's are in the manifest
            { rel: "icon", href: "/favicon.ico", sizes: "32x32" },
            { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
            { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
            { rel: "manifest", href: "/site.webmanifest" },
        ],
        scripts: [
            {
                children: `window.__ENV__=${JSON.stringify(getEnvScript()).replace(/</g, "\\u003c")}`,
            },
        ],
    }),
    // nothing above the root renders a header, so these bring their own
    errorComponent: (props) => <CatchBoundary {...props} standalone />,
    notFoundComponent: () => <NotFound standalone />,
    shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
    return (
        <html lang={getLocale()} suppressHydrationWarning>
            <head>
                <HeadContent />
            </head>
            <body className="antialiased flex flex-col w-screen h-screen">
                <ThemeProvider>
                    <TooltipProvider>
                        {children}
                        <CookieConsent />
                        <Toaster position="bottom-right" richColors />
                    </TooltipProvider>
                </ThemeProvider>
                <TanStackDevtools
                    config={{
                        position: "bottom-right",
                    }}
                    plugins={[
                        {
                            name: "Tanstack Router",
                            render: <TanStackRouterDevtoolsPanel />,
                        },
                        {
                            name: "Tanstack Query",
                            render: <ReactQueryDevtoolsPanel />,
                        },
                    ]}
                />
                <Scripts />
            </body>
        </html>
    );
}
