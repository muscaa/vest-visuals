"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
    Sun,
    Moon
} from "lucide-react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <Button variant="navbar" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="not-dark:hidden" />
            <Moon className="dark:hidden" />
        </Button>
    );
}
