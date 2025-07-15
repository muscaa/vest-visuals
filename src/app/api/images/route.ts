import {
    NextRequest,
    NextResponse,
} from "next/server";
import * as types from "@/types/api/images";
import {
    createClientDB,
    imagesDB,
} from "@/utils/server/db";

export async function GET(request: NextRequest) {
    const pb = await createClientDB();
    let json: types.GetRequest = {};
    try {
        json = await request.json();
    } catch (error) {}
    
    // TODO: add pagination

    const result = await imagesDB.get({
        pb,
        options: {
            filter: json.filter,
            sort: json.sort || "-created",
        },
    });

    if (result == null || result.items.length == 0) {
        return NextResponse.json<types.GetResponse>({
            success: false,
        }, {
            status: 404,
        });
    }

    return NextResponse.json<types.GetResponse>({
        success: true,
        value: result.items,
    });
}
