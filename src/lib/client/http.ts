import { createHttpClient } from "@shared/http";

export const apiClient = createHttpClient({
    baseURL: "/api",
    transformResponse: (data: string) => {
        const json = JSON.parse(data, (key, value) => {
            if (["createdAt", "updatedAt"].includes(key)) {
                return new Date(value);
            }
            return value;
        });
        return json;
    },
});
