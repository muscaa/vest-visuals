import {
    NextRequest,
    NextResponse,
} from "next/server";
import * as types from "@/types/api/images/p_group";
import {
    createClientDB,
    usersDB,
    imagesDB,
} from "@/utils/server/db";
import { ImagesItem } from "@/types/db/images";

export async function GET(request: NextRequest, props: types.GetProps) {
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

    const params = await props.params;
    const result = await imagesDB.get({
        pb,
        options: {
            filter: `group = "${params.group}"`,
            skipTotal: true,
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
        value: result.items[0],
    });
}

export async function POST(request: NextRequest, props: types.PostProps) {
    const pb = await createClientDB();
    const user = await usersDB.get({
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

    const params = await props.params;
    const getResult = await imagesDB.get({
        pb,
        options: {
            filter: `group = "${params.group}"`,
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
    const json: types.PostRequest = await request.json();

    const updateResult = await imagesDB.update({
        pb,
        id: value.id,
        value: {
            group: json.group,
            type: json.type,
            items: JSON.stringify(json.items),
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

export async function PUT(request: NextRequest, props: types.PutProps) {
    /*
    upload images

    const user = await getUser(false);

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const data = JSON.parse(formData.get("data"));

    return NextResponse.json<PostResponse>({
        loggedIn: user != null,
        files: files.map(file => file.name),
    });
    */

    const pb = await createClientDB();
    const user = await usersDB.get({
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

    const params = await props.params;
    const getResult = await imagesDB.get({
        pb,
        options: {
            filter: `group = "${params.group}"`,
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
    const items: ImagesItem[] = JSON.parse(value.items);

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const data = JSON.parse(formData.get("data") as string) as ImagesItem[];

    const updateResult = await imagesDB.update({
        pb,
        id: value.id,
        value: {
            items: JSON.stringify([
                ...items,
                ...data,
            ]),
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
