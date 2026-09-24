import { IconMoonStars, IconSun, IconSunMoon } from "@tabler/icons-react";
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
        <Button size="icon" onClick={() => handleToggle()}>
            <IconSun className="dark:hidden" />
            <IconMoonStars className="not-dark:hidden" />
        </Button>
    );
}
