import {
    createClientAxios,
    route,
    routes,
    endpoint,
} from "@/utils/axios";
import * as api_media_categories from "@/types/api/media/categories";
import * as api_media_categories_create from "@/types/api/media/categories/create";

export const api_client = createClientAxios({
    baseURL: "/api",
});

export const api_routes = routes({
    media: route("media", {
        categories: route("categories", {
            _: endpoint<api_media_categories.PostResponse, api_media_categories.PostRequest>(api_client),
            create: route("create", {
                _: endpoint<api_media_categories_create.PostResponse, api_media_categories_create.PostRequest>(api_client),
            }),
        }),
    }),
});
