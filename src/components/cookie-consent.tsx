import { m } from "@shared/paraglide/messages";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { onCookieSettings, writeConsent } from "@client/consent";
import { startAnalytics, stopAnalytics } from "@client/analytics";
import { Rich } from "./rich";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useConsent } from "@/hooks/consent";

/**
 * The cookie banner, on every site: in the bottom right corner, sliding in until visitors choose. Their choice counts
 * on every subdomain; Analytics starts only with "accept all".
 */
export function CookieConsent() {
    const consent = useConsent();
    const [reopened, setReopened] = useState(false);

    useEffect(() => onCookieSettings(() => setReopened(true)), []);

    useEffect(() => {
        if (consent === "all") startAnalytics();
        if (consent === "necessary") stopAnalytics();
    }, [consent]);

    // nothing on the server, nor once they've chosen
    if (consent === undefined || (consent && !reopened)) return null;

    const choose = (choice: "all" | "necessary") => {
        writeConsent(choice);
        setReopened(false);
    };

    return (
        <Card
            role="region"
            aria-label={m.cookies_title()}
            className="fixed z-50 bottom-3 right-3 sm:bottom-6 sm:right-6 w-full max-w-[min(50ch,calc(100vw-1.5rem))] bg-popover text-popover-foreground shadow-lg duration-700 animate-in fade-in slide-in-from-bottom-full"
        >
            <CardHeader>
                <CardTitle>{m.cookies_title()}</CardTitle>
                <CardDescription className="text-pretty">
                    <Rich
                        message={m.cookies_text}
                        tags={{
                            link: ({ children }) => (
                                <Link to="/home/legal/cookies" className="underline underline-offset-4 hover:text-foreground">
                                    {children}
                                </Link>
                            ),
                        }}
                    />
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={() => choose("necessary")}>{m.cookies_necessary()}</Button>
                <Button onClick={() => choose("all")}>{m.cookies_accept()}</Button>
            </CardContent>
        </Card>
    );
}
