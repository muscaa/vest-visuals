import { Response } from "@type/http";
import {
    RegistryKey,
    RegistryIn,
} from "@type/registries";

// POST

export type PostRequest = {
    key: RegistryKey;
};

export type PostResponse = Response<{
    value: RegistryIn<RegistryKey>;
}>;
