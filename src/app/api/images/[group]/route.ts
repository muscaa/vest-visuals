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
import { createClientS3 } from "@/utils/server/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

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
            items: json.items,
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
    const items: ImagesItem[] = value.items || [];

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    // needs to process sizes <= 0 (original), names to uuids,
    // maybe even combine it with File[] so i dont have to keep track of the file names
    // aka, it needs a new separate structure
    const data = JSON.parse(formData.get("data") as string) as ImagesItem[];


    // move update after images are processed and uploaded
    /*const updateResult = await imagesDB.update({
        pb,
        id: value.id,
        value: {
            items: [
                ...items,
                ...data,
            ],
        },
    });

    if (updateResult == null) {
        return NextResponse.json<types.PostResponse>({
            success: false,
        }, {
            status: 500,
        });
    }*/

    // process images with sharp

    // upload images to s3

    const s3 = createClientS3();

    for (const file of files) {
        const uuid = uuidv4();

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // process images using sharp

        const output = await s3.send(new PutObjectCommand({
            Body: buffer,
            Bucket: "public",
            Key: `images/${params.group}/${uuid}.jpg`,
        }));
    }

    return NextResponse.json<types.PostResponse>({
        success: true,
    });
}
