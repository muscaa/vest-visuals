import {
    createClientAxios,
    route,
    routes,
    endpoint,
} from "@/utils/axios";
import * as api_media_categories from "@/types/api/media/categories";
import * as api_media_categories_get from "@/types/api/media/categories/get";
import * as api_media_categories_create from "@/types/api/media/categories/create";
import * as api_media_categories_update from "@/types/api/media/categories/update";
import * as api_media_categories_remove from "@/types/api/media/categories/remove";
import * as api_media_groups from "@/types/api/media/groups";
import * as api_media_groups_get from "@/types/api/media/groups/get";
import * as api_media_groups_create from "@/types/api/media/groups/create";
import * as api_media_groups_update from "@/types/api/media/groups/update";
import * as api_media_groups_remove from "@/types/api/media/groups/remove";
import * as api_media_contents from "@/types/api/media/contents";
import * as api_media_contents_get from "@/types/api/media/contents/get";
import * as api_media_contents_upload from "@/types/api/media/contents/upload";
import * as api_media_contents_remove from "@/types/api/media/contents/remove";
import * as api_portfolio from "@/types/api/portfolio";

export const api_client = createClientAxios({
    baseURL: "/api",
});

export const api_routes = routes({
    media: route("media", {
        categories: route("categories", {
            _: endpoint<api_media_categories.PostResponse, api_media_categories.PostRequest>(api_client),
            get: route("get", {
                _: endpoint<api_media_categories_get.PostResponse, api_media_categories_get.PostRequest>(api_client),
            }),
            create: route("create", {
                _: endpoint<api_media_categories_create.PostResponse, api_media_categories_create.PostRequest>(api_client),
            }),
            update: route("update", {
                _: endpoint<api_media_categories_update.PostResponse, api_media_categories_update.PostRequest>(api_client),
            }),
            remove: route("remove", {
                _: endpoint<api_media_categories_remove.PostResponse, api_media_categories_remove.PostRequest>(api_client),
            }),
        }),
        groups: route("groups", {
            _: endpoint<api_media_groups.PostResponse, api_media_groups.PostRequest>(api_client),
            get: route("get", {
                _: endpoint<api_media_groups_get.PostResponse, api_media_groups_get.PostRequest>(api_client),
            }),
            create: route("create", {
                _: endpoint<api_media_groups_create.PostResponse, api_media_groups_create.PostRequest>(api_client),
            }),
            update: route("update", {
                _: endpoint<api_media_groups_update.PostResponse, api_media_groups_update.PostRequest>(api_client),
            }),
            remove: route("remove", {
                _: endpoint<api_media_groups_remove.PostResponse, api_media_groups_remove.PostRequest>(api_client),
            }),
        }),
        contents: route("contents", {
            _: endpoint<api_media_contents.PostResponse, api_media_contents.PostRequest>(api_client),
            get: route("get", {
                _: endpoint<api_media_contents_get.PostResponse, api_media_contents_get.PostRequest>(api_client),
            }),
            upload: route("upload", {
                _: endpoint<api_media_contents_upload.PostResponse, FormData>(api_client),
            }),
            remove: route("remove", {
                _: endpoint<api_media_contents_remove.PostResponse, api_media_contents_remove.PostRequest>(api_client),
            }),
        }),
    }),
    portfolio: route("portfolio", {
        _: endpoint<api_portfolio.PostResponse, api_portfolio.PostRequest>(api_client),
    }),
});
