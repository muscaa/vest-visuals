import {
    s3,
    buckets,
} from "@server/s3";
import {
    PutObjectCommand,
    GetObjectCommand,
} from "@aws-sdk/client-s3";
import * as registries from "./registries";

type Registries = typeof registries;
type Registry<T extends keyof Registries | unknown> = T extends keyof Registries ? Registries[T] : unknown;

export function getRegistry<T extends keyof Registries>(name: T): Registry<T>;
export function getRegistry(name: string): Registry<unknown> | undefined;
export function getRegistry<T extends keyof Registries>(name: T | string): Registry<T | unknown> | undefined {
    return registries[name as keyof Registries];
}

export function updateRegistry<T extends keyof Registries>(name: T, func: (reg: Registry<T>) => void): boolean;
export function updateRegistry(name: string, func: (reg: Registry<unknown>) => void): boolean;
export function updateRegistry<T extends keyof Registries>(name: T | string, func: (reg: Registry<T | unknown>) => void): boolean {
    const registry = getRegistry(name);
    if (!registry) return false;

    func(registry);

    return true;
}

export async function saveRegistry<T extends keyof Registries>(name: T): Promise<boolean>;
export async function saveRegistry(name: string): Promise<boolean>;
export async function saveRegistry<T extends keyof Registries>(name: T | string): Promise<boolean> {
    try {
        const registry = getRegistry(name);
        if (!registry) return false;

        const command = new PutObjectCommand({
            Bucket: buckets.registries,
            Key: `${name}.json`,
            Body: JSON.stringify(registry, null, 2),
            ContentType: "application/json",
        });
        await s3.send(command);

        return true;
    } catch (error) { }
    return false;
}

export async function loadRegistry<T extends keyof Registries>(name: T): Promise<Registry<T>>;
export async function loadRegistry(name: string): Promise<Registry<unknown> | undefined>;
export async function loadRegistry<T extends keyof Registries>(name: T | string): Promise<Registry<T | unknown> | undefined> {
    try {
        const command = new GetObjectCommand({
            Bucket: buckets.registries,
            Key: `${name}.json`,
        });
        const response = await s3.send(command);
        const body = await response.Body?.transformToString();
        if (!body) return undefined;

        return JSON.parse(body);
    } catch (error) { }

    return undefined;
}

export async function createRegistry<T extends keyof Registries>(name: T, value: Registry<T>): Promise<Registry<T>> {
    const saved = await loadRegistry(name);
    const registry = saved ?? value;

    return registry;
}
