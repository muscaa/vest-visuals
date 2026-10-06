import { getLocale, locales, setLocale } from "@shared/paraglide/runtime";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
    const currentLocale = getLocale();

    const handleClick = () => {
        const nextIndex = (locales.indexOf(currentLocale) + 1) % locales.length;
        const nextLocale = locales[nextIndex];

        setLocale(nextLocale);
    };

    return (
        <Button size="icon" onClick={handleClick} className="uppercase">
            {currentLocale}
        </Button>
    );
}
