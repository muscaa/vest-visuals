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
    Registry,
} from "@type/registries";
import { registries } from "./registries";

export function getRegistry<K extends RegistryKey>(key: K): Registry<K> {
    return registries[key];
}

export function updateRegistry<K extends RegistryKey>(key: K, reg: Registry<K>): boolean {
    const registry = getRegistry(key);
    if (!registry) return false;

    registries[key] = reg;

    return true;
}

export async function saveRegistry<K extends RegistryKey>(key: K): Promise<boolean> {
    try {
        const registry = getRegistry(key);
        if (!registry) return false;

        const command = new PutObjectCommand({
            Bucket: buckets.registries,
            Key: `${key}.json`,
            Body: JSON.stringify(registry, null, 2),
            ContentType: "application/json",
        });
        await s3.send(command);

        return true;
    } catch (error) { }
    return false;
}

export async function loadRegistry<K extends RegistryKey>(key: K): Promise<Registry<K> | undefined> {
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

export async function createRegistry<K extends RegistryKey>(key: K, value: Registry<K>): Promise<Registry<K>> {
    const saved = await loadRegistry(key);
    const registry = saved ?? value;

    return registry;
}
