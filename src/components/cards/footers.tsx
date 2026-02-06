import { ReCaptchaBadge } from "../recaptcha";

export interface CardFooterProps {
    button: React.ReactNode;
    error: React.ReactNode;
}

export function CardFooterDefault(props: CardFooterProps) {
    return (
        <div className="flex flex-col size-full gap-4">
            {props.button}
            {props.error}
        </div>
    );
}

export function CardFooterReCaptchaHorizontal(props: CardFooterProps) {
    return (
        <div className="flex flex-col size-full gap-4">
            <div className="flex items-center w-full gap-4">
                <ReCaptchaBadge />
                {props.button}
            </div>
            {props.error}
        </div>
    );
}

export function CardFooterReCaptchaVertical(props: CardFooterProps) {
    return (
        <div className="flex flex-col size-full gap-4">
            <ReCaptchaBadge />
            {props.button}
            {props.error}
        </div>
    );
}
