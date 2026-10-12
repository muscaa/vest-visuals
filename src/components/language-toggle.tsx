import { DE, GB, RO } from "country-flag-icons/react/3x2";
import { getLocale, locales, setLocale } from "@shared/paraglide/runtime";
import type { FlagComponent } from "country-flag-icons/react/3x2";
import { Button } from "@/components/ui/button";

/** Languages aren't countries, so each locale picks the flag people associate with it. */
const flags: Record<string, { flag: FlagComponent; name: string }> = {
    en: { flag: GB, name: "English" },
    de: { flag: DE, name: "Deutsch" },
    ro: { flag: RO, name: "Română" },
};

export function LanguageToggle() {
    const currentLocale = getLocale();
    const current = flags[currentLocale];
    const Flag = current?.flag;

    const handleClick = () => {
        const nextIndex = (locales.indexOf(currentLocale) + 1) % locales.length;
        const nextLocale = locales[nextIndex];

        setLocale(nextLocale);
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={handleClick}
            aria-label={`Limba: ${current?.name ?? currentLocale}`}
            title={current?.name}
            className="uppercase"
        >
            {Flag ? <Flag aria-hidden className="w-5 h-auto rounded-xs" /> : currentLocale}
        </Button>
    );
}
