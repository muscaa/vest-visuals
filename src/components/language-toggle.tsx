import { Button } from "@/components/ui/button";
import { getLocale, locales, setLocale } from "@shared/paraglide/runtime";

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
