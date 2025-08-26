import PocketBase from "pocketbase";
import { server_config } from "@/utils/server/config";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { headers } from "next/headers";

export * as usersDB from "./users";
export * as mediaVariantsDB from "./mediaVariants";
export * as mediaContentsDB from "./mediaContents";
export * as mediaGroupsDB from "./mediaGroups";
export * as mediaCategoriesDB from "./mediaCategories";

interface CreateClientProps {
    headers?: ReadonlyHeaders | Headers;
}

export async function createClientDB(props: CreateClientProps = {}) {
    props.headers ||= await headers();

    const pb = new PocketBase(server_config.env.POCKETBASE_URL);
    pb.beforeSend = (url, options) => {
        options.headers = {
            ...options.headers,
            "X-Forwarded-For": props.headers?.get("x-forwarded-for") || "",
        };
        return { url, options };
    }

    return pb;
}
