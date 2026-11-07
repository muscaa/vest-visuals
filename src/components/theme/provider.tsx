import { createContext, useContext, useEffect, useState } from "react";
import { ScriptOnce } from "@tanstack/react-router";
import { envClient } from "@client/env";

type Theme = "dark" | "light" | "system";
type SystemTheme = Exclude<Theme, "system"> | undefined;

type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
};

type ThemeProviderState = {
    theme: Theme;
    system: SystemTheme;
    setTheme: (theme: Theme) => void;
};

// The theme lives in a cookie on the shared cookie domain, so every subdomain sees the same one.
function readTheme(storageKey: string): string | undefined {
    const match = document.cookie.match(new RegExp(`(?:^|; )${storageKey}=([^;]*)`));
    return match?.[1];
}

function writeTheme(storageKey: string, theme: Theme) {
    const domain = envClient.PUBLIC_COOKIE_DOMAIN;
    document.cookie = [
        `${storageKey}=${theme}`,
        "path=/",
        "max-age=31536000",
        "samesite=lax",
        ...(domain ? [`domain=${domain}`] : []),
    ].join("; ");
}

function getThemeScript(storageKey: string, defaultTheme: Theme) {
    const key = JSON.stringify(storageKey);
    const fallback = JSON.stringify(defaultTheme);

    return `(function(){try{var m=document.cookie.match(new RegExp('(?:^|; )'+${key}+'=([^;]*)'));var t=m&&m[1];if(t!=='light'&&t!=='dark'&&t!=='system'){t=${fallback}}var d=matchMedia('(prefers-color-scheme: dark)').matches;var r=t==='system'?(d?'dark':'light'):t;var e=document.documentElement;e.classList.add(r);e.style.colorScheme=r}catch(e){}})();`;
}

const ThemeProviderContext = createContext<ThemeProviderState>({
    system: undefined,
    theme: "system",
    setTheme: () => {},
});

function applyTheme(theme: Theme) {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    const resolved =
        theme === "system"
            ? window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light"
            : theme;

    root.classList.add(resolved);
    root.style.colorScheme = resolved;
}

export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "theme",
}: ThemeProviderProps) {
    const [system, setSystem] = useState<SystemTheme>();
    const [theme, setThemeState] = useState<Theme>(defaultTheme);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const onChange = () => setSystem(media.matches ? "dark" : "light");
        onChange();
        media.addEventListener("change", onChange);
        return () => media.removeEventListener("change", onChange);
    }, []);

    useEffect(() => {
        const stored = readTheme(storageKey);
        setThemeState(
            stored === "light" || stored === "dark" || stored === "system"
                ? stored
                : defaultTheme,
        );
        setMounted(true);
    }, [defaultTheme, storageKey]);

    useEffect(() => {
        if (!mounted) return;
        applyTheme(theme);
    }, [theme, mounted]);

    useEffect(() => {
        if (!mounted || theme !== "system") return;

        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const onChange = () => applyTheme("system");
        media.addEventListener("change", onChange);
        return () => media.removeEventListener("change", onChange);
    }, [theme, mounted]);

    const setTheme = (next: Theme) => {
        writeTheme(storageKey, next);
        setThemeState(next);
    };

    return (
        <ThemeProviderContext value={{ system, theme, setTheme }}>
            <ScriptOnce>{getThemeScript(storageKey, defaultTheme)}</ScriptOnce>
            {children}
        </ThemeProviderContext>
    );
}

export function useTheme() {
    const context = useContext(ThemeProviderContext);
    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider");
    return context;
}
