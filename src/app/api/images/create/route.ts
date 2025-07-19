import {
    NextRequest,
    NextResponse,
} from "next/server";
import * as types from "@/types/api/images/create";
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

    const json = await safeJSON<types.PostRequest>(request, (json) => json.type);
    if (json == null) {
        return NextResponse.json<types.PostResponse>({
            success: false,
        }, {
            status: 400,
        });
    }

    const result = await imagesOldDB.create({
        pb,
        value: {
            group: json.group,
            type: json.type,
        },
    });

    if (result == null) {
        return NextResponse.json<types.PostResponse>({
            success: false,
        }, {
            status: 404,
        });
    }

    return NextResponse.json<types.PostResponse>({
        success: true,
        value: result,
    });
}
