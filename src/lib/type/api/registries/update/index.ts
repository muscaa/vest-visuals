import { Response } from "@type/http";
import {
    RegistryKey,
    Registries,
} from "@type/registries";

// POST

export type PostRequest = {
    key: RegistryKey;
    value: Registries[RegistryKey];
};

export type PostResponse = Response<{}>;
