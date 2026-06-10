"use client";

import { useTranslations } from "next-intl";
import { TextLink } from "./typography";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useCookies } from "@/hooks/useCookies";

interface Props {

}

export function CookieConsent(props: Props) {
    const t = useTranslations("Shared.Components.cookie-consent");
    const { useConsent, consent } = useCookies();
    const { data } = useConsent();

    return (
        <Card
            data-is-set={data !== null}
            className="
                fixed z-50 bottom-3 right-3 sm:bottom-6 sm:right-6 max-w-[min(50ch,calc(100vw-1.5rem))] w-full
                bg-background ring-primary hidden duration-1000
                data-[is-set='false']:flex data-[is-set='false']:animate-in data-[is-set='false']:slide-in-from-bottom-100
            "
        >
            <CardHeader>
                <CardTitle>
                    {t("title")}
                </CardTitle>
                <CardDescription className="text-sm text-pretty">
                    {
                        t.rich("description", {
                            link: (chunks) => (
                                <TextLink to="/cookie-policy">
                                    {chunks}
                                </TextLink>
                            )
                        })
                    }
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                <Button variant="outline" onClick={() => consent.mutate("essential")}>
                    {t("button-1")}
                </Button>
                <Button onClick={() => consent.mutate("all")}>
                    {t("button-2")}
                </Button>
            </CardContent>
        </Card>
    );
}
