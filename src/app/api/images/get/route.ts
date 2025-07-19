import {
    NextRequest,
    NextResponse,
} from "next/server";
import * as types from "@/types/api/images/get";
import {
    createClientDB,
    usersDB,
    imagesOldDB,
} from "@/utils/server/db";
import { safeJSON } from "@/utils/server/request";

export async function POST(request: NextRequest) {
    const pb = await createClientDB();
    const user = await usersDB.get({
        pb,
        cookies: request.cookies,
        redirect: false,
    });

    /*if (!user) {
        return NextResponse.json<types.GetResponse>({
            success: false,
        }, {
            status: 401,
        });
    }*/

    const json = await safeJSON<types.PostRequest>(request, (json) => json.group);
    if (json == null) {
        return NextResponse.json<types.PostResponse>({
            success: false,
        }, {
            status: 400,
        });
    }

    const result = await imagesOldDB.get({
        pb,
        options: {
            filter: `group = "${json.group}"`,
            skipTotal: true,
        },
    });

    if (result == null || result.items.length == 0) {
        return NextResponse.json<types.PostResponse>({
            success: false,
        }, {
            status: 404,
        });
    }

    return NextResponse.json<types.PostResponse>({
        success: true,
        value: result.items[0],
    });
}
