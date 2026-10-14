import { m } from "@shared/paraglide/messages";
import { Img } from "./img";

interface Props {
    className?: string;
}

export function SALLink(props: Props) {
    return (
        <a
            href="https://anpc.ro/ce-este-sal/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className={props.className}
        >
            <Img
                src="/anpc-sal.svg"
                alt={m.footer_anpc_sal()}
                className="h-10 w-auto"
            />
        </a>
    );
}

export function SOLLink(props: Props) {
    return (
        <a
            href="https://consumer-redress.ec.europa.eu/index_ro"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className={props.className}
        >
            <Img
                src="/anpc-sol.svg"
                alt={m.footer_anpc_sol()}
                className="h-10 w-auto"
            />
        </a>
    );
}
