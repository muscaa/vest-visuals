import { Link } from "@shared/i18n";
import { Img } from "./snippets";

interface Props {
    className?: string;
}

export function SALLink(props: Props) {
    return (
        <Link
            href="https://anpc.ro/ce-este-sal/"
            target="_blank"
            rel="nofollow"
            {...props}
        >
            <Img
                src="/anpc-sal.svg"
                alt="Solutionarea Alternativa a Litigiilor"
                className="w-50"
            />
        </Link>
    );
}

export function SOLLink(props: Props) {
    return (
        <Link
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="nofollow"
            {...props}
        >
            <Img
                src="/anpc-sol.svg"
                alt="Solutionarea Online a Litigiilor"
                className="w-50"
            />
        </Link>
    );
}
