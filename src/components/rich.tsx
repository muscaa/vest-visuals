import { ParaglideMessage } from "@inlang/paraglide-js-react";
import type { MessageLike } from "@inlang/paraglide-js-react";

type Children = { children?: React.ReactNode };
export type RichTag = (props: Children) => React.ReactNode;

const contactEmail = "contact@vestvisuals.ro";

/**
 * Tags every message can use, e.g. "Momentele care {#chart}contează{/chart}":
 * the italic accent words of the media style, plus a few basics.
 */
const markup: Record<string, RichTag> = {
    primary: ({ children }) => <i className="text-primary">{children}</i>,
    chart: ({ children }) => <i className="text-chart-1">{children}</i>,
    success: ({ children }) => <i className="text-success">{children}</i>,
    muted: ({ children }) => <span className="text-muted-foreground">{children}</span>,
    b: ({ children }) => <strong>{children}</strong>,
    br: () => <br />,
    mail: ({ children }) => (
        <a href={`mailto:${contactEmail}`} className="underline underline-offset-4 hover:text-foreground">
            {children}
        </a>
    ),
};

export interface RichProps {
    message: MessageLike<any, any, any>;
    inputs?: Record<string, unknown>;
    /** tags only this message uses, like links with their own address */
    tags?: Record<string, RichTag>;
}

/** Renders a message with markup using the shared tags above, so each message doesn't list its own renderers. */
export function Rich(props: RichProps) {
    // the shared tags are a superset of what any single message uses, which paraglide's per-message types can't express
    const Message = ParaglideMessage as (props: { message: unknown; inputs?: unknown; markup: unknown }) => React.ReactNode;

    return (
        <Message
            message={props.message}
            inputs={{ email: contactEmail, ...props.inputs }}
            markup={{ ...markup, ...props.tags }}
        />
    );
}
