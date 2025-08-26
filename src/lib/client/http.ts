import { createHttpClient } from "@shared/http";

export const apiClient = createHttpClient({
    baseURL: "/api",
});
