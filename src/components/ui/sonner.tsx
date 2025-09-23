"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = "system" } = useTheme()

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="toaster group"
            style={
                {
                    "--normal-bg": "var(--popover)",
                    "--normal-bg-hover": "var(--popover)",
                    "--normal-border": "var(--border)",
                    "--normal-border-hover": "var(--border)",
                    "--normal-text": "var(--popover-foreground)",

                    "--info-bg": "var(--popover)",
                    "--info-border": "var(--border)",
                    "--info-text": "var(--popover-foreground)",

                    "--success-bg": "var(--popover)",
                    "--success-border": "var(--border)",
                    "--success-text": "var(--keppel)",

                    "--warning-bg": "var(--popover)",
                    "--warning-border": "var(--border)",
                    "--warning-text": "var(--goldenrod)",

                    "--error-bg": "var(--popover)",
                    "--error-border": "var(--border)",
                    "--error-text": "var(--destructive)",
                } as React.CSSProperties
            }
            {...props}
        />
    )
}

export { Toaster }
