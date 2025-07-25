import PocketBase from "pocketbase";
import { server_config } from "@/utils/server/config";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { headers } from "next/headers";

export * as usersDB from "@/utils/server/db/users";
export * as mediaDB from "@/utils/server/db/old/media";
export * as mediaVariantsDB from "@/utils/server/db/old/mediaVariants";
export * as mediaGroupsDB from "@/utils/server/db/old/mediaGroups";

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
