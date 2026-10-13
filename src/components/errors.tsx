import { Link, useLocation, useRouter } from "@tanstack/react-router";
import PageNotFound4 from "./illustrations/page-not-found-4.svg?react";
import SomethingWentWrong1 from "./illustrations/something-went-wrong-1.svg?react";
import { Main } from "./main";
import { TextH1, TextP } from "./typography";
import { Button } from "./ui/button";
import type { ErrorComponentProps, LinkOptions } from "@tanstack/react-router";

// full paths, so the router can type check them
const homes: { prefix: string; link: LinkOptions }[] = [
    { prefix: "/media", link: { to: "/media" } },
    { prefix: "/software", link: { to: "/software" } },
    { prefix: "/account", link: { to: "/account" } },
];

/** The home page of the site the visitor is on, so they don't get thrown to another division. */
function useHomeLink(): LinkOptions {
    const pathname = useLocation({ select: (location) => location.pathname });
    const home = homes.find(({ prefix }) => pathname === prefix || pathname.startsWith(`${prefix}/`));

    return home?.link ?? { to: "/home" };
}

interface StatusProps {
    illustration: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    title: string;
    description: React.ReactNode;
    actions: React.ReactNode;
    /** extra content under the actions, like error details */
    children?: React.ReactNode;
    /** fills the whole screen, for when no route layout is around it, e.g. urls that match no route */
    standalone?: boolean;
}

function Status({ illustration: Illustration, standalone, ...props }: StatusProps) {
    return (
        <Main variant={standalone ? "screen" : "navbar"} className="justify-center items-center px-6 py-16">
            <div className="flex flex-col items-center max-w-xl text-center">
                <Illustration aria-hidden className="w-full max-w-xs h-auto mb-8" />
                <TextH1 size="md-1" className="mb-4">{props.title}</TextH1>
                <TextP variant="muted" size="md-4" className="mb-10 text-balance">
                    {props.description}
                </TextP>
                <div className="flex flex-wrap justify-center gap-3">
                    {props.actions}
                </div>
                {props.children}
            </div>
        </Main>
    );
}

export function NotFound(props: { standalone?: boolean }) {
    const home = useHomeLink();

    return (
        <Status
            standalone={props.standalone}
            illustration={PageNotFound4}
            title="Pagina nu există"
            description="Poate a fost mutată, sau linkul are o greșeală. Te ducem înapoi pe drumul cel bun."
            actions={
                <>
                    <Button size="lg" nativeButton={false} render={<Link {...home} />}>
                        Pagina principală
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => window.history.back()}>
                        Înapoi
                    </Button>
                </>
            }
        />
    );
}

export function CatchBoundary(props: ErrorComponentProps & { standalone?: boolean }) {
    const router = useRouter();
    const home = useHomeLink();

    console.error(props.error);

    return (
        <Status
            standalone={props.standalone}
            illustration={SomethingWentWrong1}
            title="Ceva n-a mers bine"
            description={
                <>
                    A apărut o problemă neașteptată. Încearcă din nou, iar dacă se repetă, scrie-ne la{" "}
                    <a href="mailto:contact@vestvisuals.ro" className="underline underline-offset-4 hover:text-foreground">
                        contact@vestvisuals.ro
                    </a>
                    .
                </>
            }
            actions={
                <>
                    <Button size="lg" onClick={() => router.invalidate()}>
                        Încearcă din nou
                    </Button>
                    <Button size="lg" variant="outline" nativeButton={false} render={<Link {...home} />}>
                        Pagina principală
                    </Button>
                </>
            }
        >
            {
                import.meta.env.DEV && (
                    <pre className="mt-10 max-w-full overflow-x-auto rounded-xl border bg-muted p-4 text-left text-sm-3 font-mono text-muted-foreground whitespace-pre-wrap">
                        {props.error instanceof Error ? props.error.message : String(props.error)}
                    </pre>
                )
            }
        </Status>
    );
}
