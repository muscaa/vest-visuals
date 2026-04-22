interface CookieProps {
    expires?: Date;
    expiresIn?: {
        seconds?: number;
        minutes?: number;
        hours?: number;
        days?: number;
        months?: number;
        years?: number;
    };
    domain?: string;
    path?: string;
    sameSite?: "strict" | "lax" | "none";
}

export function setCookie(name: string, value: string | undefined, props?: CookieProps) {
    const expires = !value ? new Date(0) : props?.expires ?? props?.expiresIn ? new Date() : undefined;
    if (expires && props?.expiresIn) {
        if (props.expiresIn.seconds) expires.setSeconds(expires.getSeconds() + props.expiresIn.seconds);
        if (props.expiresIn.minutes) expires.setMinutes(expires.getMinutes() + props.expiresIn.minutes);
        if (props.expiresIn.hours) expires.setHours(expires.getHours() + props.expiresIn.hours);
        if (props.expiresIn.days) expires.setDate(expires.getDate() + props.expiresIn.days);
        if (props.expiresIn.months) expires.setMonth(expires.getMonth() + props.expiresIn.months);
        if (props.expiresIn.years) expires.setFullYear(expires.getFullYear() + props.expiresIn.years);
    }
    const domain = props?.domain;
    const path = props?.path || "/";
    const sameSite = props?.sameSite || "lax";

    const components = [
        `${name}=${!value ? "" : encodeURIComponent(value)}`,
    ];
    if (expires) components.push(`expires=${expires.toUTCString()}`);
    if (domain) components.push(`domain=${domain}`);
    if (path) components.push(`path=${path}`);
    if (sameSite) components.push(`samesite=${sameSite}`);

    document.cookie = components.join("; ");
}

export function getCookie(name: string): string | undefined {
    const value = document.cookie
        .split("; ")
        .find((name0) => name0.startsWith(`${name}=`))
        ?.split("=")[1];

    return value ? decodeURIComponent(value) : undefined;
}
