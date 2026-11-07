/**
 * What every email looks like, close to the sites' light theme: the logo, a card with the message, a footer. Emails
 * can't use the sites' CSS, so the colors are written out here, taken from `theme.css`; most email clients ignore web
 * fonts, so Inter falls back to the system's.
 */
import { Body, Button, Container, Head, Heading, Html, Img, Link, Preview, Section, Text } from "@react-email/components";
import { envServer } from "@server/env";
import { m } from "@shared/paraglide/messages";
import type { Locale } from "@shared/paraglide/runtime";

const colors = {
    /** --color1, the primary */
    primary: "#4b71d8",
    /** --light2, the pages' background */
    background: "#eff2f9",
    /** --light1, cards */
    card: "#fbfcff",
    /** --dark1 */
    foreground: "#13161d",
    /** --gray-dark */
    muted: "#6b7080",
    border: "#dde2ee",
};

const font = "Inter, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

/** The home site, where emails' images are and where the footer leads. */
function homeUrl(path = "") {
    const { protocol } = new URL(envServer.BETTER_AUTH_URL);
    return `${protocol}//${envServer.PUBLIC_REWRITE_BRIDGE_HOME}${path}`;
}

export function EmailLayout(props: { locale: Locale; preview: string; children: React.ReactNode }) {
    const { locale } = props;

    return (
        <Html lang={locale}>
            <Head />
            <Preview>{props.preview}</Preview>
            <Body style={{ margin: 0, padding: "32px 12px", backgroundColor: colors.background, fontFamily: font, color: colors.foreground }}>
                <Container style={{ maxWidth: "520px", margin: "0 auto" }}>
                    <Section style={{ padding: "0 8px 24px" }}>
                        <Link href={homeUrl()}>
                            <Img src={homeUrl("/logos/email.png")} width="160" height="42" alt="Vest Visuals" />
                        </Link>
                    </Section>
                    <Section style={{ padding: "32px", backgroundColor: colors.card, border: `1px solid ${colors.border}`, borderRadius: "22px" }}>
                        {props.children}
                    </Section>
                    <Text style={{ margin: "24px 8px 0", fontSize: "12px", lineHeight: "18px", color: colors.muted }}>
                        {m.mail_footer({}, { locale })}
                        <br />
                        <Link href={homeUrl()} style={{ color: colors.muted, textDecoration: "underline" }}>vestvisuals.ro</Link>
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}

export function EmailHeading(props: { children: React.ReactNode }) {
    return (
        <Heading as="h1" style={{ margin: "0 0 12px", fontSize: "24px", lineHeight: "30px", fontWeight: 600, letterSpacing: "-0.01em" }}>
            {props.children}
        </Heading>
    );
}

export function EmailText(props: { children: React.ReactNode; muted?: boolean }) {
    return (
        <Text style={{ margin: "0 0 16px", fontSize: props.muted ? "13px" : "15px", lineHeight: props.muted ? "20px" : "24px", color: props.muted ? colors.muted : colors.foreground }}>
            {props.children}
        </Text>
    );
}

/** The site's primary button, and the link written out under it for clients that block buttons. */
export function EmailButton(props: { href: string; locale: Locale; children: React.ReactNode }) {
    return (
        <>
            <Section style={{ margin: "8px 0 24px" }}>
                <Button
                    href={props.href}
                    style={{ display: "inline-block", padding: "12px 24px", backgroundColor: colors.primary, color: "#ffffff", fontSize: "15px", fontWeight: 600, borderRadius: "999px", textDecoration: "none" }}
                >
                    {props.children}
                </Button>
            </Section>
            <EmailText muted>
                {m.mail_link_fallback({}, { locale: props.locale })}
                <br />
                <Link href={props.href} style={{ color: colors.primary, wordBreak: "break-all" }}>{props.href}</Link>
            </EmailText>
        </>
    );
}

/** A code to type in, big and spaced so it reads at a glance. */
export function EmailCode(props: { code: string }) {
    return (
        <Text style={{ margin: "8px 0 24px", padding: "16px", backgroundColor: colors.background, borderRadius: "14px", textAlign: "center", fontSize: "30px", fontWeight: 600, letterSpacing: "0.3em", fontFamily: "'JetBrains Mono', Menlo, Consolas, monospace" }}>
            {props.code}
        </Text>
    );
}
