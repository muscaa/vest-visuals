import {
    NextRequest,
    NextResponse
} from "next/server";
import {
    GetProps,
    GetResponse,
} from "@/shared/api/portfolio/category";
import path from "path";
import fs from "fs";

export async function GET(request: NextRequest, props: GetProps) {
    const params = await props.params;

    const categoryDir = path.join(process.cwd(), "public", "categories", params.category);
    const images: string[] = [];

    if (!fs.existsSync(categoryDir) || !fs.lstatSync(categoryDir).isDirectory()) {
        return NextResponse.json<GetResponse>({
            images
        });
    }

    for (const setName of fs.readdirSync(categoryDir)) {
        const setPath = path.join(categoryDir, setName)

        if (!fs.lstatSync(setPath).isDirectory()) {
            continue;
        }

        for (const fileName of fs.readdirSync(setPath)) {
            const filePath = path.join(setPath, fileName);

            if (!fs.lstatSync(filePath).isFile() || !/\.(jpe?g|png|webp)$/i.test(fileName)) {
                continue;
            }

            images.push(`/categories/${params.category}/${setName}/${fileName}`);
        }
    }

    return NextResponse.json<GetResponse>({
        images
    });
}
