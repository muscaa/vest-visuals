"use client";

import {
    ThemeProvider as NextThemesProvider,
    ThemeProviderProps,
} from "next-themes";

export function ThemeLayoutProvider({
    children,
    ...props
}: ThemeProviderProps) {
    return (
        <NextThemesProvider
            {...props}
        >
            {children}
        </NextThemesProvider>
    );
}
