import { I18nLink, Pathname } from "@shared/i18n";
import { Single } from "@type/utils";

export type LinkProps = Single<{ to: Pathname; href: string; }> & Omit<React.ComponentProps<typeof I18nLink>, "href">;

export function Link({ to, href, ...props }: LinkProps) {
    return (
        <I18nLink
            href={to ?? href}
            {...props}
        />
    );
}
