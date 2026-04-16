export interface DefinedCookie<K extends string = string, V = any> {
    name: K;
    value: V;
}

export function defineCookie<K extends string, const V>(name: K, value: V): DefinedCookie<K, V> {
    return {
        name,
        value,
    };
}

type Value<V> = V extends readonly (infer U)[] ? U : V;

export function parseCookie<K extends string, const V, D extends Value<V> | undefined = undefined>(def: DefinedCookie<K, V>, value: string | undefined, defaultValue?: D): Value<V> | D {
    if (!value || !def.value) {
        return (defaultValue ?? undefined) as Value<V> | D;
    }
    if (Array.isArray(def.value)) {
        return (def.value.find((v) => String(v) === value) ?? defaultValue ?? undefined) as Value<V> | D;
    }
    return (String(def.value) === value ? def.value as Value<V> : (defaultValue ?? undefined)) as Value<V> | D;
}

export const COOKIE_CONSENT = defineCookie("cookie-consent", ["essential", "all"]);
