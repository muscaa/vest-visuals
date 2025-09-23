import { Response } from "@type/http";
import {
    RegistryKey,
    Registries,
} from "@type/registries";

// POST

export type PostRequest = {
    key: RegistryKey;
};

export type PostResponse = Response<{
    value: Registries[RegistryKey];
}>;
