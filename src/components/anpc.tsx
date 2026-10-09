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
                alt="ANPC SAL - Soluționarea Alternativă a Litigiilor"
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
                alt="ANPC SOL - Soluționarea Online a Litigiilor"
                className="h-10 w-auto"
            />
        </a>
    );
}
