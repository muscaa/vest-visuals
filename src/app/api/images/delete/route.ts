import {
    NextRequest,
    NextResponse,
} from "next/server";
import * as types from "@/types/api/images/delete";
import {
    createClientDB,
    usersDB,
    imagesOldDB,
} from "@/utils/server/db";
import { safeJSON } from "@/utils/server/request";
import { createClientS3 } from "@/utils/server/s3";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

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

    try {
        const s3 = createClientS3();

        for (const item of value.items) {
            for (const [key, size] of Object.entries(item.sizes)) {
                await s3.send(new DeleteObjectCommand({
                    Bucket: "public",
                    Key: `images/${item.src}_${key}.jpg`, // TODO fix this once upload is changed
                }));
            }
        }

        const removeResult = await imagesOldDB.remove({
            pb,
            id: value.id,
        });

        if (removeResult == null) {
            throw new Error("Failed to remove image from database");
        }
    } catch (error) {
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
