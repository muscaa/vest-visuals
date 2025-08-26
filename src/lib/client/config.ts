import { sharedConfig } from "@shared/config";

const env = {
    ...sharedConfig.env,
} as const;

export const clientConfig = {
    env,
};
