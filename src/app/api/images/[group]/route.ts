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
import sharp from "sharp";

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
        return NextResponse.json<types.PutResponse>({
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
        return NextResponse.json<types.PutResponse>({
            success: false,
        }, {
            status: 404,
        });
    }

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const datas = (formData.getAll("data") as string[])
            .map((data) => JSON.parse(data) as types.PutRequest);

    if (files.length == 0 || files.length != datas.length) {
        return NextResponse.json<types.PutResponse>({
            success: false,
        }, {
            status: 400,
        });
    }

    const value = getResult.items[0];
    const oldItems: ImagesItem[] = value.items || [];
    const newItems: ImagesItem[] = [];

    try {
        const s3 = createClientS3();

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const data = datas[i];
            const uuid = uuidv4();

            const item: ImagesItem = {
                src: `${params.group}/${uuid}`,
                alt: data.alt ?? uuid,
                sizes: {},
            };

            const buffer = Buffer.from(await file.arrayBuffer());
            const original = sharp(buffer);
            const metadata = await original.metadata();

            for (const [key, size] of Object.entries(data.sizes)) {
                if (!size) continue;

                let width: number;
                let height: number;
                const quality = size.quality ?? 100;

                if (size.percent && size.percent > 0 && size.percent < 100) {
                    const scale = size.percent / 100;
                    width = Math.round(metadata.width * scale);
                    height = Math.round(metadata.height * scale);
                } else if (size.w && size.w > 0 && size.h && size.h > 0) {
                    width = size.w;
                    height = size.h;
                } else {
                    width = metadata.width;
                    height = metadata.height;
                }

                const processed = await original
                    .resize({ width, height })
                    .jpeg({ quality })
                    .toBuffer();

                await s3.send(new PutObjectCommand({
                    Body: processed,
                    Bucket: "public",
                    Key: `images/${params.group}/${uuid}_${key}.jpg`,
                }));

                item.sizes[key] = {
                    w: width,
                    h: height,
                };
            }

            newItems.push(item);
        }
    } catch (error) {}

    const updateResult = await imagesDB.update({
        pb,
        id: value.id,
        value: {
            items: [
                ...oldItems,
                ...newItems,
            ],
        },
    });

    if (updateResult == null) {
        return NextResponse.json<types.PostResponse>({
            success: false,
        }, {
            status: 500,
        });
    }

    return NextResponse.json<types.PutResponse>({
        success: true,
    });
}
