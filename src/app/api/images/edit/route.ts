import {
    NextRequest,
    NextResponse,
} from "next/server";
import * as types from "@/types/api/images/edit";
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

    const json = await safeJSON<types.PostRequest>(request, (json) => json.group && (json.newGroup || json.newType || json.newItems));
    if (json == null) {
        return NextResponse.json<types.PostResponse>({
            success: false,
        }, {
            status: 400,
        });
    }

    const getResult = await imagesOldDB.get({
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

    const updateResult = await imagesOldDB.update({
        pb,
        id: value.id,
        value: {
            group: json.newGroup,
            type: json.newType,
            items: json.newItems,
        },
    });

    if (updateResult == null) {
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
