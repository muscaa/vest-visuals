import {
    NextRequest,
    NextResponse,
} from "next/server";
import * as types from "@/types/api/images/delete";
import {
    createClientDB,
    usersDB,
    imagesDB,
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

    const getResult = await imagesDB.get({
        pb,
        options: {
            filter: `group = "${json.group}"`,
            skipTotal: true,
        },
    });

    if (getResult == null || getResult.items.length == 0) {
        return NextResponse.json<types.PostResponse>({
            success: false,
        }, {
            status: 404,
        });
    }

    const value = getResult.items[0];

    const removeResult = await imagesDB.remove({
        pb,
        id: value.id,
    });

    if (removeResult == null) {
        return NextResponse.json<types.PostResponse>({
            success: false,
        }, {
            status: 500,
        });
    }

    return NextResponse.json<types.PostResponse>({
        success: true,
    });
}
