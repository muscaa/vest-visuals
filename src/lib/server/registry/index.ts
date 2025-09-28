import {
    s3,
    buckets,
} from "@server/s3";
import {
    PutObjectCommand,
    GetObjectCommand,
} from "@aws-sdk/client-s3";
import {
    RegistryKey,
    RegistryIn,
    RegistryOut,
} from "@type/registries";
import * as registries from "./registries";

const registryEntries = registries as RegistryEntries; // stupid typescript

export function getRegistryKey(str: string): RegistryKey | undefined {
    const key = str as RegistryKey;
    return registryEntries[key] ? key : undefined;
}

export function getRegistryEntry<K extends RegistryKey>(key: K): RegistryEntry<K> {
    return registryEntries[key];
}

export async function updateRegistry<K extends RegistryKey>(key: K, reg: RegistryIn<K>): Promise<boolean> {
    const entry = getRegistryEntry(key);
    if (!entry) return false;

    entry.in = reg;
    entry.out = await entry.transform(reg);

    return true;
}

export async function saveRegistry<K extends RegistryKey>(key: K): Promise<boolean> {
    try {
        const entry = getRegistryEntry(key);
        if (!entry) return false;

        const command = new PutObjectCommand({
            Bucket: buckets.registries,
            Key: `${key}.json`,
            Body: JSON.stringify(entry.in, null, 2),
            ContentType: "application/json",
        });
        await s3.send(command);

        return true;
    } catch (error) { }
    return false;
}

export async function loadRegistry<K extends RegistryKey>(key: K): Promise<RegistryIn<K> | undefined> {
    try {
        const command = new GetObjectCommand({
            Bucket: buckets.registries,
            Key: `${key}.json`,
        });
        const response = await s3.send(command);
        const body = await response.Body?.transformToString();
        if (!body) return undefined;

        return JSON.parse(body);
    } catch (error) { }

    return undefined;
}

export interface RegistryEntry<K extends RegistryKey> {
    key: K;
    default: () => RegistryIn<K>;
    in: RegistryIn<K>;
    transform: (reg: RegistryIn<K>) => Promise<RegistryOut<K>>;
    out: RegistryOut<K>;
}

export type RegistryEntries = {
    readonly [K in RegistryKey]: RegistryEntry<K>;
};

interface CreateProps<K extends RegistryKey> {
    default: RegistryIn<K>;
    transform?: (reg: RegistryIn<K>) => Promise<RegistryOut<K>>;
}

export async function createRegistry<K extends RegistryKey>(key: K, props: CreateProps<K>): Promise<RegistryEntry<K>> {
    const _default = (): RegistryIn<K> => {
        return JSON.parse(JSON.stringify(props.default));
    };

    const _transform = async (input: RegistryIn<K>): Promise<RegistryOut<K>> => {
        return input as RegistryOut<K>;
    };
    
    const saved = await loadRegistry(key);
    const reg = saved ?? _default();
    const transform = props.transform ?? _transform;

    return {
        key,
        default: _default,
        in: reg,
        transform,
        out: await transform(reg),
    };
}
