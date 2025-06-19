import {
    NextRequest,
    NextResponse
} from "next/server";
import path from "path";
import fs from "fs";

interface GetProps {
    params: Promise<{
        category: string;
    }>;
}

export async function GET(request: NextRequest, props: GetProps) {
    const { category } = await props.params;

    const categoryDir = path.join(process.cwd(), "public", "categories", category);
    const images: string[] = [];

    if (!fs.existsSync(categoryDir) || !fs.lstatSync(categoryDir).isDirectory()) {
        return NextResponse.json(
            images
        );
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

            images.push(`/categories/${category}/${setName}/${fileName}`);
        }
    }

    return NextResponse.json(
        images
    );
}
