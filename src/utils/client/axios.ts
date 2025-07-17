import { createClientAxios } from "@/utils/axios";

export const api_client = createClientAxios({
    baseURL: "/api",
});
