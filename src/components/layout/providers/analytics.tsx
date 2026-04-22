"use client";

import { clientConfig } from "@client/config";
import { GoogleAnalytics } from "@next/third-parties/google";
import { useCookies } from "@/hooks/useCookies";

interface AnalyticsProviderProps {
}

export function AnalyticsProvider(props: AnalyticsProviderProps) {
    const { useConsent } = useCookies();
    const { data } = useConsent();

    if (!clientConfig.env.GOOGLE_ANALYTICS_ENABLED || data !== "all") {
        return null;
    }

    return (
        <GoogleAnalytics
            gaId={clientConfig.env.GOOGLE_ANALYTICS}
        />
    );
}
