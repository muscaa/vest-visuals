"use client";

import { Toaster as Sonner } from "sonner";
import {
    IconAlertOctagon,
    IconAlertTriangle,
    IconCircleCheck,
    IconInfoCircle,
    IconLoader,
} from "@tabler/icons-react";
import type { ToasterProps } from "sonner";
import { useTheme } from "@/components/theme/provider";

/**
 * The toasts, in the site's theme: all on the popover's background, success, warning and error ones with the border and
 * text in the theme's colors (with `richColors`), following the site's light or dark choice rather than the system's.
 * While the cookie banner is in the same corner, they go above it (`--cookie-consent-space`, set by the banner).
 */
const Toaster = ({ ...props }: ToasterProps) => {
    const { theme } = useTheme();

    return (
        <Sonner
            theme={theme}
            className="toaster group"
            // sonner's own distances from the edge, 24px and 16px on phones, or a gap above the banner
            offset={{ bottom: "max(24px, calc(var(--cookie-consent-space, 0px) + 12px))" }}
            mobileOffset={{ bottom: "max(16px, calc(var(--cookie-consent-space, 0px) + 12px))" }}
            icons={{
                success: <IconCircleCheck className="size-4" />,
                info: <IconInfoCircle className="size-4" />,
                warning: <IconAlertTriangle className="size-4" />,
                error: <IconAlertOctagon className="size-4" />,
                loading: <IconLoader className="size-4 animate-spin" />,
            }}
            style={
                {
                    "--border-radius": "var(--radius)",
                    // sonner's own transition, and one for moving back down once the banner is gone
                    transition: "transform 400ms ease, bottom 300ms ease",

                    "--normal-bg": "var(--popover)",
                    "--normal-bg-hover": "var(--popover)",
                    "--normal-border": "var(--border)",
                    "--normal-border-hover": "var(--border)",
                    "--normal-text": "var(--popover-foreground)",

                    "--info-bg": "var(--popover)",
                    "--info-border": "var(--border)",
                    "--info-text": "var(--popover-foreground)",

                    "--success-bg": "var(--popover)",
                    "--success-border": "color-mix(in oklab, var(--color-success) 50%, var(--popover))",
                    "--success-text": "var(--color-success)",

                    "--warning-bg": "var(--popover)",
                    "--warning-border": "color-mix(in oklab, var(--color-warning) 50%, var(--popover))",
                    "--warning-text": "var(--color-warning)",

                    "--error-bg": "var(--popover)",
                    "--error-border": "color-mix(in oklab, var(--color-destructive) 50%, var(--popover))",
                    "--error-text": "var(--color-destructive)",
                } as React.CSSProperties
            }
            toastOptions={{
                classNames: {
                    // sonner sets its own system font and 13px, these win over it
                    toast: "cn-toast font-sans text-sm-2!",
                },
            }}
            {...props}
        />
    );
};

export { Toaster };
