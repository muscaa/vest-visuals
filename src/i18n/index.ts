import { getLocale } from "@shared/paraglide/runtime";
import type { Locale } from "@shared/paraglide/runtime";

/**
 * Long, structured content in every locale: legal documents, service and location pages.
 * Short UI text lives in paraglide's messages (messages/{locale}.json) instead.
 *
 * Each piece of content has one file per locale (`ro.tsx`, `en.tsx`) and an `index.ts` joining them into a `Localized`,
 * so a missing translation is a type error.
 */
export type Localized<T> = Record<Locale, T>;

/** Locale used for formatting: the english copy is british, so dates read "13 October 2026" and lists skip the oxford comma. */
const intlLocales: Record<Locale, string> = {
    ro: "ro",
    en: "en-GB",
};

/** The current locale's version. Call it while rendering, never at module level, or every request gets the first locale. */
export function localize<T>(value: Localized<T>): T {
    return value[getLocale()];
}

/** e.g. "13 octombrie 2026" / "13 October 2026". Takes an ISO date, like "2026-10-13". */
export function formatDate(date: string): string {
    return new Intl.DateTimeFormat(intlLocales[getLocale()], { dateStyle: "long", timeZone: "UTC" }).format(new Date(date));
}

/** e.g. "1.450" / "1,450". */
export function formatNumber(value: number): string {
    return new Intl.NumberFormat(intlLocales[getLocale()]).format(value);
}

/** Joins words the way the locale does: "a, b și c" / "a, b and c". */
export function formatList(words: string[]): string {
    return new Intl.ListFormat(intlLocales[getLocale()], { type: "conjunction" }).format(words);
}
