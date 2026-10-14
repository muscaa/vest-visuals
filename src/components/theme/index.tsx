import { IconMoonStars, IconSun, IconSunMoon } from "@tabler/icons-react";
import { m } from "@shared/paraglide/messages";
import { useTheme } from "./provider";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
    const { system, theme, setTheme } = useTheme();

    const handleToggle = () => {
        if (theme === "system") {
            if (system === "light") {
                setTheme("dark");
            } else if (system === "dark") {
                setTheme("light");
            }
        } else if (theme === "light") {
            setTheme("dark");
        } else if (theme === "dark") {
            setTheme("light");
        }
    };

    return (
        <Button variant="ghost" size="icon" onClick={() => handleToggle()} aria-label={m.nav_theme()} title={m.nav_theme()}>
            <IconSun className="dark:hidden" />
            <IconMoonStars className="not-dark:hidden" />
        </Button>
    );
}
