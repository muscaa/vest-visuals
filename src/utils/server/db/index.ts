import PocketBase from "pocketbase";
import { server_config } from "@/utils/server/config";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { headers } from "next/headers";

export * as usersDB from "@/utils/server/db/users";

export * as newMediaVariantsDB from "@/utils/server/db/new/mediaVariants";
export * as newMediaContentsDB from "@/utils/server/db/new/mediaContents";
export * as newMediaGroupsDB from "@/utils/server/db/new/mediaGroups";
export * as newMediaCategoriesDB from "@/utils/server/db/new/mediaCategories";

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
