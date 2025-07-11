import {
    NextRequest,
    NextResponse,
} from "next/server";
import {
    PostResponse,
} from "@/shared/api/upload";
import { getUser } from "@/utils/server/auth";

export async function POST(request: NextRequest) {
    const user = await getUser(false);

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    return NextResponse.json<PostResponse>({
        loggedIn: user != null,
        files: files.map(file => file.name),
    });
}
