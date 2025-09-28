import { Response } from "@type/http";
import {
    RegistryKey,
    RegistryOut,
} from "@type/registries";

// POST

export type PostRequest = {
    key: RegistryKey;
};

export type PostResponse = Response<{
    value: RegistryOut<RegistryKey>;
}>;
