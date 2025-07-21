import { NextResponse } from "next/server";

export function responseJSON<T>(status: number, body: T) {
    return NextResponse.json<T>(body, {
        status,
    });
}
