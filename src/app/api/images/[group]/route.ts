import {
    NextRequest,
    NextResponse,
} from "next/server";
import * as types from "@/types/api/images/p_group";
import {
    createClient,
    users,
    images,
} from "@/utils/server/db";

export async function GET(request: NextRequest, props: types.GetProps) {
    /*
    get group info
    */

    const pb = await createClient();
    const user = await users.get({
        pb,
        cookies: request.cookies,
        redirect: false,
    });

    const result = await images.get();

    return NextResponse.json({
        loggedIn: user != null,
        result,
    });
}

export async function POST(request: NextRequest, props: types.PostProps) {
    /*
    create group
    */
    
    const pb = await createClient();
    const user = await users.get({
        pb,
        cookies: request.cookies,
        redirect: false,
    });

    /*if (!user) {
        return NextResponse.json<types.PostResponse>({
            success: false,
        }, {
            status: 401,
        });
    }*/

    const value = await images.create({
        value: {
            type: "automotive",
        } as any,
    });

    return NextResponse.json({
        success: true,
        value,
    });
}

export async function PUT(request: NextRequest, props: types.PutProps) {
    /*
    upload images

    const user = await getUser(false);

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    return NextResponse.json<PostResponse>({
        loggedIn: user != null,
        files: files.map(file => file.name),
    });
    */
}
