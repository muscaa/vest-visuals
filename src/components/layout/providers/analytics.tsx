"use client";

import { clientConfig } from "@client/config";
import { GoogleAnalytics } from "@next/third-parties/google";

interface AnalyticsProviderProps {
}

export function AnalyticsProvider(props: AnalyticsProviderProps) {
    // TODO check for consent

    return (
        <GoogleAnalytics
            gaId={clientConfig.env.GOOGLE_ANALYTICS}
        />
    );
}
