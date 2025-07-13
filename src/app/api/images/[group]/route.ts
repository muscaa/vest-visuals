import {
    NextRequest,
    NextResponse,
} from "next/server";
import * as types from "@/types/api/images/p_group";
import { createClient } from "@/utils/server/auth";

export async function GET(request: NextRequest, props: types.GetProps) {
    /*
    get group info
    */
}

export async function POST(request: NextRequest, props: types.PostProps) {
    /*
    create group
    */
}

export async function PUT(request: NextRequest, props: types.PutProps) {
    /*
    upload images
    */
}
