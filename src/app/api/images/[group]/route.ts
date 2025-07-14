import {
    NextRequest,
    NextResponse,
} from "next/server";
import * as types from "@/types/api/images/p_group";
import {
    createClient,
    getUser,
} from "@/utils/server/auth";

export async function GET(request: NextRequest, props: types.GetProps) {
    /*
    get group info
    */

    const pb = await createClient();
    const user = await getUser(false, request.cookies, pb);

    const records = await pb.collection("images").getFullList();

    return NextResponse.json({
        records,
    });
}

export async function POST(request: NextRequest, props: types.PostProps) {
    /*
    create group
    */
    
    const pb = await createClient();
    const user = await getUser(false, request.cookies, pb);

    /*if (!user) {
        return NextResponse.json<types.PostResponse>({
            success: false,
        }, {
            status: 401,
        });
    }*/

    const record = await pb.collection("images").create({
        "type": "product",
    });

    return NextResponse.json<types.PostResponse>({
        success: true,
        record,
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
