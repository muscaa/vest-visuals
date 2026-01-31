"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = "system" } = useTheme()

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="toaster group"
            icons={{
                success: (
                    <CircleCheckIcon className="size-4" />
                ),
                info: (
                    <InfoIcon className="size-4" />
                ),
                warning: (
                    <TriangleAlertIcon className="size-4" />
                ),
                error: (
                    <OctagonXIcon className="size-4" />
                ),
                loading: (
                    <Loader2Icon className="size-4 animate-spin" />
                ),
            }}
            style={
                {
                    "--border-radius": "var(--radius)",

                    "--normal-bg": "var(--popover)",
                    "--normal-bg-hover": "var(--popover)",
                    "--normal-border": "var(--border)",
                    "--normal-border-hover": "var(--border)",
                    "--normal-text": "var(--popover-foreground)",

                    "--info-bg": "var(--popover)",
                    "--info-border": "var(--border)",
                    "--info-text": "var(--popover-foreground)",

                    "--success-bg": "color-mix(in oklab, var(--success) 20%, var(--background))",
                    "--success-border": "color-mix(in oklab, var(--success) 40%, var(--background))",
                    "--success-text": "var(--success)",

                    "--warning-bg": "color-mix(in oklab, var(--warning) 20%, var(--background))",
                    "--warning-border": "color-mix(in oklab, var(--warning) 40%, var(--background))",
                    "--warning-text": "var(--warning)",

                    "--error-bg": "color-mix(in oklab, var(--destructive) 20%, var(--background))",
                    "--error-border": "color-mix(in oklab, var(--destructive) 40%, var(--background))",
                    "--error-text": "var(--destructive)",
                } as React.CSSProperties
            }
            toastOptions={{
                classNames: {
                    toast: "cn-toast",
                },
            }}
            {...props}
        />
    )
}

export { Toaster }
