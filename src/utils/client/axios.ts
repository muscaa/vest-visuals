import {
    createClientAxios,
    route,
    routes,
    endpoint,
} from "@/utils/axios";
import * as api_media_categories from "@/types/api/media/categories";

export const api_client = createClientAxios({
    baseURL: "/api",
});

export const api_routes = routes({
    media: route("media", {
        categories: route("categories", {
            _: endpoint<api_media_categories.PostResponse, api_media_categories.PostRequest>(api_client),
        }),
    }),
});
